import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './shop.css';

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const [tempCount, setTempCount] = useState(0);

    const cartItemCount = cartItems[id] || 0; // Handle undefined case

    const increaseTempCount = () => {
        setTempCount(tempCount + 1);
    };

    const decreaseTempCount = () => {
        setTempCount(Math.max(tempCount - 1, 0));
    };

    const handleAddToCart = () => {
        for (let i = 0; i < tempCount; i++) {
            addToCart(id);
        }
        setTempCount(0);
    };

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
                <button className="decreaseButton" onClick={decreaseTempCount}>-</button>
                <span>{tempCount}</span>
                <button className="increaseButton" onClick={increaseTempCount}>+</button>
            </div>
            <button className="addToCartButton" onClick={handleAddToCart}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};

