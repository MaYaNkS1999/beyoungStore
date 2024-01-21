import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/constant";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import {setCartDummy} from "../../utils/redux/cartSlice";

const CartItemCard = ({ product }) => {
  const { _id, name, displayImage, price } = product.product;
  const token=window.localStorage.getItem("token");
  const quantity = product.quantity;
  const [qty, setQty] = useState(quantity);
  const cartDummy=useSelector(store=>store.cart.cartDummy);
  const dispatch=useDispatch();

  const handleQtyChange = (event) => {
    setQty(qty-1);
  };

  const removeItemFromCart = async (_id) => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/cart/${_id}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        projectId: "fio1831j50s3",
      },
    });
    const jsonData=await response.json();
    if(response.ok){
      toast.success("Item removed from Cart");
      dispatch(setCartDummy(!cartDummy));
    }else{
      toast.error("Something went wrong");
    }
  };

  const moveToWishlist = async () => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/wishlist`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "projectId": "fio1831j50s3",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId:`${_id}`
        }),
      });
      const jsonData = await response.json();
      if(response.ok){
        removeItemFromCart(_id);
        toast.success("Item moved to wishlist");
      }else{
        toast.error("Something went wrong");
      }
  };


  return (
    <div className="border border-gray-300 p-1 bg-white mb-4">
      <section className="flex gap-4 mb-2">
        <div className="h-32">
          <Link to={`/product/${_id}`}>
            <img src={displayImage} alt={name} className="h-full" />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <p>
            {" "}
            <Link to={`/products/${_id}`}>{name}</Link>
          </p>
          <p>&#8377;{price}</p>
          <div className="cart-item-qty">
            <label htmlFor="quantity">QTY:</label>
            <select
              name="quantity"
              id="quantity"
              value={qty}
              onChange={handleQtyChange}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
              {parseInt(qty) > 10 && (
                <>
                  <option value={qty}>{qty}</option>
                </>
              )}
            </select>
          </div>
        </div>
      </section>
      <Divider />
      <section className="mt-2 flex justify-between">
        <button
          onClick={() => removeItemFromCart(_id)}
          className=" p-1 text-gray-500 hover:bg-black hover:text-white hover:rounded-lg"
        >
          Remove
        </button>
        <button
          onClick={() => moveToWishlist(_id)}
          className=" p-1 text-gray-500 hover:bg-black hover:text-white hover:rounded-lg"
        >
          Move To Wishlist
        </button>
      </section>
    </div>
  );
};

export default CartItemCard;
