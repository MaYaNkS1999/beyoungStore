import React from 'react';
import emptycartimage from "../../assets/empty-cart.gif";
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const navigate = useNavigate();

    // this component renders when the cart is empty
  return (
    <div className="text-center w-10/12 m-auto">
      <div>
        <img src={emptycartimage} alt="empty-cart-banner" className='m-auto'/>
      </div>
      <section>
        <p className="font-medium text-3xl">Your cart is empty and sad :(</p>
        <p className="text-2xl text-gray-400 my-4">Add Something To Make It Happy!</p>
      </section>
      <section >
        <button onClick={()=>navigate('/')}className='p-4 bg-black text-white font-bold text-2xl rounded-lg m-4'>Continue Shopping</button>
      </section>
    </div>
  );
}

export default EmptyCart