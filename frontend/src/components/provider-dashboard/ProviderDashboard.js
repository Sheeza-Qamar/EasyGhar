import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './provider-dashboard.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileServices, setProfileServices] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [cities, setCities] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [servicesSaving, setServicesSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: '', email: '', phone: '', city_id: '', default_address: '', bio: '' });
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const getToken = () => localStorage.getItem('easyghar_token') || '';

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

  useEffect(() => {
    if (activeTab !== 'profile' || !user) return;
    const token = getToken();
    if (!token) {
      setProfileError('Please sign in again to edit profile.');
      return;
    }
    setProfileLoading(true);
    setProfileError('');
    Promise.all([
      fetch(`${API_BASE}/api/worker/profile`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API_BASE}/api/worker/services-list`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API_BASE}/api/auth/cities`),
    ])
      .then(async ([profileRes, servicesRes, citiesRes]) => {
        const profileData = await profileRes.json().catch(() => ({}));
        const servicesData = await servicesRes.json().catch(() => ({}));
        const citiesData = await citiesRes.json().catch(() => ({}));
        if (profileRes.ok && profileData.profile) {
          setProfile(profileData.profile);
          setProfileForm({
            full_name: profileData.profile.full_name || '',
            email: profileData.profile.email || '',
            phone: profileData.profile.phone || '',
            city_id: String(profileData.profile.city_id || ''),
            default_address: profileData.profile.default_address || '',
            bio: profileData.profile.bio || '',
          });
          setProfilePhotoPreview(profileData.profile.profile_photo_url || null);
          setProfileServices(profileData.services || []);
        } else {
          setProfileError(profileData.message || 'Failed to load profile.');
        }
        if (servicesRes.ok && servicesData.services) setServicesList(servicesData.services);
        if (citiesRes.ok && citiesData.cities) setCities(citiesData.cities);
      })
      .catch(() => setProfileError('Network error.'))
      .finally(() => setProfileLoading(false));
  }, [activeTab, user]);

  const handleLogout = () => {
    localStorage.removeItem('easyghar_user');
    localStorage.removeItem('easyghar_token');
    setLogoutModalOpen(false);
    navigate('/');
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhotoFile(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  const saveProfile = async () => {
    const token = getToken();
    if (!token) return;
    setProfileSaving(true);
    try {
      const form = new FormData();
      form.append('full_name', profileForm.full_name);
      form.append('email', profileForm.email);
      form.append('phone', profileForm.phone);
      form.append('city_id', profileForm.city_id || '');
      form.append('default_address', profileForm.default_address);
      form.append('bio', profileForm.bio);
      if (profilePhotoFile) form.append('profilePicture', profilePhotoFile);
      const res = await fetch(`${API_BASE}/api/worker/profile`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setProfileError(data.message || 'Failed to update profile.');
        return;
      }
      setProfileError('');
      setProfilePhotoFile(null);
      if (user) {
        const updated = { ...user, full_name: profileForm.full_name, email: profileForm.email, phone: profileForm.phone };
        localStorage.setItem('easyghar_user', JSON.stringify(updated));
        setUser(updated);
      }
    } catch {
      setProfileError('Network error.');
    } finally {
      setProfileSaving(false);
    }
  };

  const updateServicePrice = (index, field, value) => {
    setProfileServices((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeService = (index) => {
    setProfileServices((prev) => prev.filter((_, i) => i !== index));
  };

  const addService = () => {
    const first = servicesList.find((s) => !profileServices.some((ps) => ps.service_id === s.id));
    if (first) {
      setProfileServices((prev) => [...prev, { service_id: first.id, service_key: first.service_key, name: first.english_name, minimum_charges: 0, hourly_rate: 0 }]);
    }
  };

  const addServiceById = (e) => {
    const id = parseInt(e.target.value, 10);
    if (!id) return;
    const s = servicesList.find((x) => x.id === id);
    if (s && !profileServices.some((ps) => ps.service_id === id)) {
      setProfileServices((prev) => [...prev, { service_id: s.id, service_key: s.service_key, name: s.english_name, minimum_charges: 0, hourly_rate: 0 }]);
    }
    e.target.value = '';
  };

  const saveServices = async () => {
    const token = getToken();
    if (!token) return;
    setServicesSaving(true);
    try {
      const payload = profileServices.map((s) => ({
        service_id: s.service_id,
        minimum_charges: parseFloat(s.minimum_charges) || 0,
        hourly_rate: parseFloat(s.hourly_rate) || 0,
      }));
      const res = await fetch(`${API_BASE}/api/worker/services`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ services: payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setProfileError(data.message || 'Failed to update services.');
        return;
      }
      setProfileError('');
    } catch {
      setProfileError('Network error.');
    } finally {
      setServicesSaving(false);
    }
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

        {activeTab === 'profile' && (
          <div className="pd-profile-section">
            <h2 className="pd-header-title">Profile</h2>
            <p className="pd-header-subtitle">Update your information and services</p>
            {profileError && <div className="pd-profile-error">{profileError}</div>}
            {profileLoading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading profile...</div>
            ) : !profile && !profileLoading ? (
              <div className="pd-verification-card" style={{ borderLeftColor: '#94a3b8' }}>
                <p className="pd-verification-text">Unable to load profile. Please try again or sign in again.</p>
              </div>
            ) : profile && profile.verification_status === 'pending' ? (
              <div className="pd-verification-card pd-verification-pending">
                <div className="pd-verification-icon">⏳</div>
                <h3 className="pd-verification-title">Your verification is in progress</h3>
                <p className="pd-verification-text">
                  Once our team completes the review, you will be able to edit your profile and manage your services here.
                  We will notify you when your account is approved.
                </p>
              </div>
            ) : profile && profile.verification_status === 'rejected' ? (
              <div className="pd-verification-card pd-verification-rejected">
                <div className="pd-verification-icon">✕</div>
                <h3 className="pd-verification-title">Verification not approved</h3>
                <p className="pd-verification-text">
                  Your application could not be approved at this time.
                  {profile.verification_notes ? (
                    <>
                      {' '}The admin left the following note:
                      <blockquote className="pd-verification-notes">{profile.verification_notes}</blockquote>
                    </>
                  ) : (
                    ' You may contact support if you have questions.'
                  )}
                </p>
              </div>
            ) : (
              <>
                <div className="pd-profile-card">
                  <h3 className="pd-profile-card-title">Personal information</h3>
                  <div className="pd-profile-photo-row">
                    <div className="pd-profile-photo-wrap">
                      {profilePhotoPreview ? (
                        <img src={profilePhotoPreview} alt="Profile" className="pd-profile-photo" />
                      ) : (
                        <div className="pd-profile-photo-placeholder">{initials}</div>
                      )}
                    </div>
                    <div>
                      <label className="pd-profile-label">Profile photo</label>
                      <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="pd-profile-file" />
                    </div>
                  </div>
                  <div className="pd-profile-grid">
                    <label className="pd-profile-label">Full name</label>
                    <input type="text" name="full_name" value={profileForm.full_name} onChange={handleProfileChange} className="pd-profile-input" placeholder="Your name" />
                    <label className="pd-profile-label">Email</label>
                    <input type="email" name="email" value={profileForm.email} onChange={handleProfileChange} className="pd-profile-input" placeholder="email@example.com" />
                    <label className="pd-profile-label">Phone</label>
                    <input type="text" name="phone" value={profileForm.phone} onChange={handleProfileChange} className="pd-profile-input" placeholder="+92 300 1234567" />
                    <label className="pd-profile-label">City</label>
                    <select name="city_id" value={profileForm.city_id} onChange={handleProfileChange} className="pd-profile-input">
                      <option value="">Select city</option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.city_name}{c.city_name_urdu ? `  •  ${c.city_name_urdu}` : ''}
                        </option>
                      ))}
                    </select>
                    <label className="pd-profile-label">Address</label>
                    <input type="text" name="default_address" value={profileForm.default_address} onChange={handleProfileChange} className="pd-profile-input" placeholder="Area, address" />
                    <label className="pd-profile-label">Bio</label>
                    <textarea name="bio" value={profileForm.bio} onChange={handleProfileChange} className="pd-profile-input pd-profile-bio" placeholder="Short intro about you and your services" rows={3} />
                  </div>
                  <button type="button" className="pd-primary-btn" onClick={saveProfile} disabled={profileSaving}>
                    {profileSaving ? 'Saving...' : 'Save profile'}
                  </button>
                </div>

                <div className="pd-profile-card">
                  <h3 className="pd-profile-card-title">My services & pricing</h3>
                  <p className="pd-profile-card-sub">Add or remove services and set minimum charges and hourly rates.</p>
                  <div className="pd-services-table">
                    <div className="pd-services-table-header">
                      <span>Service</span>
                      <span>Min charges (Rs)</span>
                      <span>Hourly rate (Rs)</span>
                      <span></span>
                    </div>
                    {profileServices.map((s, i) => (
                      <div key={s.service_id || i} className="pd-services-table-row">
                        <span className="pd-services-name">{s.name || s.english_name}</span>
                        <input type="number" min="0" step="50" value={s.minimum_charges} onChange={(e) => updateServicePrice(i, 'minimum_charges', e.target.value)} className="pd-services-input" />
                        <input type="number" min="0" step="50" value={s.hourly_rate} onChange={(e) => updateServicePrice(i, 'hourly_rate', e.target.value)} className="pd-services-input" />
                        <button type="button" className="pd-profile-remove-btn" onClick={() => removeService(i)}>Remove</button>
                      </div>
                    ))}
                  </div>
                  <div className="pd-profile-add-service">
                    <select onChange={addServiceById} className="pd-profile-input" style={{ maxWidth: 220 }}>
                      <option value="">Add a service...</option>
                      {servicesList.filter((s) => !profileServices.some((ps) => ps.service_id === s.id)).map((s) => (
                        <option key={s.id} value={s.id}>{s.english_name}</option>
                      ))}
                    </select>
                  </div>
                  <button type="button" className="pd-primary-btn" onClick={saveServices} disabled={servicesSaving}>
                    {servicesSaving ? 'Saving...' : 'Save services'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab !== 'dashboard' && activeTab !== 'profile' && (
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
