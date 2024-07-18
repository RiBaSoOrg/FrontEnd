import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './WelcomeScreen.css';
import { RootState } from "../../store";
import { logout } from "../../slices/authSlice";
import EditShippingAddress from "../EditShippingAdressAndPaymentDetail/EditShippingAddress";
import EditPaymentDetail from "../EditShippingAdressAndPaymentDetail/EditPaymentDetail";
import { useKeycloak } from '@react-keycloak/web';

const WelcomeScreen: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak()

    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const handleLogout = () => {
        keycloak.logout()
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="welcome-container">
            <h1>Willkommen beim Bookstore!</h1>
            <p>Wählen Sie eine Kategorie, um fortzufahren:</p>
            <div className="welcome-buttons">
                <Link to="/shortstory-bookstore" className="welcome-button">Shortstories</Link>
                <Link to="/shop" className="welcome-button">All Books</Link>
                <Link to="/novel-bookstore" className="welcome-button">Novels</Link>
            </div>
            {isAuthenticated && (
                <div className="welcome-buttons">
                    <button onClick={() => setAddressModalOpen(true)} className="edit-button">Edit Address</button>
                    <button onClick={handleLogout} className="user-logout-button">Logout</button>
                    <button onClick={() => setPaymentModalOpen(true)} className="edit-button">Edit Payment Details</button>
                </div>
            )}
            {isAddressModalOpen && <EditShippingAddress onClose={() => setAddressModalOpen(false)} />}
            {isPaymentModalOpen && <EditPaymentDetail onClose={() => setPaymentModalOpen(false)} />}
        </div>
    );
};

export default WelcomeScreen;
