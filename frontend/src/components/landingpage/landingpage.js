import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './landingpage.css';

const LandingPage = () => {
  useEffect(() => {
    // Scroll Trigger Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-trigger').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Navigation */}
      <Navbar />

      {/* Spacer so hero content starts below fixed navbar (navbar ~56–64px) */}
      <div className="h-[70px] shrink-0" aria-hidden="true" />

      {/* Hero Section */}
      <section className="hero-container gradient-mesh pt-12 lg:pt-16 pb-16 md:pb-24">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 hero-bg-element"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-cyan-400 hero-bg-element"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-300 hero-bg-element"></div>
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center min-h-0 py-8 lg:py-12">
            {/* Left Content */}
            <div>
              <div className="mb-6 stagger-1">
                <span className="badge badge-blue">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg> Trusted by 50,000+ households
                </span>
              </div>
              <h1 id="hero-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6 stagger-2">
                Professional Home Services at Your <span className="gradient-text">Doorstep</span>
              </h1>
              <p id="hero-subtitle" className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed stagger-3 max-w-xl">
                Connect with verified, background-checked professionals. Transparent pricing, real-time tracking, and guaranteed satisfaction for all your household needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 stagger-4">
                <Link to="/get-started" className="btn btn-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg> Book Service Now
                </Link>
                <a href="#how-it-works" className="btn btn-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> Watch Demo
                </a>
              </div>
              {/* Trust Badges */}
              <div className="mt-10 lg:mt-12 flex items-center gap-6 stagger-5">
                <div className="flex -space-x-2">
                  <div className="avatar text-xs" style={{ zIndex: 4 }}>
                    A
                  </div>
                  <div className="avatar text-xs" style={{ zIndex: 3, background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>
                    R
                  </div>
                  <div className="avatar text-xs" style={{ zIndex: 2, background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}>
                    S
                  </div>
                  <div className="avatar text-xs" style={{ zIndex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                    K
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="stars text-sm">★ ★ ★ ★ ★</span>
                    <span className="font-semibold text-slate-900 text-sm">4.9</span>
                  </div>
                  <p className="text-xs text-slate-600">from 12,000+ reviews</p>
                </div>
              </div>
            </div>
            {/* Right Visual */}
            <div className="relative hidden lg:block lg:flex lg:justify-end">
              <div className="relative w-full max-w-md xl:max-w-lg">
                {/* Animated Card */}
                <div className="glass p-6 lg:p-8 rounded-xl shadow-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="space-y-4">
                    {/* Card 1 */}
                    <div className="glass-dark p-3 rounded-lg stagger-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-gradient-accent flex items-center justify-center text-white text-sm">
                            🔧
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">Plumber Assigned</p>
                            <p className="text-xs text-slate-400">45 mins away</p>
                          </div>
                        </div>
                        <span className="badge" style={{ background: '#dcfce7', color: '#15803d' }}>En Route</span>
                      </div>
                    </div>
                    {/* Card 2 */}
                    <div className="glass-dark p-3 rounded-lg stagger-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center text-white text-sm">
                            ⚡
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">Electrician Scheduled</p>
                            <p className="text-xs text-slate-400">Tomorrow 10:00 AM</p>
                          </div>
                        </div>
                        <span className="badge badge-blue">Confirmed</span>
                      </div>
                    </div>
                    {/* Card 3 */}
                    <div className="glass-dark p-3 rounded-lg stagger-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-emerald-400 flex items-center justify-center text-white text-sm">
                            ✨
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">Cleaning Complete</p>
                            <p className="text-xs text-slate-400">Rate your experience</p>
                          </div>
                        </div>
                        <div className="stars">
                          ★ ★ ★ ★ ★
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10 scroll-trigger">
            <span className="badge badge-blue mb-3 inline-block">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg> Our Services
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Expert Solutions for <span className="gradient-text">Every Need</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-snug">
              From emergency repairs to preventive maintenance, our verified professionals handle it all
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 scroll-trigger">
            {/* Service Cards */}
            <div className="card group scroll-trigger stagger-1">
              <div className="p-5 lg:p-6">
                <div className="service-icon mb-3 bg-blue-100">🔧</div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Plumbing</h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">Leaks, installations, and repairs</p>
                <p className="text-lg font-bold gradient-text">From ₨500</p>
              </div>
            </div>
            <div className="card group scroll-trigger stagger-2">
              <div className="p-5 lg:p-6">
                <div className="service-icon mb-3 bg-yellow-100">⚡</div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Electrical</h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">Wiring, faults, and installations</p>
                <p className="text-lg font-bold gradient-text">From ₨400</p>
              </div>
            </div>
            <div className="card group scroll-trigger stagger-3">
              <div className="p-5 lg:p-6">
                <div className="service-icon mb-3 bg-emerald-100">✨</div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Cleaning</h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">Deep clean and maintenance</p>
                <p className="text-lg font-bold gradient-text">From ₨800</p>
              </div>
            </div>
            <div className="card group scroll-trigger stagger-4">
              <div className="p-5 lg:p-6">
                <div className="service-icon mb-3 bg-cyan-100">❄️</div>
                <h3 className="font-bold text-base text-slate-900 mb-2">AC Service</h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">Maintenance and repairs</p>
                <p className="text-lg font-bold gradient-text">From ₨600</p>
              </div>
            </div>
            <div className="card group scroll-trigger stagger-5">
              <div className="p-5 lg:p-6">
                <div className="service-icon mb-3 bg-red-100">🎨</div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Painting</h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">Interior and exterior work</p>
                <p className="text-lg font-bold gradient-text">From ₨1500</p>
              </div>
            </div>
            <div className="card group scroll-trigger stagger-6">
              <div className="p-5 lg:p-6">
                <div className="service-icon mb-3 bg-purple-100">🪚</div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Carpentry</h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">Furniture and installations</p>
                <p className="text-lg font-bold gradient-text">From ₨700</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10 scroll-trigger">
            <span className="badge badge-blue mb-3 inline-block">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg> Simple Process
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Booking Made <span className="gradient-text">Effortless</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 scroll-trigger">
            {/* Step 1 */}
            <div className="text-center scroll-trigger stagger-1">
              <div className="step-number mb-5 mx-auto shadow-lg shadow-blue-300">1</div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Select Service</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Choose from our wide range of professional services tailored to your needs</p>
            </div>
            {/* Step 2 */}
            <div className="text-center scroll-trigger stagger-2">
              <div className="step-number mb-5 mx-auto shadow-lg shadow-blue-300">2</div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Browse Professionals</h3>
              <p className="text-slate-600 text-xs leading-relaxed">View verified experts with ratings, reviews, and transparent pricing</p>
            </div>
            {/* Step 3 */}
            <div className="text-center scroll-trigger stagger-3">
              <div className="step-number mb-5 mx-auto shadow-lg shadow-blue-300">3</div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Confirm Booking</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Schedule your appointment and pay securely through multiple payment options</p>
            </div>
            {/* Step 4 */}
            <div className="text-center scroll-trigger stagger-4">
              <div className="step-number mb-5 mx-auto shadow-lg shadow-blue-300">4</div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Service Delivered</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Relax while experts handle the work. Rate and pay upon completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-12 md:py-16 lg:py-20 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-10 scroll-trigger">
            <span className="badge mb-3 inline-block" style={{ background: 'rgba(255,255,255,0.1)', color: '#0ea5e9' }}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.756a3.066 3.066 0 01-3.062 3.062H7.041a3.066 3.066 0 01-3.062-3.062V6.517a3.066 3.066 0 012.812-3.062zm2.945 2.467a.75.75 0 00-1.06 0L5.5 9.72v2.576l4.338-4.338a.75.75 0 111.06 1.061L6.56 13.357H9.1l6.572-6.571a.75.75 0 10-1.061-1.06L8.212 5.922z" clipRule="evenodd" />
              </svg> Why Choose Us
            </span>
            <h2 id="features-title" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Built for <span className="text-cyan-400">Trust</span> & Excellence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 scroll-trigger">
            {/* Feature 1 */}
            <div className="card-dark p-5 lg:p-6 rounded-xl scroll-trigger stagger-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-lg mb-3 shadow-lg shadow-blue-500/30">✓</div>
              <h3 className="font-bold text-base text-white mb-2">Verified Professionals</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Background checked, CNIC verified, and skill-tested professionals you can trust</p>
            </div>
            {/* Feature 2 */}
            <div className="card-dark p-5 lg:p-6 rounded-xl scroll-trigger stagger-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-lg mb-3 shadow-lg shadow-blue-500/30">📍</div>
              <h3 className="font-bold text-base text-white mb-2">Smart Matching</h3>
              <p className="text-slate-300 text-xs leading-relaxed">AI-powered location matching finds nearest available experts instantly</p>
            </div>
            {/* Feature 3 */}
            <div className="card-dark p-5 lg:p-6 rounded-xl scroll-trigger stagger-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-lg mb-3 shadow-lg shadow-blue-500/30">💳</div>
              <h3 className="font-bold text-base text-white mb-2">Secure Payments</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Multiple payment options: Easypaisa, JazzCash, cards, and cash on delivery</p>
            </div>
            {/* Feature 4 */}
            <div className="card-dark p-5 lg:p-6 rounded-xl scroll-trigger stagger-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-lg mb-3 shadow-lg shadow-blue-500/30">⭐</div>
              <h3 className="font-bold text-base text-white mb-2">Transparent Ratings</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Real reviews and ratings help you choose the best professionals every time</p>
            </div>
            {/* Feature 5 */}
            <div className="card-dark p-5 lg:p-6 rounded-xl scroll-trigger stagger-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-lg mb-3 shadow-lg shadow-blue-500/30">📅</div>
              <h3 className="font-bold text-base text-white mb-2">Flexible Scheduling</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Book at your convenience. Reschedule or cancel anytime, hassle-free</p>
            </div>
            {/* Feature 6 */}
            <div className="card-dark p-5 lg:p-6 rounded-xl scroll-trigger stagger-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-lg mb-3 shadow-lg shadow-blue-500/30">🎧</div>
              <h3 className="font-bold text-base text-white mb-2">24/7 Support</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Dedicated customer support team always ready to assist you anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-14 gradient-accent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white scroll-trigger">
            <div className="stat-item scroll-trigger stagger-1">
              <div className="stat-number">50,000+</div>
              <p className="stat-label text-sm">Happy Customers</p>
            </div>
            <div className="stat-item scroll-trigger stagger-2">
              <div className="stat-number">2,500+</div>
              <p className="stat-label text-sm">Verified Workers</p>
            </div>
            <div className="stat-item scroll-trigger stagger-3">
              <div className="stat-number">1,20,000+</div>
              <p className="stat-label text-sm">Jobs Completed</p>
            </div>
            <div className="stat-item scroll-trigger stagger-4">
              <div className="stat-number">4.9 ★</div>
              <p className="stat-label text-sm">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10 scroll-trigger">
            <span className="badge badge-blue mb-3 inline-block">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg> Customer Reviews
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-trigger">
            {/* Testimonial 1 */}
            <div className="testimonial scroll-trigger stagger-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="stars text-sm">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-slate-700 mb-4 leading-snug text-sm">
                "Excellent service! The plumber arrived on time and fixed the issue perfectly. Great value for money!"
              </p>
              <div className="flex items-center gap-2">
                <div className="avatar text-sm" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' }}>A</div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Ahmed Hassan</p>
                  <p className="text-xs text-slate-500">Karachi</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="testimonial scroll-trigger stagger-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="stars text-sm">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-slate-700 mb-4 leading-snug text-sm">
                "Very professional electrician. He explained everything and provided warranty. Highly recommended!"
              </p>
              <div className="flex items-center gap-2">
                <div className="avatar text-sm" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>F</div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Fatima Khan</p>
                  <p className="text-xs text-slate-500">Lahore</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="testimonial scroll-trigger stagger-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="stars text-sm">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-slate-700 mb-4 leading-snug text-sm">
                "Amazing AC repair service. Very reliable and they followed up to ensure everything was working."
              </p>
              <div className="flex items-center gap-2">
                <div className="avatar text-sm" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}>S</div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Sana Malik</p>
                  <p className="text-xs text-slate-500">Islamabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 scroll-trigger">
            Ready to Experience <span className="gradient-text">Professional</span> Home Services?
          </h2>
          <p className="text-sm text-slate-300 mb-8 scroll-trigger leading-snug">
            Join thousands of satisfied customers who trust Easyghar for their home maintenance needs. Book your first service today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center scroll-trigger">
            <Link to="/get-started" className="btn btn-primary text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg> Book Your Service
            </Link>
            <Link to="/get-started" className="btn btn-secondary text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg> Join as Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-primary text-white py-10 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center font-bold text-sm">EG</div>
                <span className="font-bold text-base">Easyghar</span>
              </div>
              <p className="text-slate-400 mb-5 leading-snug text-sm">
                Your trusted partner for all professional home services. Quality, reliability, and excellence guaranteed.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gradient-accent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gradient-accent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gradient-accent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Services */}
            <div>
              <h4 className="font-bold text-sm text-white mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Plumbing Services</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Electrical Work</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Cleaning Services</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">AC Maintenance</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Painting & Carpentry</a></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-bold text-sm text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Blog & Resources</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Press & Media</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Partnerships</a></li>
              </ul>
            </div>
            {/* Support */}
            <div>
              <h4 className="font-bold text-sm text-white mb-4">Support & Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Safety Guidelines</a></li>
                <li><Link to="/terms-of-service" className="hover:text-cyan-400 transition-colors text-sm">Terms of Service</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors text-sm">Privacy Policy</Link></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Contact Support</a></li>
              </ul>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2024 Easyghar. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm font-medium">Payment Partners:</span>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-white/10 rounded text-xs text-slate-300 font-medium">Easypaisa</span>
                <span className="px-3 py-1 bg-white/10 rounded text-xs text-slate-300 font-medium">JazzCash</span>
                <span className="px-3 py-1 bg-white/10 rounded text-xs text-slate-300 font-medium">Visa/Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
