import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage: React.FC = () => {
  const location = useLocation(); // Holt den aktuellen Standort und Zustand
  const navigate = useNavigate(); // Verwendet den useNavigate-Hook von React Router, um Navigationen durchzuführen
  const { purchasedItems, totalPrice } = location.state || { purchasedItems: [], totalPrice: 0 }; // Liest die gekauften Artikel und den Gesamtpreis aus dem Zustand

  return (
    <div className="thank-you-container">
      <h1>Thank You for Shopping!</h1>
      <p>We appreciate your business. Here are the details of your purchase:</p>
      <ul>
        {purchasedItems.map((item:any) => (
          <li key={item.id}>
            <div className="purchased-item-info">
              <span className="purchased-item-title">{item.title}</span>
              <span className="purchased-item-author">by {item.author}</span>
              <span className="purchased-item-quantity">Quantity: {item.quantity}</span>
              <span className="purchased-item-price">Price: €{(item.price * item.quantity).toFixed(2)}</span>
              <span className="purchased-item-store">Store: {item.store}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-price">
        <strong>Total: €{totalPrice.toFixed(2)}</strong>
      </div>
      <button className="back-button" onClick={() => navigate('/welcome')}>Back to Home</button>
    </div>
  );
};

export default ThankYouPage;
