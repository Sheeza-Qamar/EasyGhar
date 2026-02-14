import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import '../customer-signup/customer-signup.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '', // phone or email
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

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
    if (!formData.login.trim()) newErrors.login = 'Phone or email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    const isEmail = formData.login.trim().includes('@');
    const body = isEmail
      ? { email: formData.login.trim(), password: formData.password }
      : { phone: formData.login.trim(), password: formData.password };

    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data.message || 'Sign in failed. Please try again.', 'error');
        return;
      }
      showToast(data.message || 'Signed in successfully.', 'success');
      if (data.user) {
        try {
          localStorage.setItem('easyghar_user', JSON.stringify(data.user));
          if (data.token) localStorage.setItem('easyghar_token', data.token);
        } catch (_) {}
        const isWorker = data.user.role === 'worker';
        setTimeout(() => navigate(isWorker ? '/provider-dashboard' : '/'), 800);
      } else {
        setTimeout(() => navigate('/'), 800);
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

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

      {toast.show && (
        <div className={`customer-toast ${toast.type === 'error' ? 'customer-toast-error' : 'customer-toast-success'}`}>
          <div className="customer-toast-content">
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="customer-content-wrapper grid grid-cols-1 lg:grid-cols-2 min-h-screen" style={{ paddingTop: '72px' }}>
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
            <h2>Welcome back<br />to Easyghar</h2>
            <p>
              Sign in to book services, manage your bookings, and connect with verified home service professionals.
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
            </div>
          </div>
        </div>

        <div className="customer-form-column">
          <div className="customer-form-column-inner">
            <div className="customer-form-card">
              <div className="customer-header-section">
                <div className="customer-header-subtitle">Sign In</div>
                <h1 className="customer-header-title">Welcome Back</h1>
                <p className="customer-header-description">
                  Enter your phone or email and password to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} id="signin-form">
                <div className="customer-form-group customer-stagger-1">
                  <label className="customer-form-label" htmlFor="login">Phone or Email</label>
                  <input
                    type="text"
                    id="login"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    className={`customer-form-input ${errors.login ? 'error' : ''}`}
                    placeholder="+92 300 1234567 or john@example.com"
                    autoComplete="username"
                  />
                  {errors.login && <p className="customer-form-error">{errors.login}</p>}
                </div>

                <div className="customer-form-group customer-stagger-2">
                  <label className="customer-form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`customer-form-input ${errors.password ? 'error' : ''}`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {errors.password && <p className="customer-form-error">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="customer-submit-button customer-stagger-3"
                >
                  {submitting ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="customer-login-link customer-stagger-4">
                Don’t have an account? <Link to="/get-started">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
