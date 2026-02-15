import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './customer-services.css';

// Static data for now – same structure as reference; will be replaced with real API later
const SERVICES_DATA = [
  { id: 1, name: 'Drain Cleaning & Repair', type: 'Plumbing', workerId: 1, provider: 'Ali Hassan', initials: 'AH', location: 'Lahore', price: 3500, rating: 4.9, reviews: 124, experience: '8 years', jobs: 234, icon: '🔧', bio: 'Expert in residential plumbing with 8+ years of experience. Specialized in drain cleaning, leak repairs, and pipe installation.', service: 'Plumbing Specialist' },
  { id: 2, name: 'Electrical Wiring', type: 'Electrical', workerId: 2, provider: 'Usman Khan', initials: 'UK', location: 'Karachi', price: 2500, rating: 4.8, reviews: 89, experience: '15 years', jobs: 567, icon: '⚡', bio: 'Licensed electrician with 15 years in residential and commercial electrical work.', service: 'Electrical Expert' },
  { id: 3, name: 'AC Installation', type: 'HVAC', workerId: 3, provider: 'Sara Ahmed', initials: 'SA', location: 'Islamabad', price: 4500, rating: 5.0, reviews: 212, experience: '12 years', jobs: 392, icon: '❄️', bio: 'HVAC specialist with 12 years of experience. Expert in AC installation, repair, and maintenance.', service: 'AC Specialist' },
  { id: 4, name: 'Water Heater Installation', type: 'Plumbing', workerId: 1, provider: 'Ali Hassan', initials: 'AH', location: 'Lahore', price: 5500, rating: 4.9, reviews: 124, experience: '8 years', jobs: 234, icon: '💧', bio: 'Expert in residential plumbing with 8+ years of experience.', service: 'Plumbing Specialist' },
  { id: 5, name: 'Interior Painting', type: 'Painting', workerId: 4, provider: 'Fatima Noor', initials: 'FN', location: 'Lahore', price: 2000, rating: 4.9, reviews: 228, experience: '9 years', jobs: 412, icon: '🎨', bio: 'Professional painter specializing in interior and exterior painting.', service: 'Painting Expert' },
  { id: 6, name: 'Pipe Replacement', type: 'Plumbing', workerId: 1, provider: 'Ali Hassan', initials: 'AH', location: 'Lahore', price: 2800, rating: 4.9, reviews: 124, experience: '8 years', jobs: 234, icon: '🔧', bio: 'Expert in residential plumbing with 8+ years of experience.', service: 'Plumbing Specialist' },
  { id: 7, name: 'Circuit Breaker Repair', type: 'Electrical', workerId: 2, provider: 'Usman Khan', initials: 'UK', location: 'Karachi', price: 1800, rating: 4.8, reviews: 89, experience: '15 years', jobs: 567, icon: '⚡', bio: 'Licensed electrician with 15 years in residential and commercial work.', service: 'Electrical Expert' },
  { id: 8, name: 'Furnace Maintenance', type: 'HVAC', workerId: 5, provider: 'Imran Sheikh', initials: 'IS', location: 'Rawalpindi', price: 2200, rating: 4.7, reviews: 98, experience: '7 years', jobs: 189, icon: '❄️', bio: 'HVAC technician providing furnace maintenance and repair services.', service: 'HVAC Technician' },
  { id: 9, name: 'Cabinet Installation', type: 'Carpentry', workerId: 6, provider: 'Zainab Malik', initials: 'ZM', location: 'Faisalabad', price: 4200, rating: 4.8, reviews: 176, experience: '14 years', jobs: 451, icon: '🪑', bio: 'Expert carpenter in kitchen and bathroom cabinet installation.', service: 'Carpentry Expert' },
  { id: 10, name: 'Outlet Installation', type: 'Electrical', workerId: 7, provider: 'Hamza Ali', initials: 'HA', location: 'Lahore', price: 1200, rating: 4.9, reviews: 201, experience: '9 years', jobs: 512, icon: '⚡', bio: 'Electrician specializing in outlet installation and fixture upgrades.', service: 'Electrical Expert' },
  { id: 11, name: 'Exterior Painting', type: 'Painting', workerId: 4, provider: 'Fatima Noor', initials: 'FN', location: 'Lahore', price: 3200, rating: 4.9, reviews: 228, experience: '9 years', jobs: 412, icon: '🎨', bio: 'Professional painter using premium materials.', service: 'Painting Expert' },
  { id: 12, name: 'Tile Installation', type: 'Tiling', workerId: 6, provider: 'Zainab Malik', initials: 'ZM', location: 'Faisalabad', price: 3800, rating: 4.8, reviews: 176, experience: '14 years', jobs: 451, icon: '🧱', bio: 'Skilled in tile and flooring installation.', service: 'Carpentry Expert' },
];

const SERVICE_TYPES = ['Plumbing', 'Electrical', 'HVAC', 'Painting', 'Carpentry', 'Tiling'];

