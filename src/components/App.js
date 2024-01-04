import "../styles/App.css";
import DualNavBar from "./DualNavBar";
import Header from "./DualNavBar";
import Main from "./Main";
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import Men from "./Men";
import Women from "./Women";
import Jogger from "./Jogger";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import ProductSubcCategories from "./ProductSubcCategories";

function App() {
  return <div className="App">
    {/* <Header/> */}
    <DualNavBar/>
    <Outlet/>
    <Footer/>
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
    }
  ]
  }

])

export default App;
