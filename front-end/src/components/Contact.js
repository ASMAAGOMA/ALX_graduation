import React from 'react';
import Header from './DashHeader';
import Footer from './DashFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookMessenger, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
              <a href="tel:+201503930493">+201503930493</a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <a href="mailto:asmaagadallaah@gmail.com">asmaagadallaah@gmail.com</a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <a href="https://goo.gl/maps/exampleLink" target="_blank" rel="noopener noreferrer">
                43 Anywhere St. Anycity
              </a>
            </div>
          </div>

          <div className="additional-info">
            <h2>Business Hours</h2>
            <div className="info-item">
              <FontAwesomeIcon icon={faClock} className="info-icon" />
              <div>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="social-media">
            <h2>Connect With Us</h2>
            <p>We're always available on social media! Feel free to reach out to us through any of these platforms:</p>
            <div className="social-links">
              <a href="https://wa.me/201503930493" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
              <a href="https://m.me/yourfacebookpage" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookMessenger} /> Messenger
              </a>
              <a href="https://instagram.com/yourcompany" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
              <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} /> Twitter
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;