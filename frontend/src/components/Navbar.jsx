import React from "react";
import { Link } from "react-router-dom";
import {ShoppingCart, SignOut, User} from "phosphor-react";


export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/"> Shop </Link>
                <Link to="/contact"> Contact </Link>
                <div className="hover:text-gray-200">
                            <div>
                                <SignOut size={32} />
                                <span style={{ marginBottom: '-55px' }}>
                                </span>
                            </div>
                </div>
                <Link to="/cart">
                    <ShoppingCart size={25} />
                </Link>
            </div>
        </div>
    );
};