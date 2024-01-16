import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../utils/constant";
import Card from "./Card";
import _debounce from "lodash/debounce";

const ProductSubcCategories = () => {
  const { subCategory } = useParams();
  const [page, setPage] = useState(1);

  const [subCategoryItems, setSubCategoryItems] = useState([]);
  useEffect(() => {
    setSubCategoryItems([]);
    setPage(0);
    fetchData();
  }, [subCategory]);

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

  const fetchData = async () => {
    try {
      const apiUrl =
        baseUrl +
        `/api/v1/ecommerce/clothes/products?limit=10&page=${page}&filter={"subCategory":"${subCategory}"}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectId: "fio1831j50s3",
        },
      });
      const jsonData = await response.json();
      if(response.ok){
        setSubCategoryItems((prevData) => [...prevData, ...jsonData.data]);
        setPage((prevPage) =>  prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-10/12 m-auto ">
      <div className="w-full text-3xl my-4">{subCategory.toUpperCase()}</div>

      {/* <div className="flex justify-between my-4"> */}
        {/* <div className="w-3/12">
          <section className="w-full bg-gray-400 p-2 text-xl font-medium bg-opacity-15  border-b-black border-b ">
            Filters
          </section>
        </div> */}

        <div className="flex flex-wrap gap-3 justify-around">
          {subCategoryItems.map((item,index) => (
            <Card item={item} key={index} />
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export default ProductSubcCategories;
