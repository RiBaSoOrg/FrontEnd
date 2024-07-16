import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, clearCart } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleBuy = () => {
    navigate('/order', { state: { cart, totalPrice } });
    onClose();
  };

  return (
      <div className="cart-overlay">
        <div className="cart-overlay-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Einkaufswagen</h2>
          {cart.length === 0 ? (
              <p>Ihr Einkaufswagen ist leer.</p>
          ) : (
              <div>
                <ul>
                  {cart.map(item => (
                      <li key={item.id}>
                        <div className="cart-item-info">
                          <span className="cart-item-title">{item.title}</span>
                          <span className="cart-item-author">by {item.author}</span>
                        </div>
                        <span className="cart-item-details">${item.price.toFixed(2)} x {item.quantity}</span>
                        <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        <span className="cart-item-store">{item.store}</span>
                        <button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                      </li>
                  ))}
                </ul>
                <div className="total-price">
                  <strong>Gesamtpreis: ${totalPrice.toFixed(2)}</strong>
                </div>
                <button onClick={handleBuy} className="buy-button">Buy</button>
                <button onClick={() => dispatch(clearCart())} className="clear-cart-button">Clear Cart</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default CartOverlay;
