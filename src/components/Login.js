import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import loginBanner from "../assets/login-banner.jpg";
import { TextField } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../utils/redux/userSlice";
import { setIsLogin,setIsLoginPopup,setIsSignupPopup,setToken } from "../utils/redux/authSlice";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    appType: "ecommerce",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" && !isValidEmail(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError(false);
    }
    if (name === "password" && value.length < 6) {
      setPasswordError("Password must be at least 6 character long.");
    } else {
      setPasswordError(false);
    }

    setUserInfo({ ...userInfo, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    const apiUrl = baseUrl + "/api/v1/user/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectId: "fio1831j50s3",
      },
      body: JSON.stringify(userInfo),
    });
    const jsonData = await response.json();
    console.log(jsonData);
    if (response.ok) {
      // Navigate to a different route
      toast.success("Login Successfully");
      dispatch(setIsLogin(true));
      dispatch(setIsLoginPopup(false));
      // dispatch(setIsSignupPopup)
      dispatch(addUserDetails(jsonData.data.user));
      dispatch(setToken(jsonData.token));
      navigate("/", { replace: true });
    } else {
      toast.error(jsonData.message);
    }
  };

  useEffect(() => {
    // Save the current scroll position
    const scrollY = window.scrollY;
    
    // Lock the scroll by setting the body overflow to hidden
    document.body.style.overflow = 'hidden';

    // Restore the scroll position on component unmount
    return () => {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, scrollY);
    };
  }, [])

  return (
    <div className="h-full w-full  bg-black bg-opacity-90 absolute z-20 ">
      <div className="h-auto w-[350px] mx-auto bg-white text-center z-20 border border-black relative top-8 rounded-xl">
        <img src={loginBanner} alt="login-banner" className="w-full p-1" />
        <div className="text-black">
          <h5>
            Login <span>or</span> Signup
          </h5>
          <p>Get Exciting Offers & Track Order</p>
        </div>
        <form className="m-2">
          <TextField
            className="m-2.5"
            fullWidth
            name="email"
            error={emailError}
            helperText={emailError}
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            required
            label="Email"
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="password"
            error={passwordError}
            helperText={passwordError}
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            required
            label="Password"
          />
          <br />
          <br />
          <button
            className="m-4 p-2 bg-black text-white w-7/12 rounded-lg hover:bg-blue-700 cursor-pointer"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
