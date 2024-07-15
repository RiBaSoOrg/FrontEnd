import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Bookiconround.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../slices/authSlice';
import CartOverlay from '../CartOverlay/CartOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import './AppHeader.css';

// Definiert die AppHeader-Komponente als Funktionale Komponente
export const AppHeader: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false); // Zustand, um zu verwalten, ob der Einkaufswagen geöffnet ist oder nicht
  const cart = useSelector((state: RootState) => state.cart.cart); // Verwendet den useCart-Hook, um auf den Einkaufswagen zuzugreifen
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth); // Verwendet den useAuth-Hook, um auf Authentifizierungsstatus und Benutzerrolle zuzugreifen
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Verwendet den useNavigate-Hook von React Router, um Navigationen durchzuführen

  // Funktion, die aufgerufen wird, wenn der Logout-Button geklickt wird
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Leite zur Login-Seite weiter
  };

  // Berechne die Gesamtmenge der Artikel im Warenkorb
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="AppHeader">
      <div className="logo-section">
        <img src={logo} className="App-logo" alt="Bookstore Logo" />
        <h1>Bookstore</h1>
      </div>
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/shortstory-bookstore" className="nav-button">Shortstories</Link>
          <Link to="/novel-bookstore" className="nav-button">Novels</Link>
          {userRole === 'admin' && (
            <Link to="/add-book" className="nav-button">Add New Book</Link>
          )}
          {userRole === 'non-admin' && (
            <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              ({totalItems})
            </button>
          )}
        </div>
      </div>
      <div className="login-content">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="login-button">Logout</button>
        ) : (
          <Link to="/" className="login-button">Login</Link>
        )}
      </div>
      {isCartOpen && <CartOverlay onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default AppHeader;
