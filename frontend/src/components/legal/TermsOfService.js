import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './legal.css';

const TermsOfService = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none legal-content">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">1. Acceptance of Terms</h2>
              <p className="text-slate-700 leading-relaxed mb-5">
                By accessing and using HomeServe Pro ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                HomeServe Pro is a platform that connects customers seeking home services with verified service providers. We facilitate the connection between customers and service providers but are not a party to any service agreement between them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">3.1 Customer Accounts</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Customers must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">3.2 Service Provider Accounts</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Service providers must undergo a verification process including background checks and document verification. Providers must maintain accurate profile information, certifications, and service availability. We reserve the right to suspend or terminate accounts that violate our terms or fail to meet quality standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Service Bookings</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                When you book a service through HomeServe Pro:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>You enter into a direct contract with the service provider, not with HomeServe Pro</li>
                <li>Service providers set their own rates and terms</li>
                <li>Payment is processed securely through our platform</li>
                <li>Cancellation policies vary by service provider</li>
                <li>Refunds are subject to the service provider's policy and our dispute resolution process</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Payments</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We accept multiple payment methods including Easypaisa, JazzCash, credit/debit cards, and cash on delivery. All payments are processed securely. Service providers receive payment after service completion and customer confirmation, minus our platform fee.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Service Provider Responsibilities</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Service providers agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Provide accurate information about qualifications, experience, and certifications</li>
                <li>Arrive on time for scheduled appointments</li>
                <li>Perform services with professional standards and quality</li>
                <li>Maintain proper insurance and licenses where required</li>
                <li>Respect customer property and privacy</li>
                <li>Respond promptly to customer inquiries and booking requests</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Customer Responsibilities</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Customers agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Provide accurate information about service requirements</li>
                <li>Be present or available during scheduled service times</li>
                <li>Provide safe access to the service location</li>
                <li>Pay for services as agreed</li>
                <li>Treat service providers with respect</li>
                <li>Provide honest reviews and ratings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Ratings and Reviews</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Users may submit ratings and reviews about service providers. Reviews must be honest, accurate, and not contain defamatory, offensive, or inappropriate content. We reserve the right to remove reviews that violate our guidelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Dispute Resolution</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                In case of disputes between customers and service providers:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Contact our customer support team within 48 hours of service completion</li>
                <li>We will investigate and attempt to resolve disputes fairly</li>
                <li>Our decision in dispute resolution is final</li>
                <li>Refunds may be issued at our discretion based on investigation results</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                HomeServe Pro acts as an intermediary platform. We are not responsible for:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>The quality, safety, or legality of services provided</li>
                <li>The accuracy of service provider information</li>
                <li>Disputes between customers and service providers</li>
                <li>Any damages or losses resulting from services provided</li>
                <li>Service provider availability or cancellation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Prohibited Activities</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Users are prohibited from:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Circumventing our platform to avoid fees</li>
                <li>Providing false or misleading information</li>
                <li>Harassing, threatening, or abusing other users</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using the platform for any illegal purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Account Termination</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or fail to meet our quality standards. Users may terminate their accounts at any time by contacting customer support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may modify these terms at any time. Material changes will be notified via email or platform notification. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl">
                <p className="text-slate-700 mb-2"><strong>Email:</strong> legal@homeservepro.com</p>
                <p className="text-slate-700 mb-2"><strong>Phone:</strong> +92 300 1234567</p>
                <p className="text-slate-700"><strong>Address:</strong> Karachi, Pakistan</p>
              </div>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
