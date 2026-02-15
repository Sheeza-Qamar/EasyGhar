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
        const isCustomer = data.user.role === 'customer';
        const next = isWorker ? '/provider-dashboard' : isCustomer ? '/services' : '/';
        setTimeout(() => navigate(next), 800);
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

      <div className="customer-content-wrapper customer-signin-centered min-h-screen" style={{ paddingTop: '72px' }}>
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
