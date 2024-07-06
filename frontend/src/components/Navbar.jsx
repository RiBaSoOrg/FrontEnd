import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { ShoppingCart, List, X, User } from "phosphor-react";
import "./navbar.css";
import {ShopContext} from "../context/ShopContext";

export const Navbar = () => {

    const { cartItems } = React.useContext(ShopContext);

    const totalCartItems = Object.values(cartItems).reduce((total, count) => total + count, 0);

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar">
            <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? <X size={32} /> : <List size={32} />}
            </div>
            <div className={`links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={toggleMenu}> Shop </Link>
                <Link to="/login" onClick={toggleMenu}>
                    <User size={32} />
                </Link>
                <Link to="/cart" onClick={toggleMenu}>
                    <ShoppingCart size={30} />
                    {totalCartItems > 0 && <span className="cart-item-count">{totalCartItems}</span>}
                </Link>
            </div>
        </div>
    );
};
