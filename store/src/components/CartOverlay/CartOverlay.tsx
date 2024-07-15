import React from 'react';
import './CartOverlay.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, clearCart } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom'; 

// Definiert die Eigenschaften (Props), die die CartOverlay-Komponente erwartet
interface CartOverlayProps {
  onClose: () => void; // Funktion, die aufgerufen wird, um das Overlay zu schließen
}

// Definiert die CartOverlay-Komponente als Funktionale Komponente mit den Eigenschaften von CartOverlayProps
const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }) => {
  const cart = useSelector((state: RootState) => state.cart.cart); // Verwendet den useCart-Hook, um auf den Einkaufswagen und die Funktionen zum Entfernen und Leeren zuzugreifen
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Verwendet den useNavigate-Hook von React Router, um Navigationen durchzuführen

  // Berechnet den Gesamtpreis aller Artikel im Einkaufswagen
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Funktion, die aufgerufen wird, wenn der Kauf-Button geklickt wird
  const handleBuy = () => {
    navigate('/thank-you', { state: { purchasedItems: cart, totalPrice } }); // Navigiert zur Thank-You-Seite und übergibt die gekauften Artikel und den Gesamtpreis
    dispatch(clearCart())  // Leert den Einkaufswagen
    onClose(); // Schließt das Overlay
  };

  return (
    <div className="cart-overlay">
      <div className="cart-overlay-content">
        <button className="close-button" onClick={onClose}>X</button> {/* Schließt das Overlay */}
        <h2>Einkaufswagen</h2>
        {cart.length === 0 ? (
          <p>Ihr Einkaufswagen ist leer.</p>  // Zeigt eine Nachricht an, wenn der Einkaufswagen leer ist
        ) : (
          <div>
            <ul>
              {/* Mappt über die Artikel im Einkaufswagen und rendert eine Liste der Artikel */}
              {cart.map(item => (
                <li key={item.id}>
                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.title}</span>
                    <span className="cart-item-author">by {item.author}</span>
                  </div>
                  <span className="cart-item-details">${item.price.toFixed(2)} x {item.quantity}</span>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <span className="cart-item-store">{item.store}</span>
                  <button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Entfernen</button>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <strong>Gesamtpreis: ${totalPrice.toFixed(2)}</strong>
            </div>
            <button onClick={handleBuy} className="buy-button">Kaufen</button>
            <button onClick={() => dispatch(clearCart())} className="clear-cart-button">Einkaufswagen leeren</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;
