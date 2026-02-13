import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './customer-signup.css';

const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan',
  'Hyderabad', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Sargodha',
  'Bahawalpur', 'Sukkur', 'Mardan', 'Gujrat', 'Abbottabad', 'Sheikhupura',
  'Larkana', 'Rahim Yar Khan',
];

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    defaultAddress: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/register/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          password: formData.password,
          city: formData.city || undefined,
          defaultAddress: formData.defaultAddress.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data.message || 'Registration failed. Please try again.', 'error');
        return;
      }
      setSuccess(true);
      showToast(data.message || 'Account created successfully!', 'success');
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  /* Success screen */
  if (success) {
    return (
      <div className="customer-signup-page">
        <Navbar />
        <div className="customer-blob-container">
          <div className="customer-blob customer-blob-1" />
          <div className="customer-blob customer-blob-2" />
          <div className="customer-blob customer-blob-3" />
          <div className="customer-blob customer-blob-4" />
          <div className="customer-blob customer-blob-5" />
        </div>
        <div className="customer-content-wrapper" style={{ paddingTop: '80px' }}>
          <div className="customer-form-column">
            <div className="customer-form-column-inner">
              <div className="customer-success-card customer-stagger-1">
                <div className="customer-success-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="customer-success-title">You’re all set</h1>
                <p className="customer-success-text">
                  Your customer account has been created successfully.
                </p>
                <Link to="/" className="customer-success-button">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-signup-page">
      <Navbar />
      {/* Animated background blobs */}
      <div className="customer-blob-container">
        <div className="customer-blob customer-blob-1" />
        <div className="customer-blob customer-blob-2" />
        <div className="customer-blob customer-blob-3" />
        <div className="customer-blob customer-blob-4" />
        <div className="customer-blob customer-blob-5" />
      </div>

      {/* Toast */}
      {toast.show && (
        <div className={`customer-toast ${toast.type === 'error' ? 'customer-toast-error' : 'customer-toast-success'}`}>
          <div className="customer-toast-content">
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main: two columns */}
      <div className="customer-content-wrapper grid grid-cols-1 lg:grid-cols-2 min-h-screen" style={{ paddingTop: '72px' }}>
        {/* Left - benefits (hidden on mobile) */}
        <div className="customer-left-section hidden lg:flex">
          <div className="customer-left-content">
            <svg className="customer-logo-svg w-12 h-12 mb-12 opacity-90" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" fill="white" opacity="0.15" stroke="white" strokeWidth="1.5" />
              <path d="M12 30L24 15L36 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="15" y="30" width="18" height="12" rx="1.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="20" y="33" width="8" height="9" rx="0.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="26.5" cy="38" r="1" fill="white" />
              <rect x="15.5" y="33" width="3" height="3" rx="0.4" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="29.5" y="33" width="3" height="3" rx="0.4" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <h2>Welcome to<br />Easyghar</h2>
            <p>
              Discover trusted home service professionals in your area. From repairs to renovations, we connect you with verified experts.
            </p>
            <div>
              <div className="customer-benefit-item">
                <div className="customer-benefit-icon">🎯</div>
                <div className="customer-benefit-text">
                  <div className="customer-benefit-title">Verified Professionals</div>
                  All providers are thoroughly vetted and rated by real customers.
                </div>
              </div>
              <div className="customer-benefit-item">
                <div className="customer-benefit-icon">⚡</div>
                <div className="customer-benefit-text">
                  <div className="customer-benefit-title">Instant Booking</div>
                  Reserve services in seconds with real-time availability.
                </div>
              </div>
              <div className="customer-benefit-item">
                <div className="customer-benefit-icon">🛡️</div>
                <div className="customer-benefit-text">
                  <div className="customer-benefit-title">100% Safe & Secure</div>
                  Your data is encrypted and transactions are protected.
                </div>
              </div>
              <div className="customer-benefit-item">
                <div className="customer-benefit-icon">💬</div>
                <div className="customer-benefit-text">
                  <div className="customer-benefit-title">Round-the-Clock Support</div>
                  Our team is always ready to help 24/7.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - form */}
        <div className="customer-form-column">
          <div className="customer-form-column-inner">
            <div className="customer-form-card">
              <div className="customer-header-section">
                <div className="customer-header-subtitle">Get Started</div>
                <h1 className="customer-header-title">Create Account</h1>
                <p className="customer-header-description">
                  Join thousands of customers finding trusted services
                </p>
              </div>

              <form onSubmit={handleSubmit} id="customer-signup-form">
                <div className="customer-form-group customer-stagger-1">
                  <label className="customer-form-label" htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`customer-form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="customer-form-error">{errors.fullName}</p>}
                </div>

                <div className="customer-form-row customer-stagger-2">
                  <div className="customer-form-group">
                    <label className="customer-form-label" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`customer-form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+92 300 1234567"
                    />
                    {errors.phone && <p className="customer-form-error">{errors.phone}</p>}
                  </div>
                  <div className="customer-form-group">
                    <label className="customer-form-label" htmlFor="email">Email Address (optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="customer-form-input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="customer-form-row customer-stagger-3">
                  <div className="customer-form-group">
                    <label className="customer-form-label" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`customer-form-input ${errors.password ? 'error' : ''}`}
                      placeholder="••••••••"
                      minLength={8}
                    />
                    {errors.password && <p className="customer-form-error">{errors.password}</p>}
                  </div>
                  <div className="customer-form-group">
                    <label className="customer-form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`customer-form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="customer-form-error">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="customer-divider-text customer-stagger-4">Location Details</div>

                <div className="customer-form-row customer-stagger-5">
                  <div className="customer-form-group">
                    <label className="customer-form-label" htmlFor="city">City (optional)</label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="customer-form-input"
                    >
                      <option value="">Select city</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="customer-form-group">
                    <label className="customer-form-label" htmlFor="defaultAddress">Street / Area (optional)</label>
                    <input
                      type="text"
                      id="defaultAddress"
                      name="defaultAddress"
                      value={formData.defaultAddress}
                      onChange={handleChange}
                      className="customer-form-input"
                      placeholder="123 Main Street, Block, Area"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="customer-submit-button customer-stagger-6"
                >
                  {submitting ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className="customer-login-link customer-stagger-7">
                Already have an account? <Link to="/signin">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;
