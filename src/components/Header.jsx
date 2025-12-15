// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Header.css'; 
import CTAButton from './CTAButton';
import DropdownMenu from './DropdownMenu';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { 
    label: 'Boroughs', 
    isDropdown: true, 
    options: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'] 
  },
  { 
    label: 'Categories', 
    isDropdown: true, 
    options: ['Videos', 'Breaking News', 'Events'] 
  },
  { label: 'Live Feed', href: '/feed' },
  { label: 'Dashboard', href: '/dashboard' },
];

const headerVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 70, 
      damping: 15,
      delay: 0.1 
    } 
  },
};

const Header = () => {
  const navigate = useNavigate();

  const handleDropdownSelect = (option, label) => {
    if (label === 'Boroughs') {
      // Navigate to borough page
      const boroughPath = option.toLowerCase().replace(/\s+/g, '-');
      navigate(`/borough/${boroughPath}`);
    } else if (label === 'Categories') {
      if (option === 'Breaking News') {
        navigate('/breaking-news');
      } else if (option === 'Events') {
        navigate('/events');
      } else if (option === 'Videos') {
        navigate('/feed?filter=Video');
      }
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <motion.header 
      className="header" 
      variants={headerVariants} 
      initial="initial" 
      animate="animate"
    >
      <div className="headerContent page-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <span className="header-logo-icon" aria-hidden="true"></span>
            NYC <strong>Insight</strong>
          </a>
        </div>

        {/* Main Navigation */}
        <nav className="navCenter">
          {NAV_LINKS.map((link) => (
            <React.Fragment key={link.label}>
              {link.isDropdown ? (
                <DropdownMenu
                  label={link.label}
                  options={link.options}
                  onSelect={(option) => handleDropdownSelect(option, link.label)}
                />
              ) : (
                <a href={link.href} className="navLink">
                  {link.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="authButtons">
          <CTAButton 
            label="Login" 
            variant="outline" 
            onClick={handleLogin}
          />
          <CTAButton 
            label="Sign Up" 
            variant="primary" 
            onClick={handleSignUp}
          />
        </div>

        {/* Mobile Menu */}
        <div className="mobileMenu">☰</div>
      </div>
    </motion.header>
  );
};

export default Header;
