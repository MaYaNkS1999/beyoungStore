import {createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        cart:[],
        wishlistDummy:true,
        cartDummy:true,
    },
    reducers:{
        addToCart:(state,action)=>{
            state.cart.push(action.payload);
        },
        setWishlistDummy:(state,action)=>{
            state.wishlistDummy=action.payload;

        },
        setCartDummy:(state,action)=>{
            state.cartDummy=action.payload;
        }
    }
})


export const {addToCart,setWishlistDummy,setCartDummy}=cartSlice.actions;

export default cartSlice.reducer;