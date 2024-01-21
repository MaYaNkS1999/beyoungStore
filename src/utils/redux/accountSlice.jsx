import {createSlice} from "@reduxjs/toolkit";

const accountSlice= createSlice({
    name:"account",
    initialState:{
        isProfile:false,
        isWishList:false,
        isOrder:false,
        showDeleteDialogue:false,
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
        },
        setShowDeleteDialogue:(state,action)=>{
            state.showDeleteDialogue=action.payload;
        }
    }
})

export const {setIsProfile,setIsWishList,setIsOrder,setShowDeleteDialogue}=accountSlice.actions;

export default accountSlice.reducer;