import React from 'react';
import logoSVG from "../../assets/Logo.svg";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Link } from "react-router-dom";
import {useMediaQuery} from '@mui/material';

const CheckoutHeader = () => {
  const smallScreen=useMediaQuery('(max-width:650px)');
  return (
    <div className="bg-gray-300">
      <section className={`flex gap-2 ${!smallScreen &&'justify-end'}`}>
        <GppGoodIcon sx={{ width: "3rem", height: "3rem" }} />
        <p className={`font-bold  self-center ${smallScreen?'my-2 text-2xl':'mr-5 text-3xl'}`}>100% SECURE PAYMENT</p>
      </section>
    </div>
  );
}

export default CheckoutHeader