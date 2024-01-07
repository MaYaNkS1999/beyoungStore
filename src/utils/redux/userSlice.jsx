import {createSlice} from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        userInfo:null
    },
    reducers:{
        addUserDetails :(state,action)=>{
            window.localStorage.setItem("userInfo",JSON.stringify(action.payload));
            console.log("user details",action.payload);
            state.userInfo=action.payload;
        }
    }
})

export const {addUserDetails}=userSlice.actions;

export default userSlice.reducer;