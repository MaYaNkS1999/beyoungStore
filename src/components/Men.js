import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import Card from "./Card";
import _debounce from "lodash/debounce";

const Men = () => {
  const [menItem, setMenItem] = useState([]);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url =
      baseUrl +
      `/api/v1/ecommerce/clothes/products?limit=10&page=${page}&filter={"gender":"Men"}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        projectId: "fio1831j50s3",
      },
    });
    const jsonData = await response.json();
    if (response.ok) {
      setMenItem((prevData) => [...prevData, ...jsonData.data]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-10/12 m-auto">
      <div className="w-full text-3xl my-4">
        <h1 className="">MEN</h1>
      </div>
      <div className="flex flex-wrap justify-around gap-3">
        {menItem.map((item) => {
          return <Card item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};
export default Men;
