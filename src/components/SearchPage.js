import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import Card from "./Card";
import _debounce from "lodash/debounce";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchPage=()=>{
    const {inputValue}=useParams();
    const [searchItem,setSearchItem]=useState([]);
    const [page, setPage] = useState(1);

    const handleScroll = _debounce(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
    
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          fetchData();
        }
      }, 200);

      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [handleScroll]);

    useEffect(()=>{
        setSearchItem([]);
        setPage(0);
        fetchData();
    },[inputValue]);

    const fetchData=async ()=>{
        const url=baseUrl+`/api/v1/ecommerce/clothes/products?limit=10&page=${page}&filter={"subCategory":"${inputValue.toLowerCase()}"}`;
        const response=await fetch(url,{
            method:"GET",
            headers:{
                projectId: "fio1831j50s3",
            }
        });
        const jsonData=await response.json();
        if(response.ok){
            setSearchItem((prevData) => [...prevData, ...jsonData.data]);
        setPage((prevPage) =>  prevPage + 1);
        }
    }

    return searchItem.length === 0?(<div className="flex flex-col gap-4 justify-center items-center h-96">
        <div className="text-3xl font-bold ">No match found for {inputValue}</div>
        <Link to="/">
        <button className="font-bold text-2xl text-white bg-black rounded-lg p-4">Continue Shopping</button>
        </Link>
    </div>):(
        <div className="w-10/12 m-auto mb-4">
            <div className="w-full text-3xl my-4">
                <h1 className="">Search Result for {inputValue.toUpperCase()}</h1>
            </div>
            <div className="flex flex-wrap justify-around gap-3">
                {searchItem.map(item=>{
                    return <Card item={item} key={item._id}/>
                })}
            </div>

        </div>
    )
}
export default SearchPage;
