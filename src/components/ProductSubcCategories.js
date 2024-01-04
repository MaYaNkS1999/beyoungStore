import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../utils/constant";
import Card from "./Card";

const ProductSubcCategories = () => {
  const { subCategory } = useParams();

  const [subCategoryItems, setSubCategoryItems] = useState([]);
  console.log(subCategory);
  useEffect(() => {
    fetchData();
  }, [subCategory]);

  const fetchData = async () => {
    try {
      const apiUrl =
        baseUrl +
        `/api/v1/ecommerce/clothes/products?filter={"subCategory":"${subCategory}"}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectId: "fio1831j50s3",
        },
      });
      const jsonData = await response.json();
      setSubCategoryItems(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-10/12 m-auto ">
        <div className="w-full text-3xl my-4">{subCategory.toUpperCase()}
        </div>
        
      <div className="flex justify-between my-4">

        <div className="w-3/12">
            <section className="w-full bg-gray-400 p-2 text-xl font-medium bg-opacity-15  border-b-black border-b ">
                Filters
            </section>
            
        </div>

        <div className="flex flex-wrap w-8/12 gap-3">
          {subCategoryItems.map((item) => (
            <Card item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSubcCategories;

// import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

// import { baseUrl } from "../utils/constant";

// import Card from "./Card";

// const ProductSubcCategories = () => {
//   const { subCategory } = useParams();

//   const [subCategoryItems, setSubCategoryItems] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, [subCategory]); // Use subCategory directly in the dependency array

//   const fetchData = async () => {
//     try {
//       const apiUrl =
//         baseUrl +
//         `/api/v1/ecommerce/clothes/products?filter={"subCategory":"${subCategory}"}`;

//       const response = await fetch(apiUrl, {
//         method: "GET",

//         headers: {
//           projectId: "fio1831j50s3",
//         },
//       });

//       const jsonData = await response.json();

//       setSubCategoryItems(jsonData.data);

//       console.log(jsonData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-wrap w-10/12 m-auto gap-3">
//         {subCategoryItems.map((item) => (
//           <Card item={item} key={item._id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductSubcCategories;
