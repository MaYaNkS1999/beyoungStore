import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useSelector,useDispatch} from "react-redux";
import { setIsLoginPopup } from "../utils/redux/authSlice";
import {toast} from "react-toastify"

const Card=({item})=>{
    const userInfo=useSelector(store=>store.user.userInfo);
    const isLogin=useSelector(store=>store.auth.isLogin);
    const dispatch=useDispatch();
    
    const handleAddToCart=()=>{
        if(!isLogin){
            toast.error("Please Log In");
          }else{
            console.log("handle item to cart");
          }
    }
    return (
        <div className="w-2/12 border p-2">
            <Link to={"/product/"+item._id}>
            <img src={item.displayImage} alt="image" className="w-full"/>
            </Link>
            <div className="flex justify-between">
            <Link to={"/product/"+item._id}><h3>{item.name}</h3></Link>
            <FavoriteBorderIcon className="m-2 bg-white cursor-pointer hover:text-red-600" onClick={handleAddToCart}/>
            </div>
            <h3>{item.color}</h3>
            <h3> ₹ {item.price}</h3>
        </div>
    )
}
export default Card;