const CustomerServices = () => {
  const [view, setView] = useState('browse'); // 'browse' | 'worker'
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');

  const filteredServices = useMemo(() => {
    let list = SERVICES_DATA.filter((s) => {
      const matchSearch = !search.trim() ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.provider.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(s.type);
      return matchSearch && matchType;
    });
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'reviews') list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [search, selectedTypes, sortBy]);

  const selectedWorker = useMemo(() => {
    if (!selectedWorkerId) return null;
    const first = SERVICES_DATA.find((s) => s.workerId === selectedWorkerId);
    return first || null;
  }, [selectedWorkerId]);

  const workerServices = useMemo(() => {
    if (!selectedWorkerId) return [];
    return SERVICES_DATA.filter((s) => s.workerId === selectedWorkerId);
  }, [selectedWorkerId]);

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedTypes([]);
    setSortBy('relevant');
  };

  const showWorkerProfile = (workerId) => {
    setSelectedWorkerId(workerId);
    setView('worker');
  };

  const showBrowse = () => {
    setView('browse');
    setSelectedWorkerId(null);
  };

  const bookService = (serviceName) => {
    alert(`✓ ${serviceName} – Booking request noted. You will be matched with the professional shortly.`);
  };

  return (
    <div className="cs-page">
      <Navbar />
      <div className="cs-spacer" aria-hidden="true" />

      {view === 'browse' && (
        <div className="cs-browse">
          <div className="cs-container">
            <aside className="cs-sidebar">
              <div className="cs-filter-section">
                <div className="cs-filter-title">🔍 Search</div>
                <input
                  type="text"
                  className="cs-search-input"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="cs-filter-section">
                <div className="cs-filter-title">🔧 Service Type</div>
                {SERVICE_TYPES.map((type) => (
                  <label key={type} className="cs-filter-checkbox">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              <div className="cs-filter-section">
                <button type="button" className="cs-filter-btn" onClick={resetFilters}>Reset All</button>
              </div>
            </aside>

            <div className="cs-content">
              <div className="cs-header-row">
                <div className="cs-header-info">
                  <h1 className="cs-browse-title">Browse Services</h1>
                  <p className="cs-browse-subtitle">Find trusted services from verified professionals</p>
                </div>
                <div className="cs-sort-row">
                  <span className="cs-result-count">Showing {filteredServices.length} services</span>
                  <select className="cs-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="relevant">Most Relevant</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                </div>
              </div>

              <div className="cs-services-grid">
                {filteredServices.length === 0 ? (
                  <div className="cs-no-results">
                    <div className="cs-no-results-icon">🔍</div>
                    <h3 className="cs-no-results-title">No services found</h3>
                    <p className="cs-no-results-text">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  filteredServices.map((service) => (
                    <div key={service.id} className="cs-service-card">
                      <div className="cs-service-image">
                        <span className="cs-service-emoji">{service.icon}</span>
                        <div className="cs-rating-badge">
                          <span className="cs-stars">⭐</span>
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      <div className="cs-service-content">
                        <button type="button" className="cs-provider-header" onClick={() => showWorkerProfile(service.workerId)}>
                          <div className="cs-provider-avatar">{service.initials}</div>
                          <div className="cs-provider-info">
                            <h3 className="cs-provider-name">{service.provider}</h3>
                            <p>📍 {service.location}</p>
                          </div>
                        </button>
                        <span className="cs-service-type">{service.type}</span>
                        <h4 className="cs-service-name">{service.name}</h4>
                        <p className="cs-service-desc">Professional {service.type.toLowerCase()} service with {service.experience} of experience.</p>
                        <div className="cs-service-meta">
                          <span>📊 <strong>{service.jobs}</strong> jobs</span>
                          <span>💬 <strong>{service.reviews}</strong> reviews</span>
                        </div>
                        <div className="cs-price-row">
                          <span className="cs-price">From Rs {service.price.toLocaleString()}</span>
                          <button type="button" className="cs-book-btn" onClick={() => bookService(service.name)}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'worker' && selectedWorker && (
        <div className="cs-worker-page">
          <div className="cs-profile-container">
            <button type="button" className="cs-btn-back" onClick={showBrowse}>← Back to Services</button>

            <div className="cs-profile-header">
              <div className="cs-profile-avatar-large">{selectedWorker.initials}</div>
              <div className="cs-profile-info-main">
                <h2>{selectedWorker.provider}</h2>
                <p>{selectedWorker.service}</p>
                <p>📍 {selectedWorker.location}</p>
                <div className="cs-profile-stats">
                  <div className="cs-stat">
                    <div className="cs-stat-value">{selectedWorker.jobs}</div>
                    <div className="cs-stat-label">Jobs Completed</div>
                  </div>
                  <div className="cs-stat">
                    <div className="cs-stat-value">{selectedWorker.rating}</div>
                    <div className="cs-stat-label">Avg Rating</div>
                  </div>
                  <div className="cs-stat">
                    <div className="cs-stat-value">{selectedWorker.reviews}</div>
                    <div className="cs-stat-label">Reviews</div>
                  </div>
                </div>
                <div className="cs-profile-bio">{selectedWorker.bio}</div>
              </div>
              <div className="cs-profile-actions">
                <button type="button" className="cs-btn cs-btn-primary">📞 Contact</button>
                <button type="button" className="cs-btn cs-btn-secondary">⭐ Reviews</button>
              </div>
            </div>

            <div className="cs-worker-services-section">
              <h3 className="cs-section-title">🔧 Services by This Professional</h3>
              <div className="cs-worker-services-grid">
                {workerServices.map((s) => (
                  <div key={s.id} className="cs-worker-service-card">
                    <div className="cs-service-icon-large">{s.icon}</div>
                    <h4>{s.name}</h4>
                    <p>{s.type} Service</p>
                    <div className="cs-service-price-tag">From Rs {s.price.toLocaleString()}</div>
                    <button type="button" className="cs-book-service-btn" onClick={() => bookService(s.name)}>🔖 Book Service</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerServices;
