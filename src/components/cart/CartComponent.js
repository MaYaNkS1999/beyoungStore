import React, { useState, useEffect } from "react";
import CheckoutHeader from "../checkout/CheckoutHeader";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/constant";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import { setIsClearcart } from "../../utils/redux/checkoutSlice";
import { setButtonDisable } from "../../utils/redux/checkoutSlice";
import { setCartDummy } from "../../utils/redux/cartSlice";
import {useMediaQuery} from '@mui/material';

const CartComponent = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const query = currentUrl.split("/")[2];
  const [products, setProducts] = useState([]);
  const isLogin = useSelector((store) => store.auth.isLogin);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const isButtonDisable = useSelector(
    (store) => store.checkout.isButtonDisable
  );
  const isClearcartDisable = useSelector(
    (store) => store.checkout.isClearcartDisable
  );
  const dispatch = useDispatch();
  const cartDummy=useSelector(store=>store.cart.cartDummy);
  const smallScreen=useMediaQuery('(max-width:650px)');
  
  
  const fetchData = async () => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/cart`;
    const response = await fetch(apiUrl, {
      headers: {
        authorization: `Bearer ${token}`,
        projectId: "fio1831j50s3",
      },
    });
    const jsonData = await response.json();
    setProducts(jsonData.data?.items);
    // console.log(products);
    setData(jsonData.data);
  };
  
  const handleCheckout = () => {
    if (query === "cartitems") {
      dispatch(setIsClearcart(true));
      dispatch(setButtonDisable(true));
      navigate("/cart/address");
    }
    if (query === "address") {
      dispatch(setButtonDisable(true));
      navigate("/cart/payment");
    }
    if (query === "payment") { 
      const address=JSON.parse(window.localStorage.getItem("Address"));
  // console.log(address);
      products.map((item)=>{orderHistory(item,address)});
      navigate("/cart/success");
    }
  };

  const orderHistory=async(item,address)=>{
    const productId=item.product._id;
    const apiUrl=baseUrl+`/api/v1/ecommerce/order`;
    const response=await fetch(apiUrl,{
      method:'POST',
      headers:{
        authorization: `Bearer ${token}`,
        projectId: "fio1831j50s3",
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "productId":`${productId}`,
        "quantity":1,
        "addressType":"HOME",
        "address":{
          "street":`${address.street}`,
          "city":`${address.city}`,
          "state":`${address.state}`,
          "country":`${address.country}`,
          "zipCode":`${address.zipCode}`
        }
      })
    })
    const jsonData=await response.json();
    console.log(jsonData);
  }
  
  const clearWholeCart = async () => {
    const apiUrl = baseUrl + `/api/v1/ecommerce/cart`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        projectId: "fio1831j50s3",
      },
    });
    const jsonData = await response.json();
    if (response.ok) {
      toast.success("Cart is Cleared");
      dispatch(setCartDummy(!cartDummy));
    } else {
      toast.error("Something went wrong");
    }
  };
  
  useEffect(() => {
    if (!isLogin) {
      navigate("/", { replace: true });
    } else {
      fetchData();
    }
  }, [isLogin,cartDummy]);
  
  return products && (
    <div>
      <CheckoutHeader />
      {products.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className={`w-10/12 m-auto flex ${smallScreen && 'flex-col'} justify-between bg-gray-300 items-start`}>
            <Outlet />
            <div className={`${smallScreen ?'mb-2 mx-2 w-[96%]':'w-5/12  mx-4'} p-2 bg-white`}>
              <section className="pricing-section">
                <h4 className="font-bold text-2xl mb-2">
                  PRICE DETAILS
                  <span>
                    ({products.length} {products.length > 1 ? "items" : "item"})
                  </span>
                </h4>
                <Divider />
                <span className="flex justify-between my-2">
                  <p>Total MRP (Inc. of Taxes)</p>
                  <p>&#8377;{data.totalPrice}</p>
                </span>
                <span className="flex justify-between my-2">
                  <p>Shipping</p>
                  <p style={{ color: "#49BA49" }}>
                    <i>Free</i>
                  </p>
                </span>
                <span className="flex justify-between my-2">
                  <p>Cart Total</p>
                  <p>&#8377;{data.totalPrice}</p>
                </span>
              </section>
              <section className="my-2 w-full">
                <p className="flex justify-between">
                  <span>Total Amount</span>
                  <span>&#8377;{data.totalPrice}</span>
                </p>
                <div className="flex flex-col justify-center items-center mt-2">
                  <button
                    disabled={isButtonDisable}
                    onClick={handleCheckout}
                    className="font-bold text-2xl text-white bg-sky-300 p-3 w-10/12 mx-auto my-2"
                  >
                    {query !== "payment" ? "CHECKOUT SECURELY":"PLACE ORDER"}
                  </button>
                  <button
                    disabled={isClearcartDisable}
                    className="font-bold text-2xl text-white bg-red-500 p-3 w-10/12 mx-auto my-2"
                    onClick={clearWholeCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
