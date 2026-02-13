import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingpage/landingpage';
import RoleSelection from './components/role-selection/RoleSelection';
import CustomerSignup from './components/customer-signup/CustomerSignup';
import SignIn from './components/signin/SignIn';
import ProviderSignup from './components/provider-signup/ProviderSignup';
import ProviderDashboard from './components/provider-dashboard/ProviderDashboard';
import AdminDashboard from './components/admin-dashboard/AdminDashboard';
import TermsOfService from './components/legal/TermsOfService';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<RoleSelection />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/join-as-provider" element={<ProviderSignup />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
