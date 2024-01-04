import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import Card from "./Card";

const Men=()=>{
    const [menItem,setMenItem]=useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async ()=>{
        const url=baseUrl+`/api/v1/ecommerce/clothes/products?filter={"gender":"Men"}`;
        const response=await fetch(url,{
            method:"GET",
            headers:{
                projectId: "fio1831j50s3",
            }
        });
        const jsonData=await response.json();
        console.log(jsonData);
        setMenItem(jsonData.data);


    }

    return (
        <div className="">
            <div className="ml-">
                <h1 className="">MEN</h1>
            </div>
            <div className="flex flex-wrap justify-around gap-3">
                {menItem.map(item=>{
                    return <Card item={item}/>
                })}
            </div>

        </div>
    )
}
export default Men;
