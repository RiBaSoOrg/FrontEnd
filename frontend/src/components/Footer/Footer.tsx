import React from 'react';
import './Footer.css'; // Import the CSS file for the footer
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <Link to="/about" className="nav-button">About</Link>
        </div>
        <div className="footer-section">
          <Link to="https://datenschutz.htw-berlin.de/" className="nav-button">Legal Notice</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
