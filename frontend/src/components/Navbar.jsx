import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, List, X } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
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
                <Link to="/contact" onClick={toggleMenu}> Contact </Link>
                <Link to="/cart" onClick={toggleMenu}>
                    <ShoppingCart size={30} />
                </Link>
            </div>
        </div>
    );
};
