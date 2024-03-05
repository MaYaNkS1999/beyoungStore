import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { baseUrl } from "../utils/constant";
import { toast } from "react-toastify";
import { setWishlistDummy } from "../utils/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const WishlistCard = ({ product }) => {
  const { displayImage, _id, name, price } = product.products;
  const token = window.localStorage.getItem("token");
  const dispatch=useDispatch();
  const wishlistDummy=useSelector(store=>store.cart.wishlistDummy);

  const moveToCart = async () => {
    
    const apiUrl = baseUrl + `/api/v1/ecommerce/cart/${_id}`;
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        projectId: "fio1831j50s3",
      },

      body: JSON.stringify({
        quantity: 1,
        size: "S",
      }),
    });
    const jsonData = await response.json();
    if (response.ok) {
      handleRemoveItem();
      toast.success("Item added to cart");
    }
  };
  const handleRemoveItem = async () => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/wishlist/${_id}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        projectId: "fio1831j50s3",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    if (response.ok) {
      toast.success("Item is removed");
      dispatch(setWishlistDummy(!wishlistDummy));
    }
  };
  
  
  return (
    <div className="relative w-[200px]">
      <Link to={`/product/${_id}`}>
        <img
          src={displayImage}
          alt={name}
          style={{ borderRadius: "5px", width: "100%" }}
        />
      </Link>
      <div className="flex flex-col justify-around ">
        <Typography
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
            overflow: "hidden",
          }}
          variant="subtitle1"
        >
          {name}
        </Typography>
        <Typography sx={{ fontWeight: "600" }} variant="subtitle1">
          &#8377; {price}
        </Typography>
        <button
          onClick={moveToCart}
          className="flex items-center justify-center font-bold bg-sky-300 rounded-lg text-gray-800 cursor-pointer hover:bg-sky-500 p-2"
        >
          <AddShoppingCartIcon />
          Move To Cart
        </button>
      </div>
      <button
        onClick={handleRemoveItem}
        className="absolute rounded-full w-8 h-8 bg-gray-300 flex items-center justify-center top-1 right-1 cursor-pointer hover:bg-red-500"
      >
        X
      </button>
    </div>
  );
};

export default WishlistCard;
