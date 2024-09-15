import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { selectIsLoggedIn } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApiSlice';

const Footer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <p>
            <a href="https://wa.me/201503930493" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPhone} /> +201503930493
            </a>
          </p>
          <p>
            <a href="mailto:asmaagadallaah@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} /> asmaagadallaah@gmail.com
            </a>
          </p>
          <p>
            <a href="https://goo.gl/maps/exampleLink" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> 43 Anywhere St. Anycity
            </a>
          </p>
        </div>
        <div className="footer-right">
          <p className="copyright">&copy; 2024 Cozy Corner Café. All rights reserved.</p>
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;