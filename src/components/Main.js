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
