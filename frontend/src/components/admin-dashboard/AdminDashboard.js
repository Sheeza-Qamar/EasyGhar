import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-dashboard.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const ADMIN_SECRET = process.env.REACT_APP_ADMIN_SECRET;

const getAdminKey = () => ADMIN_SECRET || (typeof window !== 'undefined' && sessionStorage.getItem('easyghar_admin_key')) || '';

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminKey, setAdminKeyState] = useState(getAdminKey());
  const [keyInput, setKeyInput] = useState('');
  const [activeTab, setActiveTab] = useState('worker-requests');
  const [statusFilter, setStatusFilter] = useState('all');
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [notesByWorker, setNotesByWorker] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  const setAdminKey = (key) => {
    setAdminKeyState(key);
    if (key && typeof window !== 'undefined') sessionStorage.setItem('easyghar_admin_key', key);
  };

  const fetchWorkers = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError('');
    try {
      const q = statusFilter === 'all' ? '' : `?status=${statusFilter}`;
      const res = await fetch(`${API_BASE}/api/admin/workers${q}`, {
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = res.status === 401
          ? 'Invalid admin key. Enter the correct key (e.g. Sheeza123.)'
          : (data.message || 'Failed to load workers');
        setError(msg);
        setWorkers([]);
        return;
      }
      setWorkers(data.workers || []);
    } catch (err) {
      setError('Network error');
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }, [adminKey, statusFilter]);

  useEffect(() => {
    if (adminKey) fetchWorkers();
  }, [adminKey, statusFilter, fetchWorkers]);

  const handleApprove = async () => {
    if (!selectedWorker) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/workers/${selectedWorker.id}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ notes: notesByWorker[selectedWorker.id] || null }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Failed to approve');
        return;
      }
      setModal(null);
      setSelectedWorker(null);
      fetchWorkers();
    } catch (err) {
      setError('Network error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedWorker) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/workers/${selectedWorker.id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ notes: rejectReason || null }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Failed to reject');
        return;
      }
      setModal(null);
      setSelectedWorker(null);
      setRejectReason('');
      fetchWorkers();
    } catch (err) {
      setError('Network error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('easyghar_admin_key');
    setAdminKeyState('');
    setModal(null);
    navigate('/');
  };

  if (!adminKey) {
    return (
      <div className="admin-dashboard-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 24 }}>
        <div style={{ maxWidth: 400, width: '100%', background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Admin Access</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Enter admin key to continue</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            style={{ width: '100%', padding: 12, border: '1.5px solid #e2e8f0', borderRadius: 10, marginBottom: 16, fontSize: 14 }}
          />
          <button
            type="button"
            onClick={() => keyInput.trim() && setAdminKey(keyInput.trim())}
            style={{ width: '100%', padding: 12, background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: '📊' },
    { id: 'worker-requests', label: 'Worker Requests', icon: '✍️' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'providers', label: 'Service Providers', icon: '🔧' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
  ];
  const supportItems = [{ id: 'help', label: 'Documentation', icon: '❓' }];

  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo-area">
            <div className="admin-logo-icon">⚙️</div>
            <div className="admin-logo-text">
              <h1>Easyghar</h1>
              <p>Admin Panel</p>
            </div>
          </div>
        </div>
        <div className="admin-nav-scroll">
          <div className="admin-nav-section">
            <div className="admin-nav-section-title">Dashboard</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="admin-nav-section">
            <div className="admin-nav-section-title">Support</div>
            {supportItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="admin-sidebar-footer">
          <button type="button" className="admin-nav-item admin-logout-btn" onClick={() => setModal('logout')}>
            <span className="admin-nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={`admin-main ${activeTab === 'worker-requests' ? 'admin-main-worker-requests' : ''}`}>
        <div className="admin-top-bar" style={activeTab === 'worker-requests' ? { marginTop: 14 } : undefined}>
          {activeTab === 'worker-requests' ? (
            <>
              <div className="admin-top-bar-spacer" />
              <h2 className="admin-top-bar-title">Worker Registration Requests</h2>
              <div className="admin-top-bar-actions-right">
                <div className="admin-profile-avatar">AD</div>
              </div>
            </>
          ) : (
            <div className="admin-top-actions" style={{ marginLeft: 'auto' }}>
              <div className="admin-profile-avatar">AD</div>
            </div>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="admin-header-title">Welcome back, Admin</h2>
            <p className="admin-header-subtitle">Platform administration dashboard</p>
            <div className="admin-no-data" style={{ marginTop: 32 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
              <p>Navigate to Worker Requests to review pending applications</p>
            </div>
          </div>
        )}

        {activeTab === 'worker-requests' && (
          <div className="admin-worker-requests-page">
            <header className="admin-worker-requests-header">
              <p className="admin-header-subtitle">Review and approve pending service provider applications</p>
            </header>
            <div className="admin-search-box admin-worker-requests-search" style={{ marginBottom: 24 }}>
              <span className="admin-search-icon">🔍</span>
              <input type="text" placeholder="Search workers, applications..." />
            </div>
            <div className="admin-worker-requests-filters" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 24 }}>
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`admin-filter-btn ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status === 'all' && 'All'}
                  {status === 'pending' && `Pending${statusFilter === 'all' ? ` (${workers.filter((w) => w.verification_status === 'pending').length})` : ''}`}
                  {status === 'approved' && 'Approved'}
                  {status === 'rejected' && 'Rejected'}
                </button>
              ))}
            </div>
            {error && <p style={{ color: '#ef4444', marginBottom: 16 }}>{error}</p>}
            {loading ? (
              <div className="admin-no-data">Loading...</div>
            ) : !workers.length ? (
              <div className="admin-no-data">
                <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                <p>No worker requests found</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
                {workers.map((w) => {
                  const initials = (w.full_name || 'W').trim().split(' ').map((x) => x[0]).join('').toUpperCase().slice(0, 2);
                  const statusClass = w.verification_status === 'pending' ? 'admin-status-pending' : w.verification_status === 'approved' ? 'admin-status-approved' : 'admin-status-rejected';
                  const appliedDate = w.created_at ? new Date(w.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
                  return (
                    <div key={w.id} className="admin-request-card">
                      <div className="admin-request-header">
                        <div className="admin-request-avatar">
                          {w.profile_photo_url ? <img src={w.profile_photo_url} alt="" /> : initials}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 className="admin-request-name">{w.full_name || '—'}</h3>
                          <p className="admin-request-service">
                            {w.services && w.services.length ? w.services.map((s) => s.name).join(', ') : 'No services'}
                          </p>
                        </div>
                        <span className={`admin-request-status ${statusClass}`}>
                          {w.verification_status === 'pending' && '⏳ Pending'}
                          {w.verification_status === 'approved' && '✓ Approved'}
                          {w.verification_status === 'rejected' && '✕ Rejected'}
                        </span>
                      </div>
                      <div className="admin-request-details">
                        <div className="admin-detail-row"><span className="admin-detail-label">📧 Email</span><span className="admin-detail-value">{w.email || '—'}</span></div>
                        <div className="admin-detail-row"><span className="admin-detail-label">📱 Phone</span><span className="admin-detail-value">{w.phone || '—'}</span></div>
                        <div className="admin-detail-row"><span className="admin-detail-label">📍 City</span><span className="admin-detail-value">{w.city_name || '—'}</span></div>
                        <div className="admin-detail-row"><span className="admin-detail-label">📍 Address</span><span className="admin-detail-value">{w.default_address || '—'}</span></div>
                        <div className="admin-detail-row"><span className="admin-detail-label">⭐ Experience</span><span className="admin-detail-value">{w.experience_years != null ? `${w.experience_years} years` : '—'}</span></div>
                        <div className="admin-detail-row"><span className="admin-detail-label">📄 CNIC</span><span className="admin-detail-value">{w.cnic_number || '—'}</span></div>
                        <div className="admin-detail-row"><span className="admin-detail-label">📋 Applied</span><span className="admin-detail-value">{appliedDate}</span></div>
                        {w.bio && (
                          <div className="admin-detail-row admin-bio-block">
                            <span className="admin-detail-label">Bio</span>
                            <div className="admin-bio-text">{w.bio}</div>
                          </div>
                        )}
                      </div>
                      {w.services && w.services.length > 0 && (
                        <div className="admin-request-details" style={{ marginBottom: 16 }}>
                          <div className="admin-document-title">Services & pricing</div>
                          <div className="admin-services-list">
                            {w.services.map((s) => (
                              <span key={s.key}>{s.name}: min Rs {s.minimum_charges}, Rs {s.hourly_rate}/hr</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="admin-request-documents">
                        <div className="admin-document-title">📎 Attachments</div>
                        <div className="admin-document-list">
                          {w.documents.cnic_front_url && (
                            <div className="admin-document-item">
                              <span>CNIC Front</span>
                              <a href={w.documents.cnic_front_url} target="_blank" rel="noopener noreferrer" className="admin-view-btn">View</a>
                            </div>
                          )}
                          {w.documents.cnic_back_url && (
                            <div className="admin-document-item">
                              <span>CNIC Back</span>
                              <a href={w.documents.cnic_back_url} target="_blank" rel="noopener noreferrer" className="admin-view-btn">View</a>
                            </div>
                          )}
                          {!w.documents.cnic_front_url && !w.documents.cnic_back_url && <div className="admin-document-item">No documents</div>}
                        </div>
                      </div>
                      <textarea
                        className="admin-notes-input"
                        placeholder={w.verification_status === 'pending' ? 'Add notes (saved to verification_notes on Approve/Reject)...' : 'Admin notes'}
                        value={w.verification_status === 'pending' ? (notesByWorker[w.id] || '') : (w.verification_notes || '')}
                        onChange={(e) => setNotesByWorker((prev) => ({ ...prev, [w.id]: e.target.value }))}
                        readOnly={w.verification_status !== 'pending'}
                      />
                      {w.verification_status === 'pending' && (
                        <div className="admin-request-actions">
                          <button type="button" className="admin-reject-btn" onClick={() => { setSelectedWorker(w); setModal('reject'); setRejectReason(''); }}>Reject</button>
                          <button type="button" className="admin-approve-btn" onClick={() => { setSelectedWorker(w); setModal('approve'); }}>Approve</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab !== 'dashboard' && activeTab !== 'worker-requests' && (
          <div>
            <h2 className="admin-header-title">
              {navItems.find((i) => i.id === activeTab)?.label || supportItems.find((i) => i.id === activeTab)?.label || 'Page'}
            </h2>
            <div className="admin-no-data">
              <p>This section is coming soon.</p>
            </div>
          </div>
        )}
      </main>

      {modal === 'logout' && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Logout</div>
            <div className="admin-modal-text">Are you sure you want to logout from the admin panel?</div>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary-btn" onClick={() => setModal(null)}>Cancel</button>
              <button type="button" className="admin-primary-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'approve' && selectedWorker && (
        <div className="admin-modal-overlay" onClick={() => { setModal(null); setSelectedWorker(null); }}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">✓ Approve Worker?</div>
            <div className="admin-modal-text">
              Approve {selectedWorker.full_name}&apos;s application? The worker will be activated and can start receiving bookings.
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary-btn" onClick={() => { setModal(null); setSelectedWorker(null); }}>Cancel</button>
              <button type="button" className="admin-primary-btn" onClick={handleApprove} disabled={actionLoading}>{actionLoading ? 'Please wait...' : 'Approve Worker'}</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'reject' && selectedWorker && (
        <div className="admin-modal-overlay" onClick={() => { setModal(null); setSelectedWorker(null); setRejectReason(''); }}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">✕ Reject Request?</div>
            <div className="admin-modal-text">
              Reject {selectedWorker.full_name}&apos;s application? You can add a reason below.
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Rejection reason (optional)</label>
              <textarea
                placeholder="Enter reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{ width: '100%', padding: 10, border: '1px solid #e2e8f0', borderRadius: 8, marginTop: 8, fontFamily: 'Plus Jakarta Sans', fontSize: 13, resize: 'vertical', minHeight: 80 }}
              />
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary-btn" onClick={() => { setModal(null); setSelectedWorker(null); setRejectReason(''); }}>Cancel</button>
              <button type="button" className="admin-primary-btn" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' }} onClick={handleReject} disabled={actionLoading}>{actionLoading ? 'Please wait...' : 'Reject Request'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
