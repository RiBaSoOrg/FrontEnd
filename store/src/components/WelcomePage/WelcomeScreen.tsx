import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1>Willkommen beim Bookstore!</h1>
      <p>Wählen Sie eine Kategorie, um fortzufahren:</p>
      <div className="welcome-buttons">
        <Link to="/shortstory-bookstore" className="welcome-button">Shortstories</Link>
          <Link to="/shop" className="welcome-button">All Books</Link>
        <Link to="/novel-bookstore" className="welcome-button">Novels</Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
