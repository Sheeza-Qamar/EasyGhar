import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('easyghar_user');
      if (s) {
        const p = JSON.parse(s);
        if (p && p.id) return p;
      }
    } catch (_) {}
    return null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => {
      try {
        const s = localStorage.getItem('easyghar_user');
        setUser(s ? (JSON.parse(s)?.id ? JSON.parse(s) : null) : null);
      } catch (_) {
        setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('easyghar_user');
    localStorage.removeItem('easyghar_token');
    setUser(null);
    setMobileMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    // Smooth navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setMobileMenuOpen(false); // Close mobile menu after navigation
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 20) {
        nav?.classList.add('shadow-md');
      } else {
        nav?.classList.remove('shadow-md');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-slide-down hover:opacity-80 transition-opacity cursor-pointer">
          <svg 
            className="logo-svg w-9 h-9 lg:w-10 lg:h-10" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer ring */}
            <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" opacity="0.1" stroke="url(#logoGradient)" strokeWidth="1.5" />
            {/* House outline */}
            <path d="M12 30L24 15L36 30" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* House body */}
            <rect x="15" y="30" width="18" height="12" rx="1.5" fill="none" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Door */}
            <rect x="20" y="33" width="8" height="9" rx="0.5" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="26.5" cy="38" r="1" fill="#06b6d4" />
            {/* Window left */}
            <rect x="15.5" y="33" width="3" height="3" rx="0.4" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
            {/* Window right */}
            <rect x="29.5" y="33" width="3" height="3" rx="0.4" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
            {/* Wrench accent (service) */}
            <g>
              <path d="M34 24C34 22.5 35.2 21.5 36.5 21.5C37.8 21.5 38.5 22.5 38.5 24" stroke="#f59e0b" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="33" y1="25.5" x2="37.5" y2="21" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-bold text-base lg:text-lg text-slate-900 hidden sm:block">
            Easyghar
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <a href="#services" className="nav-link stagger-1">Services</a>
          <a href="#how-it-works" className="nav-link stagger-2">How It Works</a>
          <a href="#why-us" className="nav-link stagger-3">Why Us</a>
          <a href="#testimonials" className="nav-link stagger-4">Reviews</a>
        </div>
        <div className="flex items-center gap-4 lg:gap-5 stagger-5">
          {user ? (
            <>
              {user.role === 'worker' && (
                <Link to="/provider-dashboard" className="btn btn-primary hidden sm:inline-flex">
                  Dashboard
                </Link>
              )}
              <div className="hidden sm:flex flex-col items-center gap-0.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white text-sm font-semibold shrink-0" title={user.full_name}>
                  {(user.full_name?.trim() || 'U')[0].toUpperCase()}
                </span>
                <button type="button" onClick={logout} className="text-xs font-medium text-slate-500 hover:text-slate-800 hover:underline focus:outline-none">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-ghost hidden sm:flex">Sign In</Link>
              <Link to="/get-started" className="btn btn-primary">Get Started</Link>
            </>
          )}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <a href="#services" className="block nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#how-it-works" className="block nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#why-us" className="block nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <a href="#testimonials" className="block nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            <div className="pt-5 border-t border-slate-200 space-y-3">
              {user ? (
                <>
                  {user.role === 'worker' && (
                    <Link to="/provider-dashboard" className="btn btn-primary w-full block text-center" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white text-sm font-semibold shrink-0" title={user.full_name}>
                      {(user.full_name?.trim() || 'U')[0].toUpperCase()}
                    </span>
                    <button type="button" onClick={() => { setMobileMenuOpen(false); logout(); }} className="text-xs font-medium text-slate-500 hover:text-slate-800 hover:underline">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/get-started" className="btn btn-primary w-full mb-2 block text-center">Get Started</Link>
                  <Link to="/signin" className="btn btn-ghost w-full block text-center">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
