import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './checkout.css';
import { Link } from 'react-router-dom';

export const Checkout = () => {
    const { cartItems, PRODUCTS, getTotalCartAmount, checkout } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const totalAmount = getTotalCartAmount();

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleCheckout = () => {
        if (paymentMethod === 'creditCard') {
            console.log('Processing credit card payment:', cardDetails);
            // Add credit card payment processing logic here
        } else {
            checkout();
        }
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {totalAmount > 0 ? (
                <>
                    <div className="checkout-items">
                        {PRODUCTS.filter(product => cartItems[product.id] > 0).map(product => (
                            <div className="checkout-item" key={product.id}>
                                <img src={product.productImage} alt={product.productName} />
                                <div className="checkout-item-details">
                                    <p><b>{product.productName}</b></p>
                                    <p>Price: ${product.price}</p>
                                    <div className="quantity-controls">
                                        <span>Quantity: {cartItems[product.id]}</span>
                                    </div>
                                    <p>Total: ${product.price * cartItems[product.id]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-summary">
                        <h2>Order Summary</h2>
                        <p>Total Amount: ${totalAmount}</p>
                        <div className="payment-methods">
                            <h3>Choose Payment Method</h3>
                            <div>
                                <input
                                    type="radio"
                                    id="creditCard"
                                    name="paymentMethod"
                                    value="creditCard"
                                    checked={paymentMethod === 'creditCard'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="creditCard">Credit Card</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                        {paymentMethod === 'creditCard' && (
                            <div className="card-details-form">
                                <h4>Enter Card Details</h4>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardDetailsChange}
                                />
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="Expiry Date (MM/YY)"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardDetailsChange}
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={cardDetails.cvv}
                                    onChange={handleCardDetailsChange}
                                />
                            </div>
                        )}
                        <div className="checkout-buttons-container">
                            <Link to="/" className="continueShoppingButton">Continue Shopping</Link>
                            <Link to="/cart" className="backToCartButton">Back to Cart</Link>
                            {paymentMethod === 'paypal' ? (
                                <a
                                    href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_BUSINESS_EMAIL&amount=${totalAmount}&currency_code=USD`}
                                    className="checkout-button"
                                >
                                    Pay with PayPal
                                </a>
                            ) : (
                                <button className="checkout-button" onClick={handleCheckout}>Pay with Credit Card</button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};
