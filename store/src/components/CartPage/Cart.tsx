import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { removeFromCart, clearCart, removeItemFromBasketThunk, CartItem, clearBasketThunk } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const basketId = useSelector((state: RootState) => state.cart.basketId);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleBuy = () => {
    navigate('/order', { state: { cart, totalPrice } });
    onClose();
  };

  const handleRemoveFromCartClick = (item: CartItem) => {
    if (basketId) {
      dispatch(removeItemFromBasketThunk({ basketID: basketId, itemID: item.id, amount: 1 }));
      dispatch(removeFromCart(item.id));
    }
  };

  const handleClearCartClick = () => {
    if (basketId) {
      dispatch(clearBasketThunk(basketId));
      dispatch(clearCart());
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-overlay-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Einkaufswagen</h2>
        {cart.length === 0 ? (
          <p>Ihr Einkaufswagen ist leer.</p>
        ) : (
          <div className="cart-items-container">
            <ul className="cart-items">
              {cart.map(item => (
                <li key={item.id}>
                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.title}</span>
                    <span className="cart-item-author">by {item.author}</span>
                  </div>
                  <span className="cart-item-details">${item.price.toFixed(2)} x {item.quantity}</span>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <span className="cart-item-store">{item.store}</span>
                  <button className="remove-button" onClick={() => handleRemoveFromCartClick(item)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <strong>Gesamtpreis: ${totalPrice.toFixed(2)}</strong>
            </div>
            <button onClick={handleBuy} className="buy-button">Buy</button>
            <button onClick={handleClearCartClick} className="clear-cart-button">Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;
