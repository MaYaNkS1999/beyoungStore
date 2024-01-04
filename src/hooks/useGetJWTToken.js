import { useEffect, useState } from "react"
import {baseUrl,projectId} from "../utils/constant";

const useGetJWTToken = (userinfo)=>{
    const [jwtToken,setJwtToken]=useState();

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
        const apiUrl=baseUrl+"/api/v1/user/signup";
        const response=await fetch(apiUrl,{
            method:"POST",
            headers:{
                projectId:projectId,
            },
            body:userinfo
        });
        const jsonData=await response.json();
        console.log(jsonData);
    }

}

export default useGetJWTToken;