// Features.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  return (
    <section className="features">
      <div className="feature">
        <FontAwesomeIcon icon={faCoffee} />
        <h2>Premium Coffee</h2>
        <p>Enjoy our selection of locally roasted, artisanal coffee blends.</p>
      </div>
      <div className="feature">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <h2>Cozy Atmosphere</h2>
        <p>Relax in our warm, inviting space designed for comfort.</p>
      </div>
      <div className="feature">
        <FontAwesomeIcon icon={faEnvelope} />
        <h2>Weekly Specials</h2>
        <p>Subscribe to our newsletter for exclusive offers and events.</p>
      </div>
    </section>
  );
};

export default Features;