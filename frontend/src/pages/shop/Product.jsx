import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext'; // Import your ShopContext
import './shop.css'; // Make sure to import the CSS file

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);

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
            <button className="addToCartButton" onClick={() => addToCart(id)}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};