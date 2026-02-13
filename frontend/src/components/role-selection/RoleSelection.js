import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './role-selection.css';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
  };

  const selectRole = (role, e) => {
    if (e.target.closest('button')) return;
    setSelectedRole(role);
  };

  const handleCustomerClick = (e) => {
    e.stopPropagation();
    showToast('Redirecting to customer signup...', 'success');
    setTimeout(() => navigate('/customer-signup'), 800);
  };

  const handleProviderClick = (e) => {
    e.stopPropagation();
    showToast('Redirecting to provider signup...', 'success');
    setTimeout(() => navigate('/join-as-provider'), 800);
  };

  return (
    <div className="role-selection-page w-full min-h-screen">
      <Navbar />
      <main className="min-h-screen pt-28 lg:pt-32 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Choose Your Role
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Select how you'd like to use HomeServe Pro
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
            {/* Customer Card */}
            <div
              className={`role-card ${selectedRole === 'customer' ? 'active' : ''}`}
              onClick={(e) => selectRole('customer', e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectRole('customer', e)}
            >
              <div className="role-badge">For Customers</div>
              <div className="role-card-icon">👤</div>
              <h2 className="role-card-title">I'm Looking for Services</h2>
              <p className="role-card-description">
                Browse and book trusted professionals for your home needs
              </p>
              <ul className="role-features">
                <li>Find verified service providers</li>
                <li>View ratings and reviews</li>
                <li>Book services instantly</li>
                <li>Secure payments</li>
                <li>24/7 customer support</li>
              </ul>
              <button
                type="button"
                className="role-button"
                onClick={handleCustomerClick}
              >
                Continue as Customer
              </button>
            </div>

            {/* Provider Card */}
            <div
              className={`role-card ${selectedRole === 'provider' ? 'active' : ''}`}
              onClick={(e) => selectRole('provider', e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectRole('provider', e)}
            >
              <div className="role-badge role-badge-provider">For Providers</div>
              <div className="role-card-icon">👨‍🔧</div>
              <h2 className="role-card-title">I'm a Service Provider</h2>
              <p className="role-card-description">
                Grow your business and reach more customers
              </p>
              <ul className="role-features">
                <li>Build your professional profile</li>
                <li>Manage service requests</li>
                <li>Set your own rates</li>
                <li>Flexible scheduling</li>
                <li>Grow your customer base</li>
              </ul>
              <button
                type="button"
                className="role-button role-button-provider"
                onClick={handleProviderClick}
              >
                Continue as Provider
              </button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-center mt-16 md:mt-20">
            <p className="text-slate-600 text-sm">
              You can change your role anytime in your account settings
            </p>
          </div>
        </div>
      </main>

      {/* Toast */}
      <div
        className={`role-selection-toast ${toast.show ? 'show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast.show && (
          <div className="role-selection-toast success">
            <div className="role-selection-toast-content">
              <span>✓</span>
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
