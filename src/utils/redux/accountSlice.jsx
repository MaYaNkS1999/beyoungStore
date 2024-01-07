import {createSlice} from "@reduxjs/toolkit";

const accountSlice= createSlice({
    name:"account",
    initialState:{
        isProfile:false,
        isWishList:false,
        isOrder:false,
    },
    reducers:{
        setIsProfile:(state,action)=>{
            state.isProfile=action.payload;
        },
        setIsWishList:(state,action)=>{
            state.isWishList=action.payload;
        },
        setIsOrder:(state,action)=>{
            state.isOrder=action.payload;
        }
    }
})

export const {setIsProfile,setIsWishList,setIsOrder}=accountSlice.actions;

export default accountSlice.reducer;