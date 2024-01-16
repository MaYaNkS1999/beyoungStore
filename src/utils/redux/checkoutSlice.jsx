import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{
        showSuccessModel:true,
        isButtonDisable:false,
        isClearcartDisable:false
    },
    reducers:{
        updateSuccessModel:(state,action)=>{
            state.showSuccessModel=action.payload;
        },
        setButtonDisable:(state,action)=>{
            state.isButtonDisable=action.payload;
        },
        setIsClearcart:(state,action)=>{
            state.isClearcartDisable=action.payload;
        }
    }
})

export const {updateSuccessModel,setButtonDisable,setIsClearcart}=checkoutSlice.actions;

export default checkoutSlice.reducer;