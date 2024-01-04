import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logoSVG from "../assets/Logo.svg";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const DualNavBar = () => {
  const baseDomain = "https://academics.newtonschool.co/";
  const [dropData, setDropData] = useState([]);
  const [isDropMenuVisible, setIsDropMenuVisible] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [isLoginClick,setIsLoginClick]=useState(false);
  const [isSignupClick,setIsSignupClick]=useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = baseDomain + "api/v1/ecommerce/clothes/categories";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        projectId: "fio1831j50s3",
      },
    });
    const json = await response.json();
    setDropData(json.data);
    // console.log(json);
  };

  const handleSearchClick = () => {
    setSearchClick(!searchClick);
  };

  const handleLoginClick=()=>{
    setIsLoginClick(!isLoginClick);
    setIsSignupClick(false);
  }

  const handleSignupClick= ()=>{
    setIsSignupClick(!isSignupClick);
    setIsLoginClick(false);
  }

  



  return (
    <div>
      <div className="bg-yellow-300 text-center">
      <span className="font-bold">Free Shipping on All Orders |</span> Get Extra ₹100 OFF on minimum
        purchase of ₹999{" "}

      </div>

      <div className="bg-black text-white flex justify-between text-right p-1">
        <div className="text-left ml-10 items-center">
          <LocationOnIcon/>
          TRACK YOUR ORDER
        </div>
        <div className="flex ">
        <div className="cursor-pointer" onClick={handleLoginClick}>LOG IN <span className="mx-2">|</span> </div>
        <div className="cursor-pointer mr-10" onClick={handleSignupClick}>SIGN UP</div>
        </div>
      </div>

      <div>
      {isLoginClick && <Login/>}
        {isSignupClick && <Signup/>}
        </div>

      <div className="flex justify-around">
        <Link to="/">
          <img src={logoSVG} alt="logo" className="p-1"/>
        {/* <h1 id="name">BEYOUNG</h1> */}
        </Link>
        <nav className="flex w-4/12 items-center my-auto h-full flex-nowrap justify-between list-none">
          <NavLink
            className="font-bold  cursor-pointer  hover:bg-yellow-500 "
            onMouseEnter={() => setIsDropMenuVisible(true)}
            onMouseLeave={() => setIsDropMenuVisible(false)}
            to="/men">
            Men
          </NavLink>
          <NavLink
            className="font-bold cursor-pointer  hover:bg-yellow-500 "
            onMouseEnter={() => setIsDropMenuVisible(true)}
            onMouseLeave={() => setIsDropMenuVisible(false)}
            to="/women"
          >
           Women
          </NavLink>
          <NavLink
            className="font-bold cursor-pointer  hover:bg-yellow-500 "
            onMouseEnter={() => setIsDropMenuVisible(true)}
            onMouseLeave={() => setIsDropMenuVisible(false)}
            to="/products/jogger"
          >
            Joggers 
          </NavLink>
        </nav>

        <div className="flex w-2/12 justify-between items-center" >
          <div className="cursor-pointer" onClick={handleSearchClick}><SearchIcon/></div>
          <div className="cursor-pointer"><FavoriteBorderIcon/></div>
          <div className="cursor-pointer"><ShoppingCartOutlinedIcon/></div>
          {searchClick && <SearchBar />}
        </div>
      </div>

      <div
        onMouseEnter={() => setIsDropMenuVisible(true)}
        onMouseLeave={() => setIsDropMenuVisible(false)}
      >
        {isDropMenuVisible && <DropDownMenu data={dropData} />}
      </div>
    </div>
  );
};
const DropDownMenu = ({ data }) => {
  return (
    <div className="w-5/12 bg-white left-1/4 absolute z-20">
      <div className="flex flex-wrap justify-around gap-4">
        {data.map((item, index) => (
           <Link to={`/products/${item}`} key={index} className="p-3 cursor-pointer hover:bg-yellow-200" >{item}</Link>
        ))}
      </div>
    </div>
  );
};
const SearchBar = () => {
  return (
    <div className="absolute w-96 p-3 flex flex-nowrap justify-between bg-white right-6 top-24 z-10">
      <input type="text" className="w-9/12 h-9 border-gray-400 border" placeholder="search here..."/>
      <button className="bg-black text-white  px-4 ">Search</button>
    </div>
  );
};
export default DualNavBar;

// chatgpt
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // Dummy authentication state (you would replace this with actual authentication logic)
// const isAuthenticated = true;

// function DualNavBar() {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // Dummy Project ID (replace this with the actual project ID)
//   const projectId = 'f104bi07c490';

//   useEffect(() => {
//     // Fetch categories from the API
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/ecommerce/clothes/categories`, {
//         headers: {
//           projectId: projectId,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch categories');
//       }

//       const data = await response.json();
//       // Extracting the required 13 categories
//       const selectedCategories = data.slice(0, 13);

//       setCategories(selectedCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error.message);
//     }
//   };

//   const toggleUserMenu = () => {
//     setShowUserMenu(!showUserMenu);
//   };

//   return (
//     <div>
//       {/* Top Navigation Bar */}
//       <div className="top-nav">
//         <div className="login-signup">
//           {isAuthenticated ? (
//             <div className="user-profile" onClick={toggleUserMenu}>
//               <span>User Icon</span>
//               {showUserMenu && (
//                 <div className="user-menu">
//                   <Link to="/wishlist">My Wishlist</Link>
//                   <Link to="/orders">My Orders</Link>
//                   <Link to="/logout">Logout</Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </div>
//       </div>

//       {/* Second Navigation Bar */}
//       <div className="second-nav">
//         <Link to="/">
//           <img src="beyoung-logo.png" alt="Beyoung Logo" />
//         </Link>

//         <div className="menu-items">
//           {/* Displaying categories in the dropdown menu */}
//           <div className="dropdown">
//             <button className="dropbtn">Categories</button>
//             <div className="dropdown-content">
//               {categories.map(category => (
//                 <Link key={category.id} to={`/category/${category.id}`}>
//                   {category.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <Link to="/men">Men</Link>
//           <Link to="/women">Women</Link>
//           <Link to="/routes">Routes</Link>
//         </div>

//         <div className="search-bar">{/* Implement search bar component */}</div>
//         <div className="my-cart">{/* Implement cart component */}</div>
//       </div>
//     </div>
//   );
// }

// export default DualNavBar;
