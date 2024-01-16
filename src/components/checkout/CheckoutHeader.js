import React from 'react';
import logoSVG from "../../assets/Logo.svg";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Link } from "react-router-dom";

const CheckoutHeader = () => {
  return (
    <div className="bg-gray-300">
      <section className="flex gap-2 justify-end">
        <GppGoodIcon sx={{ width: "3rem", height: "3rem" }} />
        <p className='font-bold text-3xl self-center mr-5'>100% SECURE PAYMENT</p>
      </section>
    </div>
  );
}

export default CheckoutHeader