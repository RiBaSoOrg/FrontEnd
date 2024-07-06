import React from "react";
import {Product} from "./Product";
import {PRODUCTS} from "../../products";


export const Shop = () => {
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>RiBaSo Book Shop</h1>
            </div>
            <div className="products">
                {PRODUCTS.map((product) => (
                    <Product data={product}/>
                ))}
            </div>
        </div>
    );
};