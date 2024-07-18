import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

interface PurchasedItem {
    id: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    store: string;
}

interface LocationState {
    purchasedItems: PurchasedItem[];
    totalPrice: number;
}

const ThankYouPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { purchasedItems, totalPrice } = location.state as LocationState || { purchasedItems: [], totalPrice: 0 };

    return (
        <div className="thank-you-container">
            <h1>Thank You for Shopping!</h1>
            <p>We appreciate your business. Here are the details of your purchase:</p>
            <ul>
                {purchasedItems.map((item) => (
                    <li key={item.id}>
                        <div className="purchased-item-info">
                            <span className="purchased-item-title">{item.title}</span>
                            <span className="purchased-item-author">by {item.author}</span>
                            <span className="purchased-item-quantity">Quantity: {item.quantity}</span>
                            <span className="purchased-item-price">Price: ${(item.price * item.quantity).toFixed(2)}</span>
                            <span className="purchased-item-store">Store: {item.store}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="total-price">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
            <button className="back-button" onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
    );
};

export default ThankYouPage;
