import React from 'react';
import { Link } from 'react-router-dom';
import shirt from "../assets/Shirts.jpg";
import jeans from "../assets/Jeans.jpg";
import joggers from "../assets/Joggers.jpg";

const Categories = () => {
  return (
    <div className='w-10/12 my-4'>
        <span className="border-b-yellow-600 border-b text-3xl font-bold" >CATEGORIES</span>
        <div className='p-2 flex gap-4'>
        <Link to="/products/shirt">
        <img src={shirt} alt="shirt" className='w-48' />
        </Link>
        <Link to="/products/jeans">
        <img src={jeans} alt="jeans" className='w-48' />
        </Link>
        <Link to="/products/jogger">
        <img src={joggers} alt="joggers" className='w-48' />
        </Link>
        </div>
    </div>
  )
}

export default Categories