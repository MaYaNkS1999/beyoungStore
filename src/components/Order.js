import React,{useState} from 'react';
import emptyImage from "../assets/no-orders.gif";

const Order = () => {
  const [orders, setOrders] = useState([]);
  return (
    <div
      className="my-orders-section"
      
    >
      {orders.length === 0 ? (
        <img style={{width:'70%',margin:'0 auto'}} src={emptyImage} alt="no-orders" />
      ) : (
        <div className="my-orders-container">
          {orders.map((order, i) => (
            <MyOrderCard key={i} orderItem={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Order