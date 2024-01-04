import { Link } from "react-router-dom";
const Card=({item})=>{
    return (
        <div className="w-2/12 border">
            <Link to={"/product/"+item._id}>
            <img src={item.displayImage} alt="image" className="w-full"/>
            </Link>
            <Link to={"/product/"+item._id}><h3>{item.name}</h3></Link>
            <h3>{item.color}</h3>
            <h3> ₹ {item.price}</h3>
        </div>
    )
}
export default Card;
