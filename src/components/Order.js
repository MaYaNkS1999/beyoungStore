import React, { useEffect, useState } from "react";
import emptyImage from "../assets/no-orders.gif";
import { baseUrl } from "../utils/constant";
import {useMediaQuery} from '@mui/material';
import MyOrderCard from "./MyOrderCard";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const token = window.localStorage.getItem("token");
  const smallScreen=useMediaQuery('(max-width:650px)');

  const fetchOrders = async () => {
    const apiUrl = baseUrl + "/api/v1/ecommerce/order";
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: "fio1831j50s3",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await res.json();
    console.log(jsonData);
    if (res.ok) {
      setOrders(jsonData.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="my-orders-section">
      {orders.length === 0 ? (
        <img
          style={smallScreen?{marginTop:'50%'}:{ width: "70%", margin: "0 auto" }}
          src={emptyImage}
          alt="no-orders"
        />
      ) : (
        <div className="my-orders-container">
          {orders.map((order, i) => (
            <MyOrderCard key={i} orderItem={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
