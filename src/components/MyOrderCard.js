import React from "react";
import { Link } from "react-router-dom";
import {  Typography } from "@mui/material";
import {useMediaQuery} from '@mui/material';

const MyOrderCard = ({ orderItem }) => {
  const { order } = orderItem;
  // const {updateErrorStatus} = useError()

  const { totalPrice } = order;
  const { createdAt } = orderItem;
  const { street, city, state, country, zipCode } =
    order.shipmentDetails.address;
  const { name, displayImage, _id } = order.items[0].product;
  const createdAtDate = new Date(createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  const smallScreen=useMediaQuery('(max-width:650px)');

  return (
    <div className="border mb-4">
      <div className="">
        <section className={`flex ${smallScreen?'flex-col p-2':''} gap-4`}>
          <Link to={"/product/" + _id}>
            <img src={displayImage} alt={name} className="w-[200px]" />
          </Link>
          <div className="flex flex-col gap-5">
            <div>
              <Typography
                sx={{ maxWidth: "100%", fontWeight: 520, color: "#070707" }}
              >
                {name}
              </Typography>

              <div className="order-total-amount">
                <Typography sx={{ fontWeight: 590, display: "inline-block" }}>
                  Amount:{" "}
                </Typography>
                &#8377;{totalPrice}
              </div>
            </div>
            <div>
              <h1 className="font-bold ">Order Status: Processing</h1>
              <p>Total Order Cost: &#8377;{totalPrice}</p>
              <p>Total Quantity: 1</p>
              <p>
                Payment Mode : <span className="font-medium">COD</span>
              </p>
              <p>
                Order Date: <span className="font-medium">{date}</span>
              </p>
              <p>
                Deliver to:{" "}
                <span className="font-medium">
                  {street +
                    ", " +
                    city +
                    ", " +
                    state +
                    ", " +
                    country +
                    ", " +
                    zipCode}
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyOrderCard;
