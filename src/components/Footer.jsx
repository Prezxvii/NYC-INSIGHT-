// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Boroughs', href: '/borough/manhattan' }, // Default example
  { label: 'Categories', href: '/breaking-news' },
  { label: 'Live Feed', href: '/feed' },
  { label: 'Dashboard', href: '/dashboard' },
];

const SOCIAL_LINKS = [
  { 
    name: 'Twitter', 
    href: 'https://twitter.com', 
    iconUrl: 'https://cdn.brandfetch.io/idS5WhqBbM/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B'
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com', 
    iconUrl: 'https://cdn.brandfetch.io/ido5G85nya/theme/light/id8qc6z_TX.svg?c=1dxbfHSJFAPEGdCLU4o5B' 
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com', 
    iconUrl: 'https://cdn.brandfetch.io/idVfYwcuQz/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B' 
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerContent page-container">
        {/* Branding & Copyright */}
        <div className="footer-branding">
          <div className="footer-logo">
            <a href="/">
              <span className="footer-logo-icon" aria-hidden="true"></span>
              NYC <strong>Insight</strong>
            </a>
          </div>
          <p className="footer-copyright">
            &copy; {currentYear} NYC Insight.<br/>
            All rights reserved. Data sourced from public feeds.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-nav">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4 className="footer-heading">Connect</h4>
          <div className="social-icons">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`social-icon ${social.name.toLowerCase()}`}
                title={social.name}
                aria-label={social.name}
              >
                <img 
                  src={social.iconUrl} 
                  alt={social.name} 
                  className="social-icon-img" 
                  style={{ width: 24, height: 24 }} 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



