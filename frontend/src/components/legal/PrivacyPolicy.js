import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none legal-content">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                HomeServe Pro ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2.1 Information You Provide</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                <li><strong>Profile Information:</strong> Profile picture, bio, location, service preferences</li>
                <li><strong>Service Provider Information:</strong> CNIC number, certifications, work experience, service areas, rates</li>
                <li><strong>Booking Information:</strong> Service requests, addresses, scheduling preferences</li>
                <li><strong>Payment Information:</strong> Payment method details (processed securely through third-party providers)</li>
                <li><strong>Communications:</strong> Messages, reviews, ratings, and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We automatically collect certain information when you use our platform:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Location data (with your permission)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and facilitate service bookings</li>
                <li>Verify service provider credentials and conduct background checks</li>
                <li>Process payments and send transaction receipts</li>
                <li>Communicate with you about bookings, services, and platform updates</li>
                <li>Send promotional offers and marketing communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Detect and prevent fraud, abuse, and security issues</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">4.1 Service Providers</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We share necessary information between customers and service providers to facilitate bookings and service delivery. This includes contact information, service requirements, and location details.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">4.2 Third-Party Service Providers</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may share information with third-party service providers who perform services on our behalf:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Payment processors (Easypaisa, JazzCash, card processors)</li>
                <li>Background check and verification services</li>
                <li>Cloud hosting and data storage providers</li>
                <li>Analytics and marketing service providers</li>
                <li>Customer support platforms</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">4.3 Legal Requirements</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may disclose your information if required by law or in response to valid requests by public authorities (e.g., court orders, government agencies).
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">4.4 Business Transfers</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure payment processing through certified providers</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and personal information</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Location Services:</strong> Control location data sharing through device settings</li>
                <li><strong>Cookies:</strong> Manage cookie preferences through browser settings</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-4">
                To exercise these rights, please contact us at privacy@homeservepro.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Authenticate your account</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve security and prevent fraud</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-4">
                You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Retention</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Provide our services and maintain your account</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records for legitimate purposes</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-4">
                When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. International Data Transfers</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Posting the updated policy on our platform</li>
                <li>Sending an email notification to registered users</li>
                <li>Displaying a prominent notice on our platform</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-4">
                Your continued use of our services after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl">
                <p className="text-slate-700 mb-2"><strong>Email:</strong> privacy@homeservepro.com</p>
                <p className="text-slate-700 mb-2"><strong>Phone:</strong> +92 300 1234567</p>
                <p className="text-slate-700 mb-2"><strong>Data Protection Officer:</strong> dpo@homeservepro.com</p>
                <p className="text-slate-700"><strong>Address:</strong> Karachi, Pakistan</p>
              </div>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/terms-of-service" className="text-blue-600 hover:underline">
              Terms of Service
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

export default PrivacyPolicy;
