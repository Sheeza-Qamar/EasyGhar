import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import './customer-services.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CustomerServices = () => {
  const [view, setView] = useState('browse'); // 'browse' | 'worker'
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [search, setSearch] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    setLoading(true);
    setLoadError('');
    fetch(`${API_BASE}/api/browse/services`)
      .then((res) => res.json())
      .then((data) => {
        if (data.services && Array.isArray(data.services)) {
          setServicesData(data.services);
        } else {
          setServicesData([]);
          setLoadError(data.message || 'Failed to load services.');
        }
      })
      .catch(() => {
        setServicesData([]);
        setLoadError('Network error. Please try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  const serviceTypes = useMemo(() => {
    const types = [...new Set(servicesData.map((s) => s.type).filter(Boolean))].sort();
    return types;
  }, [servicesData]);

  const filteredServices = useMemo(() => {
    let list = servicesData.filter((s) => {
      const matchSearch = !search.trim() ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.provider.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase());
      const matchType = !serviceTypeFilter || s.type === serviceTypeFilter;
      return matchSearch && matchType;
    });
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'reviews') list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [servicesData, search, serviceTypeFilter, sortBy]);

  const selectedWorker = useMemo(() => {
    if (!selectedWorkerId) return null;
    return servicesData.find((s) => s.workerId === selectedWorkerId) || null;
  }, [selectedWorkerId, servicesData]);

  const workerServices = useMemo(() => {
    if (!selectedWorkerId) return [];
    return servicesData.filter((s) => s.workerId === selectedWorkerId);
  }, [selectedWorkerId, servicesData]);

  const resetFilters = () => {
    setSearch('');
    setServiceTypeFilter('');
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
            <div className="cs-top-filters">
              <div className="cs-filter-dropdown-wrap">
                <label className="cs-filter-label">Service type</label>
                <select
                  className="cs-filter-select"
                  value={serviceTypeFilter}
                  onChange={(e) => setServiceTypeFilter(e.target.value)}
                >
                  <option value="">All services</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="cs-filter-dropdown-wrap">
                <label className="cs-filter-label">Sort by</label>
                <select className="cs-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevant">Most Relevant</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
              <div className="cs-filter-search-wrap">
                <label className="cs-filter-label">Search</label>
                <input
                  type="text"
                  className="cs-filter-search-input"
                  placeholder="Service or worker name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="cs-filter-actions">
                <span className="cs-result-count">Showing {filteredServices.length} services</span>
                <button type="button" className="cs-reset-btn" onClick={resetFilters}>Reset</button>
              </div>
            </div>

            <div className="cs-services-grid">
                {loading ? (
                  <div className="cs-no-results">
                    <div className="cs-no-results-icon">⏳</div>
                    <h3 className="cs-no-results-title">Loading services...</h3>
                    <p className="cs-no-results-text">Please wait</p>
                  </div>
                ) : loadError ? (
                  <div className="cs-no-results">
                    <div className="cs-no-results-icon">⚠️</div>
                    <h3 className="cs-no-results-title">Could not load services</h3>
                    <p className="cs-no-results-text">{loadError}</p>
                  </div>
                ) : filteredServices.length === 0 ? (
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
