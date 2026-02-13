import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './provider-dashboard.css';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('easyghar_user');
      if (!stored) {
        navigate('/signin', { replace: true });
        return;
      }
      const parsed = JSON.parse(stored);
      if (!parsed || parsed.role !== 'worker') {
        navigate(parsed?.role === 'customer' ? '/' : '/signin', { replace: true });
        return;
      }
      setUser(parsed);
    } catch (_) {
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('easyghar_user');
    setLogoutModalOpen(false);
    navigate('/');
  };

  const firstName = user?.full_name?.trim().split(' ')[0] || user?.full_name || 'Partner';
  const initials = (user?.full_name || 'EP')
    .trim()
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (!user) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'My Bookings', icon: '📅' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];
  const supportItems = [
    { id: 'help', label: 'Help Center', icon: '❓' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="provider-dashboard-page">
      <aside className="pd-sidebar">
        <div className="pd-sidebar-header">
          <Link to="/" className="pd-logo-area pd-logo-link">
            <div className="pd-logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="url(#pdLogoGrad)" opacity="0.15" stroke="url(#pdLogoGrad)" strokeWidth="1.5" />
                <path d="M12 30L24 15L36 30" stroke="url(#pdLogoGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="15" y="30" width="18" height="12" rx="1.5" fill="none" stroke="url(#pdLogoGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="20" y="33" width="8" height="9" rx="0.5" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="26.5" cy="38" r="1" fill="#06b6d4" />
                <rect x="15.5" y="33" width="3" height="3" rx="0.4" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
                <rect x="29.5" y="33" width="3" height="3" rx="0.4" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
                <g>
                  <path d="M34 24C34 22.5 35.2 21.5 36.5 21.5C37.8 21.5 38.5 22.5 38.5 24" stroke="#f59e0b" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="33" y1="25.5" x2="37.5" y2="21" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
                </g>
                <defs>
                  <linearGradient id="pdLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="pd-logo-text">
              <h1>Easyghar</h1>
              <p>Pro Partner</p>
            </div>
          </Link>
        </div>
        <div className="pd-nav-section">
          <div className="pd-nav-section-title">Menu</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pd-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="pd-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="pd-nav-section">
          <div className="pd-nav-section-title">Support</div>
          {supportItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pd-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="pd-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: '28px 12px', borderTop: '1px solid rgba(226, 232, 240, 0.1)' }}>
          <button
            type="button"
            className="pd-nav-item"
            style={{ width: '100%', marginBottom: 0 }}
            onClick={() => setLogoutModalOpen(true)}
          >
            <span className="pd-nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="pd-main-content">
        <div className="pd-top-bar">
          <div className="pd-search-box">
            <span className="pd-search-icon">🔍</span>
            <input type="text" placeholder="Search bookings, customers..." />
          </div>
          <div className="pd-top-actions">
            <button type="button" className="pd-icon-btn" aria-label="Notifications">
              🔔
              <span className="pd-notification-badge">3</span>
            </button>
            <button type="button" className="pd-icon-btn" aria-label="Messages">
              💬
            </button>
            <div className="pd-profile-avatar" title={user.full_name}>
              {initials}
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h2 className="pd-header-title pd-stagger-1">Welcome back, {firstName}</h2>
              <p className="pd-header-subtitle pd-stagger-1">Here&apos;s your business overview for today</p>
            </div>

            <div className="pd-stats-grid">
              <div className="pd-stat-card pd-stagger-2">
                <div className="pd-stat-header">
                  <span className="pd-stat-title">Bookings This Month</span>
                  <div className="pd-stat-icon blue">📅</div>
                </div>
                <div className="pd-stat-value">0</div>
                <div className="pd-stat-change positive">Get started by completing your profile</div>
              </div>
              <div className="pd-stat-card pd-stagger-3">
                <div className="pd-stat-header">
                  <span className="pd-stat-title">Total Earnings</span>
                  <div className="pd-stat-icon green">💵</div>
                </div>
                <div className="pd-stat-value">Rs 0</div>
                <div className="pd-stat-change positive">Earnings from completed jobs</div>
              </div>
              <div className="pd-stat-card pd-stagger-4">
                <div className="pd-stat-header">
                  <span className="pd-stat-title">Average Rating</span>
                  <div className="pd-stat-icon orange">⭐</div>
                </div>
                <div className="pd-stat-value">—</div>
                <div className="pd-stat-change positive">Based on customer reviews</div>
              </div>
              <div className="pd-stat-card pd-stagger-5">
                <div className="pd-stat-header">
                  <span className="pd-stat-title">Completion Rate</span>
                  <div className="pd-stat-icon purple">✓</div>
                </div>
                <div className="pd-stat-value">—</div>
                <div className="pd-stat-change positive">Complete jobs to see your rate</div>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <h3 className="pd-section-title pd-stagger-2">Upcoming Bookings</h3>
              <p className="pd-section-subtitle pd-stagger-2">Your scheduled services for the next 7 days</p>
              <div className="pd-upcoming-section">
                <div className="pd-upcoming-card">
                  <div className="pd-time-slot">No upcoming bookings</div>
                  <div className="pd-card-label">Service Type</div>
                  <div className="pd-card-title">—</div>
                  <div className="pd-card-text">Complete your profile and services to receive bookings.</div>
                  <div style={{ marginTop: 12 }}>
                    <button type="button" className="pd-secondary-btn">View Profile</button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <h3 className="pd-section-title pd-stagger-3">Recent Bookings</h3>
              <p className="pd-section-subtitle pd-stagger-3">Your completed and ongoing services</p>
              <div className="pd-bookings-table pd-stagger-4">
                <div className="pd-table-header">
                  <div>Customer</div>
                  <div>Service</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>
                <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                  No bookings yet. When customers book your services, they will appear here.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <h3 className="pd-section-title pd-stagger-4">Customer Reviews</h3>
              <p className="pd-section-subtitle pd-stagger-4">Recent feedback from your customers</p>
              <div className="pd-review-section pd-stagger-5">
                <div className="pd-rating-display">—</div>
                <div className="pd-stars">⭐⭐⭐⭐⭐</div>
                <div className="pd-review-count">No reviews yet. Complete jobs to receive reviews.</div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                  <button type="button" className="pd-secondary-btn">View All Reviews →</button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'dashboard' && (
          <div>
            <h2 className="pd-header-title">
              {navItems.find((i) => i.id === activeTab)?.label ||
                supportItems.find((i) => i.id === activeTab)?.label ||
                'Page'}
            </h2>
            <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
              <p style={{ fontSize: 48, marginBottom: 12 }}>📋</p>
              <p>This section is coming soon. Switch to Dashboard for your overview.</p>
            </div>
          </div>
        )}
      </main>

      {logoutModalOpen && (
        <div
          className="pd-modal-overlay"
          onClick={() => setLogoutModalOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setLogoutModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="pd-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-header">Logout Confirmation</div>
            <div className="pd-modal-text">
              Are you sure you want to logout? You&apos;ll need to sign in again to access your dashboard.
            </div>
            <div className="pd-modal-actions">
              <button type="button" className="pd-secondary-btn" onClick={() => setLogoutModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="pd-primary-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
