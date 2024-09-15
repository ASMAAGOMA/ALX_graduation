import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHeart, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { selectIsLoggedIn, selectCurrentUser } from '../features/auth/authSlice';
import UserInfo from './UserInfo';

const DashHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const adminEmails = ['asmaagadallaah@gmail.com', 'asmaaGad@gmail.com']

  return (
    <header className="header">
      <Link to="/" className="logo">
        <FontAwesomeIcon icon={faCoffee} />
        <span>Cozy Corner Café</span>
      </Link>
      <nav>
        <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'active' : ''}`}>Menu</Link>
        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
        {isLoggedIn && (
          <Link to="/favorites" className={`favorites-link ${isActive('/favorites') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faHeart} style={{ color: isActive('/favorites') ? 'red' : 'currentColor' }} />
            <span className="sr-only">Favorites</span>
          </Link>
        )}
        {isLoggedIn && currentUser?.role === 'admin' && (
          <Link to="/admin" className={`admin-link ${isActive('/admin') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faUserCog} />
            <span className="sr-only">Admin Dashboard</span>
          </Link>
        )}
        {isLoggedIn && adminEmails.includes(currentUser?.email) && (
          <Link to="/admin" className="dashboard-link">
            Dashboard
            </Link>
        )}
        {isLoggedIn ? (
          <>
            {currentUser && <UserInfo username={currentUser.name} />}
          </>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default DashHeader;