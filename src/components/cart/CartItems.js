import React from "react";
import { baseUrl } from "../../utils/constant";
import { useEffect } from "react";
import { useState } from "react";
import CartItemCard from "./CartItemCard";
import {useSelector } from "react-redux";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  const cartDummy=useSelector(store=>store.cart.cartDummy);

  const fetchData = async () => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/cart`;
    const response = await fetch(apiUrl, {
      headers: {
        authorization: `Bearer ${token}`,
        projectId: "fio1831j50s3",
      },
    });
    const jsonData = await response.json();
    setCartItems(jsonData.data.items);
    setData(jsonData.data);
  };

  useEffect(() => {
    fetchData();
  }, [cartDummy]);

  return cartItems && (
    
      <div className="w-7/12 mb-4 ml-2">
        {cartItems.length &&
        cartItems.map((product, i) => (
          <CartItemCard
            key={i}
            product={product}            
          />
        ))}
      </div>
      
  );
};

export default CartItems;
