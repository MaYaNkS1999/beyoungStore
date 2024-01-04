import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import Card from "./Card";

const Women=()=>{
    const [menItem,setMenItem]=useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async ()=>{
        const url=baseUrl+`/api/v1/ecommerce/clothes/products?filter={"gender":"Women"}`;
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
        <div>
            <div className="men-top-heading">
                <h1>FOR Women</h1>
            </div>
            <div className="category-card">
                {menItem.map(item=>{
                    return <Card item={item}/>
                })}
            </div>

        </div>
    )
}
export default Women;
