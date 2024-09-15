import React from 'react';
import Header from './DashHeader';
import Footer from './DashFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faQuestion } from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  return (
    <div className="page contact-page">
      <Header />
      
      <main className="main-content">
        <h1>Contact Us</h1>
        <section className="contact-content">
          <p>We're here to help! Find all the ways you can reach us below.</p>
          
          <div className="contact-details">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <a href="https://wa.me/201503930493" target="_blank" rel="noopener noreferrer">
                +201503930493
              </a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <a href="mailto:asmaagadallaah@gmail.com">
                asmaagadallaah@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <a href="https://goo.gl/maps/exampleLink" target="_blank" rel="noopener noreferrer">
                43 Anywhere St. Anycity
              </a>
            </div>
          </div>

          <div className="additional-info">
            <h2>Additional Information</h2>
            <div className="info-item">
              <FontAwesomeIcon icon={faClock} className="info-icon" />
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faQuestion} className="info-icon" />
              <div>
                <h3>FAQs</h3>
                <p>Check out our <a href="/faq">Frequently Asked Questions</a> page for quick answers to common inquiries.</p>
              </div>
            </div>
          </div>

          <div className="social-media">
            <h2>Connect With Us</h2>
            <p>Stay updated with our latest news and offers by following us on social media:</p>
            <div className="social-links">
              <a href="https://facebook.com/ourcompany" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com/ourcompany" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com/ourcompany" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com/company/ourcompany" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;