import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../slices/cartSlice';
import './OrderPage.css';

const OrderPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { cart, totalPrice } = location.state;
    const listRoute = location.state?.list || '/'; // Rückfall auf die Startseite

    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleConfirmOrder = () => {
        navigate('/thank-you', { state: { purchasedItems: cart, totalPrice } });
        dispatch(clearCart());
    };

    // Funktion, die aufgerufen wird, wenn der Zurück-Button geklickt wird
    const handleReturn = () => {
        navigate('/shop'); // Navigiere zurück zum Shop
    };

    return (
        <div className="order-overlay">
            <div className="order-overlay-content">
                <button className="close-button" onClick={() => navigate(-1)}>X</button>
                <h2>Checkout</h2>
                <div className="order-boxes">
                    <div className="order-box">
                        <h3>Shipping Information</h3>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={shippingAddress.name}
                                onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Postal Code:</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="order-box">
                        <h3>Payment Information</h3>
                        <div className="form-group">
                            <label>Card Number:</label>
                            <input
                                type="text"
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input
                                type="text"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV:</label>
                            <input
                                type="text"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
                <div className="confirm-button-container">
                    <button onClick={handleReturn} className="order-back-button" >Back</button>
                    <button onClick={handleConfirmOrder} className="confirm-button">Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
