import React, { useState } from 'react';
import WishlistCard from './WishlistCard';
import emptyImage from "../assets/EMPTY-WISHLIST-PAGE.jpg";

const WishList = () => {
  const [products,setProducts]=useState([]);
  return (
    <div className="wishlist-section">
      {products.length>0 && (
        <button onClick={clearAllWishlist}>Clear wishlist</button>
      )}
      {products.length === 0 ? (
        <img
          style={{ width: "70%", margin: "0 auto" }}
          src={emptyImage}
          alt="empty-wishlist"
        />
      ) : (
        <div className="wishlist-container">
          {products.map((product, i) => (
            <WishlistCard
              key={i}
              product={product}
              removeProductFromState={removeProductFromState}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList