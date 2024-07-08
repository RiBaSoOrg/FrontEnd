import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './checkout.css';
import { Link } from 'react-router-dom';

export const Checkout = () => {
    const { cartItems, PRODUCTS, getTotalCartAmount, checkout } = useContext(ShopContext);

    console.log('Cart Items:', cartItems); // Log for debugging
    console.log('Products:', PRODUCTS); // Log for debugging

    const totalAmount = getTotalCartAmount();

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
                        <Link to="/" className="continueShoppingButton">Continue Shopping</Link>
                        <Link to="/cart" className="backToCartButton">Back to Cart</Link>
                        <button className="checkout-button" onClick={checkout}>Complete Purchase</button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};
