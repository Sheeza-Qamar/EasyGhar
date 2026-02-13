import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './provider-signup.css';

const ProviderSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cnic: '',
    city: '',
    defaultAddress: '',
    experience: '',
    bio: '',
    terms: false,
    updates: false,
    profilePicture: null
  });
  const [servicePricing, setServicePricing] = useState({}); // { serviceId: { minRate: '', hourlyRate: '' } }
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [profilePreview, setProfilePreview] = useState(null);

  const services = [
    { id: 'plumbing', name: 'Plumbing', nameUrdu: 'پلمبنگ', icon: '🔧' },
    { id: 'electrical', name: 'Electrical', nameUrdu: 'بجلی', icon: '⚡' },
    { id: 'cleaning', name: 'Cleaning', nameUrdu: 'صفائی', icon: '✨' },
    { id: 'ac-service', name: 'AC Service', nameUrdu: 'اے سی سروس', icon: '❄️' },
    { id: 'painting', name: 'Painting', nameUrdu: 'پینٹنگ', icon: '🎨' },
    { id: 'carpentry', name: 'Carpentry', nameUrdu: 'بڑھئی', icon: '🪚' },
    { id: 'appliance-repair', name: 'Appliance Repair', nameUrdu: 'آلات کی مرمت', icon: '🔌' },
    { id: 'roofing', name: 'Roofing', nameUrdu: 'چھت', icon: '🏠' },
    { id: 'flooring', name: 'Flooring', nameUrdu: 'فرش', icon: '🪵' },
    { id: 'tiling', name: 'Tiling', nameUrdu: 'ٹائیلنگ', icon: '🧱' },
    { id: 'masonry', name: 'Masonry', nameUrdu: 'راج', icon: '🧱' },
    { id: 'welding', name: 'Welding', nameUrdu: 'ویلڈنگ', icon: '⚒️' },
    { id: 'locksmith', name: 'Locksmith', nameUrdu: 'تالا ساز', icon: '🔐' },
    { id: 'glass-repair', name: 'Glass Repair', nameUrdu: 'شیشے کی مرمت', icon: '🪟' },
    { id: 'upholstery', name: 'Upholstery', nameUrdu: 'گدی سازی', icon: '🛋️' },
    { id: 'gardening', name: 'Gardening', nameUrdu: 'باغبانی', icon: '🌳' },
    { id: 'landscaping', name: 'Landscaping', nameUrdu: 'زمین کی تزئین', icon: '🌿' },
    { id: 'pest-control', name: 'Pest Control', nameUrdu: 'کیڑے مار', icon: '🐛' },
    { id: 'waterproofing', name: 'Waterproofing', nameUrdu: 'واٹر پروفنگ', icon: '💧' },
    { id: 'furniture-assembly', name: 'Furniture Assembly', nameUrdu: 'فرنیچر اسمبلی', icon: '🪑' },
    { id: 'tv-mounting', name: 'TV Mounting', nameUrdu: 'ٹی وی ماؤنٹنگ', icon: '📺' },
    { id: 'curtain-installation', name: 'Curtain Installation', nameUrdu: 'پردے لگانا', icon: '🪟' },
    { id: 'blinds-installation', name: 'Blinds Installation', nameUrdu: 'بلائنڈز لگانا', icon: '🪟' },
    { id: 'wallpaper-installation', name: 'Wallpaper Installation', nameUrdu: 'وال پیپر لگانا', icon: '🖼️' },
    { id: 'door-installation', name: 'Door Installation', nameUrdu: 'دروازہ لگانا', icon: '🚪' },
    { id: 'window-installation', name: 'Window Installation', nameUrdu: 'کھڑکی لگانا', icon: '🪟' },
    { id: 'fence-installation', name: 'Fence Installation', nameUrdu: 'باڑ لگانا', icon: '🚧' },
    { id: 'gate-installation', name: 'Gate Installation', nameUrdu: 'گیٹ لگانا', icon: '🚪' },
    { id: 'cctv-installation', name: 'CCTV Installation', nameUrdu: 'سی سی ٹی وی لگانا', icon: '📹' },
    { id: 'security-system', name: 'Security System', nameUrdu: 'سیکیورٹی سسٹم', icon: '🔒' },
    { id: 'intercom-installation', name: 'Intercom Installation', nameUrdu: 'انٹرکام لگانا', icon: '📞' },
    { id: 'water-tank-cleaning', name: 'Water Tank Cleaning', nameUrdu: 'پانی کے ٹینک کی صفائی', icon: '💧' },
    { id: 'septic-tank-cleaning', name: 'Septic Tank Cleaning', nameUrdu: 'سیپٹک ٹینک کی صفائی', icon: '🚽' },
    { id: 'drain-cleaning', name: 'Drain Cleaning', nameUrdu: 'نالی کی صفائی', icon: '🚿' },
    { id: 'chimney-cleaning', name: 'Chimney Cleaning', nameUrdu: 'چمنی کی صفائی', icon: '🔥' },
    { id: 'carpet-cleaning', name: 'Carpet Cleaning', nameUrdu: 'قالین کی صفائی', icon: '🧹' },
    { id: 'sofa-cleaning', name: 'Sofa Cleaning', nameUrdu: 'صوفے کی صفائی', icon: '🛋️' },
    { id: 'mattress-cleaning', name: 'Mattress Cleaning', nameUrdu: 'گدے کی صفائی', icon: '🛏️' },
    { id: 'car-washing', name: 'Car Washing', nameUrdu: 'گاڑی دھونا', icon: '🚗' },
    { id: 'bike-washing', name: 'Bike Washing', nameUrdu: 'موٹر سائیکل دھونا', icon: '🏍️' },
    { id: 'bathroom-renovation', name: 'Bathroom Renovation', nameUrdu: 'باتھ روم کی تجدید', icon: '🚿' },
    { id: 'kitchen-renovation', name: 'Kitchen Renovation', nameUrdu: 'باورچی خانے کی تجدید', icon: '🍳' },
    { id: 'false-ceiling', name: 'False Ceiling', nameUrdu: 'جھوٹی چھت', icon: '🏛️' },
    { id: 'pop-work', name: 'POP Work', nameUrdu: 'پوپ کا کام', icon: '🏗️' },
    { id: 'marble-polishing', name: 'Marble Polishing', nameUrdu: 'سنگ مرمر پالش', icon: '💎' },
    { id: 'wood-polishing', name: 'Wood Polishing', nameUrdu: 'لکڑی پالش', icon: '🪵' },
    { id: 'floor-polishing', name: 'Floor Polishing', nameUrdu: 'فرش پالش', icon: '✨' },
    { id: 'car-painting', name: 'Car Painting', nameUrdu: 'گاڑی پینٹنگ', icon: '🚗' },
    { id: 'bike-painting', name: 'Bike Painting', nameUrdu: 'موٹر سائیکل پینٹنگ', icon: '🏍️' },
    { id: 'generator-service', name: 'Generator Service', nameUrdu: 'جنریٹر سروس', icon: '⚡' },
    { id: 'inverter-service', name: 'Inverter Service', nameUrdu: 'انورٹر سروس', icon: '🔋' },
    { id: 'solar-panel-installation', name: 'Solar Panel Installation', nameUrdu: 'سولر پینل لگانا', icon: '☀️' },
    { id: 'water-pump-repair', name: 'Water Pump Repair', nameUrdu: 'پانی کے پمپ کی مرمت', icon: '💧' },
    { id: 'motor-winding', name: 'Motor Winding', nameUrdu: 'موٹر وائنڈنگ', icon: '⚙️' },
    { id: 'bike-repair', name: 'Bike Repair', nameUrdu: 'موٹر سائیکل کی مرمت', icon: '🏍️' },
    { id: 'car-repair', name: 'Car Repair', nameUrdu: 'گاڑی کی مرمت', icon: '🚗' },
    { id: 'bicycle-repair', name: 'Bicycle Repair', nameUrdu: 'سائیکل کی مرمت', icon: '🚲' }
  ];

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Hyderabad'
  ];

  const progress = (currentStep / 4) * 100;

  // Password rules checker
  const getPasswordRules = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      allPass: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };
  const passwordRules = getPasswordRules(formData.password);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // When password changes, clear confirmPassword error so user can re-enter
    if (name === 'password' && errors.confirmPassword) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  };

  const toggleService = (serviceId) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
                // Remove pricing when service is deselected
        setServicePricing(prevPricing => {
          const newPricing = { ...prevPricing };
          delete newPricing[serviceId];
          return newPricing;
        });
      } else {
        newSet.add(serviceId);
        // Initialize pricing when service is selected
        setServicePricing(prevPricing => ({
          ...prevPricing,
          [serviceId]: {
            minRate: '',
            hourlyRate: ''
          }
        }));
      }
      return newSet;
    });
  };


  const handleServicePricingChange = (serviceId, field, value) => {
    setServicePricing(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value
      }
    }));
    // Clear errors for this service
    if (errors[`${serviceId}_minRate`] || errors[`${serviceId}_hourlyRate`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${serviceId}_minRate`];
        delete newErrors[`${serviceId}_hourlyRate`];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (!passwordRules.allPass) newErrors.password = 'Password must meet all rules below';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.cnic.trim()) newErrors.cnic = 'CNIC is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.defaultAddress.trim()) newErrors.defaultAddress = 'Default area / address is required';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
      else if (formData.bio.length < 200) newErrors.bio = 'Bio must be at least 200 characters';
      else if (formData.bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
      if (!formData.profilePicture) newErrors.profilePicture = 'Profile picture is required';
      if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    }

    if (step === 2) {
      if (selectedServices.size === 0) {
        newErrors.services = 'Please select at least one service';
        showToast('Please select at least one service', 'error');
        return false;
      }
      // Validate pricing for each selected service
      selectedServices.forEach(serviceId => {
        const pricing = servicePricing[serviceId];
        if (!pricing || !pricing.minRate || pricing.minRate.trim() === '') {
          newErrors[`${serviceId}_minRate`] = 'Minimum rate is required for this service';
        }
        if (!pricing || !pricing.hourlyRate || pricing.hourlyRate.trim() === '') {
          newErrors[`${serviceId}_hourlyRate`] = 'Hourly rate is required for this service';
        }
      });
    }

    if (step === 3) {
      const cnicFront = document.getElementById('cnic-front');
      const cnicBack = document.getElementById('cnic-back');
      if (!cnicFront?.files?.length) newErrors.cnicFront = 'CNIC front is required';
      if (!cnicBack?.files?.length) newErrors.cnicBack = 'CNIC back is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [submitting, setSubmitting] = useState(false);

  const submitForm = async () => {
    if (!validateStep(3)) return;
    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullname.trim());
    formDataToSend.append('email', formData.email.trim() || '');
    formDataToSend.append('phone', formData.phone.trim());
    formDataToSend.append('password', formData.password);
    formDataToSend.append('cnic', formData.cnic.trim());
    formDataToSend.append('city', (formData.city || '').trim());
    formDataToSend.append('defaultAddress', (formData.defaultAddress || '').trim());
    formDataToSend.append('experience', String(formData.experience || 0));
    formDataToSend.append('bio', (formData.bio || '').trim());

    const pricingByKey = {};
    selectedServices.forEach((serviceId) => {
      pricingByKey[serviceId] = {
        minRate: servicePricing[serviceId]?.minRate ?? '',
        hourlyRate: servicePricing[serviceId]?.hourlyRate ?? '',
      };
    });
    formDataToSend.append('servicesData', JSON.stringify(pricingByKey));

    if (formData.profilePicture && formData.profilePicture instanceof File) {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }
    const cnicFrontEl = document.getElementById('cnic-front');
    const cnicBackEl = document.getElementById('cnic-back');
    if (cnicFrontEl?.files?.[0]) formDataToSend.append('cnicFront', cnicFrontEl.files[0]);
    if (cnicBackEl?.files?.[0]) formDataToSend.append('cnicBack', cnicBackEl.files[0]);

    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/register/worker`, {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data.message || 'Registration failed. Please try again.', 'error');
        return;
      }
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(data.message || 'Application submitted successfully!', 'success');
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleFileChange = (e, fieldName) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const parent = e.target.parentElement;
      const nameElement = parent.querySelector('p:last-child');
      if (nameElement) {
        nameElement.textContent = file.name;
      }
      parent.classList.add('bg-green-50', 'border-green-300');
      parent.classList.remove('border-slate-300');
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      
      <main className="min-h-screen pt-28 lg:pt-32 pb-16 gradient-mesh">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="mb-4 stagger-1">
              <span className="badge">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v4h8v-4zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg> Join 2,000+ Service Providers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4 stagger-2">
              Join Our Network
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto stagger-3">
              Start earning today as a verified professional. Connect with thousands of customers looking for your services.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 stagger-4">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Steps */}
          <div className="steps-container stagger-5 mb-12">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
              >
                <div className="step-circle">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Services'}
                  {step === 3 && 'Documents'}
                  {step === 4 && 'Complete'}
                </div>
              </div>
            ))}
          </div>

          {/* Form Container */}
          <div className="glass rounded-2xl p-8 md:p-12 shadow-2xl stagger-6">
            <form id="signup-form">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Tell Us About Yourself</h2>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="form-group">
                      <label className="form-label required">Full Name</label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className={`form-input ${errors.fullname ? 'error' : formData.fullname ? 'success' : ''}`}
                        placeholder="Muhammad Ahmed Khan"
                        required
                      />
                      {errors.fullname && <div className="form-error">{errors.fullname}</div>}
                      <div className="form-hint">Your professional name as it will appear</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'error' : formData.email ? 'success' : ''}`}
                        placeholder="ahmed@example.com"
                        required
                      />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                      <div className="form-hint">We'll send verification link here</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? 'error' : formData.phone ? 'success' : ''}`}
                        placeholder="+92 300 1234567"
                        required
                      />
                      {errors.phone && <div className="form-error">{errors.phone}</div>}
                      <div className="form-hint">For customer communication</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">CNIC Number</label>
                      <input
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleInputChange}
                        className={`form-input ${errors.cnic ? 'error' : formData.cnic ? 'success' : ''}`}
                        placeholder="12345-6789012-3"
                        required
                      />
                      {errors.cnic && <div className="form-error">{errors.cnic}</div>}
                      <div className="form-hint">Required for verification</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="form-group">
                      <label className="form-label required">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`form-input ${errors.password ? 'error' : passwordRules.allPass ? 'success' : ''}`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                      />
                      {errors.password && <div className="form-error">{errors.password}</div>}
                      <div className="password-rules mt-2">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Password must have:</p>
                        <ul className="space-y-1 text-xs">
                          <li className={passwordRules.minLength ? 'text-green-600' : 'text-slate-500'}>
                            {passwordRules.minLength ? '✓' : '○'} At least 8 characters
                          </li>
                          <li className={passwordRules.hasUpper ? 'text-green-600' : 'text-slate-500'}>
                            {passwordRules.hasUpper ? '✓' : '○'} One uppercase letter
                          </li>
                          <li className={passwordRules.hasLower ? 'text-green-600' : 'text-slate-500'}>
                            {passwordRules.hasLower ? '✓' : '○'} One lowercase letter
                          </li>
                          <li className={passwordRules.hasNumber ? 'text-green-600' : 'text-slate-500'}>
                            {passwordRules.hasNumber ? '✓' : '○'} One number
                          </li>
                          <li className={passwordRules.hasSpecial ? 'text-green-600' : 'text-slate-500'}>
                            {passwordRules.hasSpecial ? '✓' : '○'} One special character (!@#$%^&* etc.)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`form-input ${errors.confirmPassword ? 'error' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'success' : ''}`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                      />
                      {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
                      <div className="form-hint">Re-enter your password</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="form-group">
                      <label className="form-label required">City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`form-select ${errors.city ? 'error' : formData.city ? 'success' : ''}`}
                        required
                      >
                        <option value="">Select Your City</option>
                        {cities.map(city => (
                          <option key={city.toLowerCase()} value={city.toLowerCase()}>{city}</option>
                        ))}
                      </select>
                      {errors.city && <div className="form-error">{errors.city}</div>}
                      <div className="form-hint">Primary location for services</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Default Area / Address</label>
                      <input
                        type="text"
                        name="defaultAddress"
                        value={formData.defaultAddress}
                        onChange={handleInputChange}
                        className={`form-input ${errors.defaultAddress ? 'error' : formData.defaultAddress ? 'success' : ''}`}
                        placeholder="e.g. DHA Phase 5, Gulberg III, Sector F-7"
                        required
                      />
                      {errors.defaultAddress && <div className="form-error">{errors.defaultAddress}</div>}
                      <div className="form-hint">Area or address where you usually provide services</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="form-group">
                      <label className="form-label required">Experience (Years)</label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`form-input ${errors.experience ? 'error' : formData.experience ? 'success' : ''}`}
                        placeholder="5"
                        min="0"
                        max="60"
                        required
                      />
                      {errors.experience && <div className="form-error">{errors.experience}</div>}
                      <div className="form-hint">Years of professional experience</div>
                    </div>
                  </div>

                  <div className="form-group mb-8">
                    <label className="form-label required">Professional Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className={`form-textarea ${errors.bio ? 'error' : formData.bio ? 'success' : ''}`}
                      placeholder="Tell customers about your expertise, certifications, and what makes you special..."
                      required
                    ></textarea>
                    {errors.bio && <div className="form-error">{errors.bio}</div>}
                    <div className="form-hint">
                      {formData.bio.length}/500 characters (minimum 200)
                    </div>
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="form-group mb-8">
                    <label className="form-label required">Profile Picture</label>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className={`profile-picture-upload ${errors.profilePicture ? 'error' : formData.profilePicture ? 'success' : ''}`}>
                          <input
                            type="file"
                            id="profile-picture"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  setErrors(prev => ({ ...prev, profilePicture: 'Image size must be less than 5MB' }));
                                  return;
                                }
                                if (!file.type.startsWith('image/')) {
                                  setErrors(prev => ({ ...prev, profilePicture: 'Please upload a valid image file' }));
                                  return;
                                }
                                setFormData(prev => ({ ...prev, profilePicture: file }));
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setProfilePreview(reader.result);
                                };
                                reader.readAsDataURL(file);
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.profilePicture;
                                  return newErrors;
                                });
                              }
                            }}
                            required
                          />
                          <label htmlFor="profile-picture" className="cursor-pointer">
                            {profilePreview ? (
                              <div className="relative">
                                <img
                                  src={profilePreview}
                                  alt="Profile preview"
                                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                                  <svg className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="w-32 h-32 rounded-full border-3 border-dashed border-slate-300 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
                                <svg className="w-12 h-12 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-xs text-slate-500 font-medium">Click to upload</span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                          errors.profilePicture 
                            ? 'border-red-300 bg-red-50' 
                            : formData.profilePicture 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-slate-300 hover:border-blue-500 bg-white'
                        }`} onClick={() => document.getElementById('profile-picture').click()}>
                          <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-semibold text-slate-900 mb-1">
                            {formData.profilePicture ? formData.profilePicture.name : 'Upload Profile Picture'}
                          </p>
                          <p className="text-sm text-slate-500">
                            {formData.profilePicture 
                              ? 'Click to change' 
                              : 'Click to upload or drag and drop (Max 5MB)'}
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            JPG, PNG or GIF. Square images work best.
                          </p>
                        </div>
                        {errors.profilePicture && <div className="form-error mt-2">{errors.profilePicture}</div>}
                        {formData.profilePicture && !errors.profilePicture && (
                          <div className="form-success mt-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Profile picture uploaded successfully
                          </div>
                        )}
                        <div className="form-hint mt-2">
                          This will be displayed on your profile to customers
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="checkbox-group mb-8">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="checkbox-label" htmlFor="terms">
                        I agree to the <Link to="/terms-of-service" className="text-blue-600 hover:underline" target="_blank">Terms of Service</Link> and{' '}
                        <Link to="/privacy-policy" className="text-blue-600 hover:underline" target="_blank">Privacy Policy</Link>
                      </label>
                    </div>
                    {errors.terms && <div className="form-error">{errors.terms}</div>}
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="updates"
                        name="updates"
                        checked={formData.updates}
                        onChange={handleInputChange}
                      />
                      <label className="checkbox-label" htmlFor="updates">
                        Receive updates about earning opportunities and promotional offers
                      </label>
                    </div>
                  </div>

                  <button type="button" onClick={nextStep} className="btn btn-primary">
                    Continue to Services
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Step 2: Services */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Select Your Services</h2>
                  <p className="text-slate-600 mb-8">Choose all services you're qualified to provide. You can select multiple services.</p>
                  
                  <div className="form-group mb-8">
                    <label className="form-label required">Services</label>
                    <div className={`service-selection-grid ${errors.services ? 'border-2 border-red-300 rounded-lg p-4' : ''}`}>
                      {services.map(service => {
                        const isSelected = selectedServices.has(service.id);
                        return (
                          <div
                            key={service.id}
                            className={`service-selection-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleService(service.id)}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleService(service.id)}
                                className="service-checkbox"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="text-2xl">{service.icon}</span>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900">{service.name}</div>
                                <div className="text-sm text-slate-600">{service.nameUrdu}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.services && <div className="form-error mt-2">{errors.services}</div>}
                    <div className="form-hint mt-2">
                      {selectedServices.size > 0 
                        ? `${selectedServices.size} service${selectedServices.size > 1 ? 's' : ''} selected`
                        : 'Click on services to select them. You can select multiple services.'}
                    </div>
                    {selectedServices.size > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-slate-900 mb-2">Selected Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(selectedServices).map(serviceId => {
                            const service = services.find(s => s.id === serviceId);
                            return service ? (
                              <span
                                key={serviceId}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                              >
                                {service.icon} {service.name} <span className="text-blue-600 font-normal">({service.nameUrdu})</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleService(serviceId);
                                  }}
                                  className="ml-1 hover:text-blue-900 font-bold"
                                  aria-label={`Remove ${service.name}`}
                                >
                                  ×
                                </button>
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service-Specific Pricing */}
                  {selectedServices.size > 0 && (
                    <div className="mb-8">
                      <h3 className="font-bold text-slate-900 mb-6 text-xl">Set Your Rates for Each Service</h3>
                      <div className="space-y-6">
                        {Array.from(selectedServices).map(serviceId => {
                          const service = services.find(s => s.id === serviceId);
                          const pricing = servicePricing[serviceId] || { minRate: '', hourlyRate: '' };
                          if (!service) return null;
                          
                          return (
                            <div key={serviceId} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">{service.icon}</span>
                                <div>
                                  <h4 className="font-bold text-slate-900 text-lg">{service.name}</h4>
                                  <p className="text-sm text-slate-600">{service.nameUrdu}</p>
                                </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="form-group">
                                  <label className="form-label required">Minimum Service Fee (₨)</label>
                                  <input
                                    type="number"
                                    value={pricing.minRate}
                                    onChange={(e) => handleServicePricingChange(serviceId, 'minRate', e.target.value)}
                                    className={`form-input ${errors[`${serviceId}_minRate`] ? 'error' : pricing.minRate ? 'success' : ''}`}
                                    placeholder="500"
                                    min="100"
                                    required
                                  />
                                  {errors[`${serviceId}_minRate`] && (
                                    <div className="form-error">{errors[`${serviceId}_minRate`]}</div>
                                  )}
                                  <div className="form-hint">Minimum charge per {service.name.toLowerCase()} job</div>
                                </div>

                                <div className="form-group">
                                  <label className="form-label required">Hourly Rate (₨)</label>
                                  <input
                                    type="number"
                                    value={pricing.hourlyRate}
                                    onChange={(e) => handleServicePricingChange(serviceId, 'hourlyRate', e.target.value)}
                                    className={`form-input ${errors[`${serviceId}_hourlyRate`] ? 'error' : pricing.hourlyRate ? 'success' : ''}`}
                                    placeholder="800"
                                    min="200"
                                    required
                                  />
                                  {errors[`${serviceId}_hourlyRate`] && (
                                    <div className="form-error">{errors[`${serviceId}_hourlyRate`]}</div>
                                  )}
                                  <div className="form-hint">For hourly-based {service.name.toLowerCase()} work</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Each service can have different pricing based on complexity, materials, and your expertise. Set competitive rates to attract more customers.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="btn btn-ghost flex-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg> Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn btn-primary flex-1">
                      Continue to Documents
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Upload Documents</h2>
                  <p className="text-slate-600 mb-8">Required for verification and background check</p>

                  <div className="space-y-4 mb-8">
                    <div
                      className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => document.getElementById('cnic-front').click()}
                    >
                      <input
                        type="file"
                        id="cnic-front"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'cnicFront')}
                        required
                      />
                      <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="font-semibold text-slate-900">CNIC Front Side</p>
                      <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                    </div>

                    <div
                      className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => document.getElementById('cnic-back').click()}
                    >
                      <input
                        type="file"
                        id="cnic-back"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'cnicBack')}
                        required
                      />
                      <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="font-semibold text-slate-900">CNIC Back Side</p>
                      <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                    </div>

                    <div
                      className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => document.getElementById('certification').click()}
                    >
                      <input
                        type="file"
                        id="certification"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'certification')}
                      />
                      <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="font-semibold text-slate-900">Professional Certification (Optional)</p>
                      <p className="text-sm text-slate-500">Upload any relevant certifications or licenses</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      </svg> Verification Requirements
                    </h3>
                    <div className="space-y-3 text-sm text-slate-700">
                      {['Valid CNIC (front and back)', 'Clear, well-lit photos', 'No expired documents'].map((req, idx) => (
                        <div key={idx} className="flex gap-2">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="btn btn-ghost flex-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg> Back
                    </button>
                    <button type="button" onClick={submitForm} disabled={submitting} className="btn btn-primary flex-1">
                      {submitting ? 'Submitting...' : 'Submit Application'}
                      {!submitting && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {currentStep === 4 && (
                <div className="form-step">
                  <div className="success-state">
                    <div className="success-icon">✓</div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to HomeServe Pro!</h2>
                    <p className="text-slate-600 mb-2">Your application has been submitted successfully</p>
                    <p className="text-sm text-slate-500 mb-8">
                      We'll review your documents within 24-48 hours and notify you via email
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                      <h3 className="font-bold text-slate-900 mb-4">What Happens Next?</h3>
                      <div className="space-y-4 text-sm text-slate-700">
                        {[
                          { title: 'Document Verification', desc: 'We verify your CNIC and documents' },
                          { title: 'Background Check', desc: 'Quick background check for safety' },
                          { title: 'Account Activation', desc: 'Start receiving bookings immediately' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{item.title}</p>
                              <p className="text-slate-500">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
                      Go to Dashboard
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8 stagger-6">
            <p className="text-slate-600">
              Already have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign In</a>
            </p>
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
          toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3`}>
          <span className="text-xl font-bold">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProviderSignup;
