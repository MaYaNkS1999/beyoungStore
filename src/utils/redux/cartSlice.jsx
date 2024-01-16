import {createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        cart:[],
        cartLength:null,
    },
    reducers:{
        addToCart:(state,action)=>{
            state.cart.push(action.payload);
        },
        setCartLength:(state,action)=>{
            state.cartLength=action.payload;
        }
    }
})


export const {addToCart,setCartLength}=cartSlice.actions;

export default cartSlice.reducer;