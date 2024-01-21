import React, { useEffect, useState } from "react";
import WishlistCard from "./WishlistCard";
import emptyImage from "../assets/EMPTY-WISHLIST-PAGE.jpg";
import { baseUrl } from "../utils/constant";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistDummy } from "../utils/redux/cartSlice";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const token = window.localStorage.getItem("token");
  const wishlistDummy=useSelector(store=>store.cart.wishlistDummy);
  const dispatch=useDispatch();

  const clearAllWishlist =async () => {
    const apiUrl=baseUrl+"/api/v1/ecommerce/wishlist";
    const response=await fetch(apiUrl,{
      method:"DELETE",
      headers:{
        projectId:"fio1831j50s3",
        Authorization:`Bearer ${token}`
      }
    })
    const jsonData=await response.json();
    if(response.ok){
      toast.success("WishList is empty");
      dispatch(setWishlistDummy(!wishlistDummy));
    }
  };

  const removeProductFromState = (productId) => {
    // const updatedProducts = products.filter(
    //   (product) => product._id !== productId
    // );
    // setProducts(updatedProducts);
  };

  const fetchWishList = async () => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/wishlist`;
    const response = await fetch(apiUrl, {
      method:"GET",
      headers: {
        projectId: "fio1831j50s3",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    setProducts(jsonData.data?.items);
  };

  useEffect(() => {
    fetchWishList();
  }, [wishlistDummy]);

  return products && (
    <div className="relative flex flex-col w-full">
      {products.length > 0 && (
        <button onClick={clearAllWishlist} className="absolute self-end -mt-10 mr-1 rounded-md bg-amber-300 p-2 cursor-pointer font-bold hover:bg-amber-400">Clear wishlist</button>
      )}
      {products.length === 0 ? (
        <img
          style={{ width: "70%", margin: "0 auto" }}
          src={emptyImage}
          alt="empty-wishlist"
        />
      ) : (
        <div className="p-1 flex flex-wrap gap-5">
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
};

export default WishList;
