import React from 'react';
import Header from './DashHeader';
import Hero from './Hero';
import Features from './features';
import Footer from './DashFooter';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="main-content">
        <Hero />
        <Features />
      </main>
      <br></br>
      <Footer />
    </div>
  );
};

export default LandingPage;