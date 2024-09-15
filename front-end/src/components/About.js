import React from 'react';
import Header from './DashHeader';
import Footer from './DashFooter';

const AboutPage = () => {
  return (
    <div className="page about-page">
      <Header />
      
      <main className="main-content">
        <section className="about-content">
          <h1>About Cozy Corner Café</h1>
          <p>Welcome to Cozy Corner Café, your home away from home for great coffee and warm hospitality.</p>
          <p>Founded in 2010, we've been serving our community with passion and dedication for over a decade. Our mission is simple: to provide a cozy, welcoming space where people can enjoy quality coffee, delicious treats, and good company.</p>
          <p>At Cozy Corner Café, we believe in:</p>
          <ul>
            <li>Sourcing the finest, ethically produced coffee beans</li>
            <li>Creating a warm, inviting atmosphere for our guests</li>
            <li>Supporting our local community through various initiatives</li>
            <li>Continuously improving our craft and service</li>
          </ul>
          <p>Whether you're looking for a quiet spot to work, a place to catch up with friends, or just a great cup of coffee, we're here to serve you.</p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;