import { useEffect, useState } from "react";
import Footer from "./Footer";
import { baseUrl } from "../utils/constant";
import Card from "./Card";
import HeroComponent from "./HeroComponent";
import Categories from "./Categories";
import fashionBetter from "../assets/fashionbetter.jpg"

const Main = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
      const url = baseUrl + `/api/v1/ecommerce/clothes/products?limit=50`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          projectId: "fio1831j50s3",
        },
      });
      const json = await response.json();
      setCategory(json.data);
      console.log(json.data);
  };

  return (
    <div className="mt-2 ">
      <HeroComponent />
      <div className="w-10/12 m-auto">
      <Categories/>
      <img src={fashionBetter} alt="Fashion-better" className="w-full my-4" />

      <div className="flex flex-wrap gap-3 justify-around ">

        {category.map((item) => {
          return <Card item={item} key={item._id} />;
        })}
      </div>
      </div>
    </div>
  );
};
export default Main;

// for infinite scroll

// import React, { useState, useRef, useEffect } from 'react';

// const Main = () => {
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const loadingRef = useRef(null);
//   const loading = useRef(false);

//   const fetchMoreItems = async () => {
//     if (loading.current) return;

//     try {
//       loading.current = true;

//       // Replace with your API endpoint
//       const apiUrl = baseUrl+`/api/v1/ecommerce/clothes/products?limit=50&page=${page + 1}`;
//       const response = await fetch(apiUrl);
//       const newData = await response.json();

//       setItems((prevItems) => [...prevItems, ...newData.data]);
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error('Error fetching more items:', error);
//     } finally {
//       loading.current = false;
//     }
//   };

//   const handleIntersection = (entries) => {
//     const [entry] = entries;
//     if (entry.isIntersecting) {
//       fetchMoreItems();
//     }
//   };

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.1,
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);

//     if (loadingRef.current) {
//       observer.observe(loadingRef.current);
//     }

//     return () => {
//       if (loadingRef.current) {
//         observer.unobserve(loadingRef.current);
//       }
//     };
//   }, [loadingRef, fetchMoreItems]);

//   useEffect(() => {
//     // Initial load
//     fetchMoreItems();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <div>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//       <div ref={loadingRef} style={{ height: '10px', background: 'transparent' }}></div>
//     </div>
//   );
// };

// export default Main;
