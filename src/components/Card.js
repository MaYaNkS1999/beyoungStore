import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoginPopup } from "../utils/redux/authSlice";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/constant";

const Card = ({ item }) => {
  const userInfo = useSelector((store) => store.user.userInfo);
  const isLogin = useSelector((store) => store.auth.isLogin);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");

  const handleAddToWishlist = async () => {
    if (!isLogin) {
      toast.error("Please Log In");
    } else {
      const apiUrl = baseUrl + `/api/v1/ecommerce/wishlist`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "projectId": "fio1831j50s3",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId:`${item._id}`
        }),
      });
      const jsonData = await response.json();
      if(response.ok){
        toast.success("Item is added to wishlist");
      }
    }
  };

  return (
    <div className="w-[300px] mb-2">
      <Link to={"/product/" + item._id}>
        <img src={item.displayImage} alt="image" className="w-full rounded-lg" />
      </Link>
      <div className="flex justify-between">
        <Link to={"/product/" + item._id}>
          <h3>{item.name}</h3>
        </Link>
        <FavoriteBorderIcon
          className="m-2 bg-white cursor-pointer hover:text-red-600"
          onClick={handleAddToWishlist}
        />
      </div>
      <h3>{item.color}</h3>
      <h3 className="font-bold"> ₹ {item.price}</h3>
    </div>
  );
};
export default Card;
