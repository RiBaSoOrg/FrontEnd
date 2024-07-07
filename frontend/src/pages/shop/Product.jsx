import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './shop.css';

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart, increaseCartItem, decreaseCartItem, cartItems } = useContext(ShopContext);

    const cartItemCount = cartItems[id] || 0; // Handle undefined case

    return (
        <div className="product">
            <img src={productImage} alt={productName} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p> ${price}</p>
            </div>
            <div className="quantity-controls">
                <button className="decreaseButton" onClick={() => decreaseCartItem(id)}>-</button>
                <span>{cartItemCount}</span>
                <button className="increaseButton" onClick={() => increaseCartItem(id)}>+</button>
            </div>
            <button className="addToCartButton" onClick={() => addToCart(id)}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};
