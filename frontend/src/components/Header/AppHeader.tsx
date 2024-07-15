import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Bookiconround.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../slices/authSlice';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { List, X } from 'react-feather'; // Import icons from react-feather
import './AppHeader.css';

export const AppHeader: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State to manage whether the menu is open or not
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
            <div className="logo-section">
                <img src={logo} className="App-logo" alt="Bookstore Logo"/>
                <h1>Bookstore</h1>
            </div>
            <div className="nav-container">
                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? <X size={32}/> : <List size={32}/>}
                </div>
                {menuOpen && (
                    <div className={`links ${menuOpen ? "open" : ""}`}>
                        <Link to="/shortstory-bookstore" className="nav-button" onClick={toggleMenu}>Shortstories</Link>
                        <Link to="/novel-bookstore" className="nav-button" onClick={toggleMenu}>Novels</Link>
                    </div>
                )}
                {userRole === 'admin' && (
                    <Link to="/add-book" className="nav-button">Add New Book</Link>
                )}
            </div>
            <div className="login-content">
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="login-button">Logout</button>
                ) : (
                    <Link to="/" className="login-button">Login</Link>
                )}
            </div>
            <div className="cart-button-container">
                <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                    ({totalItems})
                </button>
            </div>
        </header>
    );
};

export default AppHeader;
