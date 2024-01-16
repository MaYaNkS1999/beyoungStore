import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:"auth",
    initialState:{
        isLogin: window.localStorage.getItem("isLogin"),
        isLoginPopup:false,
        isSignupPopup:false,
        token:null,
    },
    reducers:{
        setIsLogin:(state,action)=>{
            window.localStorage.setItem("isLogin",true);
            state.isLogin = action.payload;
        },
        setIsSignOut:(state,action)=>{
            state.isLogin=action.payload;
            window.localStorage.removeItem("isLogin");
        },
        setIsLoginPopup:(state,action)=>{
            state.isLoginPopup=action.payload;
        },
        setIsSignupPopup:(state,action)=>{
            state.isSignupPopup=action.payload;
        },
        setToken:(state,action)=>{
            window.localStorage.setItem("token",action.payload);
            state.token=action.payload;
        }
    }
})

export const {setIsLogin,setIsLoginPopup,setIsSignupPopup,setToken,setIsSignOut}= authSlice.actions;

export default authSlice.reducer;