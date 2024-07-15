import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { List, X } from 'react-feather';
import {RootState} from "../store";
import {logout} from "../slices/authSlice";
import logo from '..//Bookiconround.png'; // Corrected path to the logo

export const AppHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
      <header className="AppHeader">
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <X size={32} /> : <List size={32} />}
        </div>
        {menuOpen && (
            <div className={`links ${menuOpen ? 'open' : ''}`}>
              <Link to="/shortstory-bookstore" className="nav-button" onClick={toggleMenu}>Shortstories</Link>
              <Link to="/novel-bookstore" className="nav-button" onClick={toggleMenu}>Novels</Link>
            </div>
        )}
        <div className="logo-section">
          <img src={logo} className="App-logo" alt="Bookstore Logo" />
        </div>
        <div className="right-section">
          {userRole === 'admin' && (
              <Link to="/add-book" className="nav-button">Add New Book</Link>
          )}
          {isAuthenticated ? (
              <button onClick={handleLogout} className="login-icon">Logout</button>
          ) : (
              <Link to="/login" className="login-icon">
                <FontAwesomeIcon icon={faUser} />
              </Link>
          )}
          <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {totalItems > 0 && (
                <span className="cart-item-count">{totalItems}</span>
            )}
          </button>
        </div>
      </header>
  );
};

export default AppHeader;
