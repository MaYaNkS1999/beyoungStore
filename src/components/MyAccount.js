
import React, { useEffect, useState } from 'react';
import { Avatar, Stack, Typography } from "@mui/material";
import {Outlet,NavLink,Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIsLogin} from "../utils/redux/authSlice";
import {setIsProfile,setIsWishList,setIsOrder} from "../utils/redux/accountSlice"
import { toast } from "react-toastify";
import { setShowDeleteDialogue } from '../utils/redux/accountSlice';
import DeleteMeDialoge from './DeleteMeDialoge';


const MyAccount = () => {
  const userInfo=JSON.parse(window.localStorage.getItem("userInfo"));
  const {name}=userInfo;
  // console.log(userInfo.user);
  const navigate=useNavigate();
  const isProfile=useSelector((store)=>store.account.isProfile);
  const isWishList=useSelector(store=>store.account.isWishList);
  const isOrder=useSelector(store=>store.account.isOrder);
    const isLogin=useSelector((store)=>store.auth.isLogin);
    const showDeleteDialogue=useSelector(store=>store.account.showDeleteDialogue)

    const dispatch=useDispatch();

    const handleLogout=()=>{
      toast.success("Logout successfully");
      dispatch(setIsLogin(false));
    }

    const handleProfileClick =()=>{
      dispatch(setIsProfile(true));
      dispatch(setIsOrder(false));
      dispatch(setIsWishList(false));
    }

    const handleOrderClick =()=>{
      dispatch(setIsProfile(false));
      dispatch(setIsOrder(true));
      dispatch(setIsWishList(false));
    }

    const handleWishListClick =()=>{
      dispatch(setIsProfile(false));
      dispatch(setIsOrder(false));
      dispatch(setIsWishList(true));
    }

    const showDeletemeDialoge = ()=>{
      dispatch(setShowDeleteDialogue(true));
    }

    useEffect(()=>{
      if(!isLogin){
        navigate("/",{ replace: true });
      }
    },[isLogin])

  return (
    <div className='w-10/12 m-auto my-10'>

       <div className='flex gap-16 items-start'>
        <div className='flex w-3/12 flex-col gap-3 border border-gray-400 rounded-lg'>
        <Stack
            // sx={{ margin: "1rem" }}
            alignItems="center"
            justifyContent="center"
            spacing={0.7}
            className='bg-gray-300 rounded-lg py-2'
          >
            <Avatar
              sx={{ height: "100px", width: "100px", background: "black" }}
            >
              {name
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join(" ")}
            </Avatar>
            <Typography sx={{ textTransform: "uppercase" }} variant="h5">
              {name}
            </Typography>
            <Typography sx={{ color: "gray" }} variant="subtitle1">
              #Beyoungster
            </Typography>
          </Stack>
          <nav className='flex flex-col gap-3 p-4 my-4'>
            <NavLink to={"profile"} className={isProfile? "border-b border-gray-400 py-2 font-bold text-black":"border-b border-gray-400 py-2 text-gray-400"} onClick={handleProfileClick}>Profile</NavLink>
            <NavLink to={"order"}  className={isOrder? "border-b border-gray-400 py-2 font-bold text-black":"border-b border-gray-400 py-2 text-gray-400"} onClick={handleOrderClick}>Order</NavLink>
            <NavLink to={"wishlist"}  className={isWishList? "border-b border-gray-400 py-2 font-bold text-black":"border-b border-gray-400 py-2 text-gray-400"} onClick={handleWishListClick}>Wishlist</NavLink>
          </nav>
          <section className='flex flex-col gap-3 '>
            <Link onClick={showDeletemeDialoge} className='flex justify-center items-center text-red-600 hover:underline'>Delete My Account</Link>
            <button className='bg-yellow-400 p-2 m-4 rounded-lg hover:bg-yellow-300 font-bold text-gray-800' onClick={handleLogout}>LOGOUT</button>
          </section>
        </div>
        
        <DeleteMeDialoge open={showDeleteDialogue} setOpen={setShowDeleteDialogue}/>

        <div className='w-7/12'>
            <Outlet/>
        </div>
       </div>

    </div>
  )
}

export default MyAccount;