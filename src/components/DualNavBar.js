import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logoSVG from "../assets/Logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setIsLogin,
  setIsSignOut,
  setIsLoginPopup,
  setIsSignupPopup,
} from "../utils/redux/authSlice";
import { baseUrl } from "../utils/constant";
import {
  setIsWishList,
  setIsOrder,
  setIsProfile,
} from "../utils/redux/accountSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import Badge from "@mui/material/Badge";

const DualNavBar = () => {
  const [dropData, setDropData] = useState([]);
  const [isDropMenuVisible, setIsDropMenuVisible] = useState(false);
  const [searchClick, setSearchClick] = useState(false);

  const { isLoginPopup, isSignupPopup } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.auth.isLogin);
  const cartLength=useSelector(store=>store.cart.cartLength);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apiUrl = baseUrl + "/api/v1/ecommerce/clothes/categories";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: "fio1831j50s3",
      },
    });
    const json = await response.json();
    setDropData(json.data);
  };

  const handleSearchClick = () => {
    setSearchClick(!searchClick);
  };

  const handleLoginClick = () => {
    // setIsLoginClick(!isLoginClick);
  
    dispatch(setIsLoginPopup(!isLoginPopup));
    dispatch(setIsSignupPopup(false));
    // setIsSignupClick(false);
  };

  const handleSignupClick = () => {
    // setIsSignupClick(!isSignupClick);
    dispatch(setIsSignupPopup(!isSignupPopup));
    dispatch(setIsLoginPopup(false));
    // setIsLoginClick(false);
  };

  const handleLogout = () => {
    toast.success("Logout successfully");
    dispatch(setIsSignOut(false));
  };

  const handleWishListClick = () => {
    if (!isLogin) {
      dispatch(setIsLoginPopup(true));
      toast.error("Please Log In");
    } else {
      dispatch(setIsProfile(false));
      dispatch(setIsOrder(false));
      dispatch(setIsWishList(true));
      navigate("/myaccount/wishlist");
    }
  };

  const handleProfileClick = () => {
    dispatch(setIsProfile(true));
    dispatch(setIsOrder(false));
    dispatch(setIsWishList(false));
  };

  const handleCartClick = () => {
    if (!isLogin) {
      dispatch(setIsLoginPopup(true));
      toast.error("Please Log In");
    } else {
      navigate("/cart/cartitems");
    }
  };

  return (
    <div>
      <div className="bg-yellow-300 text-center">
        <span className="font-bold">Free Shipping on All Orders |</span> Get
        Extra ₹100 OFF on minimum purchase of ₹999{" "}
      </div>

      <div className="bg-black text-white flex justify-between text-right p-1">
        <div className="text-left ml-10 items-center">
          <LocationOnIcon />
          TRACK YOUR ORDER
        </div>
        {isLogin ? (
          <div className="flex ">
            <Link
              className="cursor-pointer"
              to="/myaccount/profile"
              onClick={handleProfileClick}
            >
              My Account <span className="mx-2">|</span>{" "}
            </Link>
            <div className="cursor-pointer mr-10" onClick={handleLogout}>
              Log Out
            </div>
          </div>
        ) : (
          <div className="flex ">
            <div className="cursor-pointer" onClick={handleLoginClick}>
              LOG IN <span className="mx-2">|</span>{" "}
            </div>
            <div className="cursor-pointer mr-10" onClick={handleSignupClick}>
              SIGN UP
            </div>
          </div>
        )}
      </div>

      <div>
        {isLoginPopup && <Login />}
        {isSignupPopup && <Signup />}
      </div>

      <div className="flex justify-around">
        <Link to="/">
          <img src={logoSVG} alt="logo" className="p-1" />
          {/* <h1 id="name">BEYOUNG</h1> */}
        </Link>
        <nav className="flex w-4/12 items-center  my-auto h-full flex-nowrap justify-between list-none">
          <NavLink
            className="font-bold  cursor-pointer p-4 hover:bg-yellow-500 "
            onMouseEnter={() => setIsDropMenuVisible(true)}
            onMouseLeave={() => setIsDropMenuVisible(false)}
            to="/men"
          >
            Men
          </NavLink>
          <NavLink
            className="font-bold cursor-pointer p-4 hover:bg-yellow-500 "
            onMouseEnter={() => setIsDropMenuVisible(true)}
            onMouseLeave={() => setIsDropMenuVisible(false)}
            to="/women"
          >
            Women
          </NavLink>
          <NavLink
            className="font-bold cursor-pointer p-4 hover:bg-yellow-500 "
            onMouseEnter={() => setIsDropMenuVisible(true)}
            onMouseLeave={() => setIsDropMenuVisible(false)}
            to="/products/jogger"
          >
            Joggers
          </NavLink>
        </nav>

        <div className="flex w-2/12 justify-between items-center">
          <div className="cursor-pointer" onClick={handleSearchClick}>
            <SearchIcon />
          </div>
          <div
            className="cursor-pointer"
            onClick={handleWishListClick}
          >
            <Badge badgeContent={0} color="secondary">
              <FavoriteBorderIcon />
            </Badge>
          </div>
          <div className="cursor-pointer" onClick={handleCartClick}>
            <Badge badgeContent={cartLength} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </div>
          {searchClick && <SearchBar />}
        </div>
      </div>

      <div
        onMouseEnter={() => setIsDropMenuVisible(true)}
        onMouseLeave={() => setIsDropMenuVisible(false)}
      >
        {isDropMenuVisible && <DropDownMenu data={dropData} />}
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
const DropDownMenu = ({ data }) => {
  return (
    <div className="w-5/12 bg-white left-1/4 absolute z-20">
      <div className="flex flex-wrap justify-around gap-4">
        {data.map((item, index) => (
          <Link
            to={`/products/${item}`}
            key={index}
            className="p-3 cursor-pointer hover:bg-yellow-200"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};
const SearchBar = () => {
  const inputValue = useRef(null);
  const navigate = useNavigate();
  const handleSearchClick = () => {
    const inputValueValue = inputValue.current.value;
    navigate(`/search/${inputValueValue}`);
  };

  return (
    <div className="absolute w-96 p-3 flex flex-nowrap justify-between bg-white right-6 top-24 z-10">
      <input
        type="text"
        ref={inputValue}
        className="w-9/12 h-9 border-gray-400 border p-2"
        placeholder="search here..."
      />
      <button
        onClick={handleSearchClick}
        className="bg-black text-white  px-4 "
      >
        Search
      </button>
    </div>
  );
};
export default DualNavBar;
