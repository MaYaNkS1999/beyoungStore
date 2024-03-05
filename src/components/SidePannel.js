import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { baseUrl } from "../utils/constant";
import { Link } from "react-router-dom";

const SidePannel = ({ handleMenuToggle }) => {
  const [value, setValue] = React.useState("one");
  const [data,setData]=useState([]);

  const fetchData = async () => {
    const apiUrl =
      baseUrl + "/api/v1/ecommerce/clothes/categories?filter={'gender':'MEN'}";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: "fio1831j50s3",
      },
    });
    const json = await response.json();
    setData(json.data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Save the current scroll position
    const scrollY = window.scrollY;
    
    // Lock the scroll by setting the body overflow to hidden
    document.body.style.overflow = 'hidden';

    // Restore the scroll position on component unmount
    return () => {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, scrollY);
    };
  }, [])

  return (
    <div className="h-full w-[80%] absolute top-0 left-0 bg-white z-50">
      <CloseIcon
        sx={{
          position: "absolute",
          fontSize: "40px",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          handleMenuToggle();
        }}
      />
      <h1 className="bg-yellow-400 font-bold text-3xl py-4 flex justify-center">
        BEYOUNG
      </h1>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="MEN" className="w-1/2" />
          <Tab value="two" label="WOMEN" className="w-1/2" />
        </Tabs>
      </Box>
      <div className="flex flex-col">
      {data.map((item, index) => (
          <Link
            to={`/products/${item}`}
            key={index}
            className="p-2 cursor-pointer hover:bg-yellow-200"
            onClick={() => {
                handleMenuToggle();
              }}
          >
            {item[0].toUpperCase()+item.slice(1)}
          </Link>
        ))}
        </div>
    </div>
  );
};

export default SidePannel;
