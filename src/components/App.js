import "../styles/App.css";
import DualNavBar from "./DualNavBar";
import Main from "./Main";
import { createBrowserRouter,Outlet } from "react-router-dom";
import Men from "./Men";
import Women from "./Women";
import Jogger from "./Jogger";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import ProductSubcCategories from "./ProductSubcCategories";
import {Provider} from "react-redux";
import store from "../utils/redux/store";
import MyProfile from "./MyProfile";
import MyAccount from "./MyAccount";
import Order from "./Order";
import WishList from "./WishList";
import Error404 from "./Error404";

function App() {
  return <div className="App">
    <Provider store={store}>
    <DualNavBar/>
    <Outlet/>
    <Footer/>
    </Provider>
  </div>;
}

export const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Main/>
    },
    {
      path:"/myaccount",
      element:<MyAccount/>,
      children:[
        {
          path:"/myaccount/profile",
          element:<MyProfile/>
        },
        {
          path:"/myaccount/order",
          element:<Order/>
        },
        {
          path:"/myaccount/wishlist",
          element:<WishList/>
        }
      ]
    },
    {
      path:"/products/:subCategory",
      element:<ProductSubcCategories/>
    },
    {
      path:"/men",
      element:<Men/>
    },
    {
      path:"/women",
      element:<Women/>
    },
    {
      path:"/jogger",
      element:<Jogger/>
    },
    {
      path:"/product/:productId",
      element:<ProductDetail/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/error",
      element:<Error404/>
    }
  ]
  }

])

export default App;
