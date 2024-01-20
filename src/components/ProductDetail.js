import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/constant";
import { Rating, Divider, LinearProgress } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { toast } from "react-toastify";
import { setCartLength } from "../utils/redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const isLogin = window.localStorage.getItem("isLogin");
  const [selectedQty, setSelectedQty] = useState(1);
  const [pinCode, setPinCode] = useState();
  const [showZipValidation, setShowZipValidation] = useState(false);
  const [isValidPinCode, setIsValidPincode] = useState();
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuyNow = () => {
    if (isLogin) {
      navigate("/cart/address");
    } else {
      toast.warning("Please LogIn");
    }
  };

  const fetchData = async () => {
    const url = baseUrl + `/api/v1/ecommerce/product/${productId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        projectId: "fio1831j50s3",
      },
    });
    const jsonData = await response.json();
    setProductDetail(jsonData.data);
  };
  const handleCheckClick = () => {
    setShowZipValidation(true);
    if (pinCode.length !== 6) {
      setIsValidPincode(false);
    } else {
      if (!isNaN(pinCode)) {
        setIsValidPincode(true);
      } else {
        setIsValidPincode(false);
      }
    }
  };
  const handleChangeInputBox = (e) => {
    setPinCode(e.target.value);
    setShowZipValidation(false);
  };

  const handleAddToCart = async () => {
    if (!isLogin) {
      toast.warning("Please Login");
    } else {
      const apiUrl = baseUrl + `/api/v1/ecommerce/cart/${productId}`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          projectId: "fio1831j50s3",
        },

        body: JSON.stringify({
          quantity: 1,
          size: "S",
        }),
      });
      const jsonData = await response.json();
      if (response.ok) {
        window.localStorage.setItem("cartLength", jsonData.results);
        dispatch(setCartLength(jsonData.results));
        toast.success("Item added to cart");
      }
    }
  };

  if (productDetail === null) return;

  return (
    <div className="w-10/12 m-auto my-8">
      <div className="flex justify-between flex-wrap">
        <div className="w-5/12">
          <img
            src={productDetail.displayImage}
            alt="product image"
            className="w-full"
          />
        </div>

        <div className="w-6/12">
          <div className="flex flex-col gap-3 py-3">
            <h1 className="text-3xl">{productDetail.name.toUpperCase()}</h1>
            <h3 className="text-gray-500 text-l">
              {productDetail.subCategory}
            </h3>
            <h3 className="font-bold text-xl">₹ {productDetail.price}</h3>
            <h3 className="text-gray-400 font-bold text-lg">
              Inclusive of All Taxes + Free Shipping
            </h3>

            <div className="flex gap-5">
              <Rating value={productDetail.ratings} readOnly />
              <p>{productDetail.ratings.toFixed(1)}</p>
            </div>
            <div>
              <DiscountIcon />
              <span>Extra ₹100 OFF on ₹999 (Code:BEYOUNG100)</span>
            </div>

            <p className="mt-8">SIZE</p>
            <div className="flex gap-3">
              {productDetail.size.map((item, index) => {
                return (
                  <div
                    className="h-8 w-8 rounded-full border border-gray-500 flex justify-center items-center p-1 cursor-pointer  hover:border-2 hover:border-black"
                    key={index}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="flex mt-1 items-center gap-2">
              <label htmlFor="quantity">QTY:</label>
              <select
                name="quantity"
                id="quantity"
                className="p-1 border border-gray-700"
                value={selectedQty}
                onChange={(e) => setSelectedQty(parseInt(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap justify-between mt-10 ">
              <button
                className="w-5/12 bg-teal-300 hover:bg-teal-400 rounded-lg py-5"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon /> Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-5/12 bg-amber-400 hover:bg-amber-500 rounded-lg"
              >
                <ShoppingCartCheckoutIcon /> Buy now
              </button>
            </div>

            <div className="mt-2 ">
              <h4 className="font-bold text-lg">DELIVERY OPTIONS</h4>
              <section className="border border-gray-400 p-2">
                <p>
                  Enter your Pincode to check the delivery time and free pick up
                  options
                </p>
                <div className="mt-2 w-6/12 flex justify-between border border-gray-300 p-1">
                  <input
                    type="text"
                    name="pincode"
                    className="focus:border-none focus:outline-none"
                    id="pincode"
                    value={pinCode}
                    onChange={handleChangeInputBox}
                    placeholder="Enter Pincode"
                  />{" "}
                  <button
                    className="text-teal-400 hover:text-teal-700"
                    onClick={handleCheckClick}
                  >
                    Check
                  </button>
                </div>
                {showZipValidation && (
                  <label>
                    {isValidPinCode ? (
                      <>
                        <CheckCircleIcon
                          sx={{ color: "green", width: "2rem" }}
                        />
                        Free delivery available at {pinCode}
                      </>
                    ) : (
                      <>
                        <CancelIcon sx={{ color: "red", width: "2rem" }} />
                        Invalid Pincode
                      </>
                    )}
                  </label>
                )}
                <label className="flex my-2">
                  <img
                    style={{ width: "2rem" }}
                    src="https://www.beyoung.in/desktop/images/product-details-2/cod.jpg"
                    alt="cod"
                  />
                  Cash On Delivery
                </label>
                <label className="flex my-2">
                  <img
                    style={{ width: "2rem" }}
                    src="https://www.beyoung.in/desktop/images/product-details-2/ship.jpg"
                    alt="cod"
                  />
                  Express Shipping
                </label>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-3xl font-medium mb-2">Product Details</h3>
        <div className="flex flex-wrap justify-between">
          <div className="w-4/12 bg-gray-200 p-3">
            <h5 className="text-xl font-medium mb-2">Product Description</h5>
          </div>
          <div className="w-4/12 bg-gray-200 p-3">
            <h5 className="text-xl font-medium mb-2">Product Highlights</h5>
            <ul className="list-disc p-4">
              <li>
                100% Bio-washed Cotton - makes the fabric extra soft & silky
              </li>
              <li>Precisely stitched with no pilling & no fading</li>
              <li>Provide all-time comfort. Anytime, anywhere</li>
              <li>
                Every cloth is tailored with regular fit over years of testing
              </li>
              <li>
                Elasticated Waistband - adjustable drawstring for better fitting
              </li>
              <li>
                Zero Pilling - absolutely no presence of fuzzballs on the fabric
              </li>
            </ul>
          </div>
          <div className="w-4/12 bg-gray-200 p-3">
            <h5 className="text-xl font-medium mb-2">
              Delivery & Return Policy
            </h5>
            <div className="collaps-content">
              We provide free shipping on all orders. Pay online to avoid
              charges of ₹50/product applicable on COD orders. The return or
              exchange can be done within 15 days after delivery. Every delivery
              from Beyoung is processed under excellent condition and in the
              fastest time possible. For our beloved customer's care, we give
              contactless delivery. Refer to FAQ for more information.
            </div>
          </div>
        </div>
      </div>

      <div className="my-20">
        <h3 className="text-3xl font-medium mb-2">Rating & Review</h3>
        <div className="flex p-10 bg-gray-200 gap-10">
          <div className="p-16 bg-black text-amber-400 flex flex-col gap-6  items-center w-4/12">
            <h3 className="text-5xl font-bold">
              {productDetail.ratings.toFixed(1)}
            </h3>
            <Rating value={productDetail.ratings} />
            <p className="text-2xl font-bold">
              Based on 31K+ ratings and 9K+ reviews
            </p>
          </div>
          <div className="w-6/12">
            <h4 className="border-b-amber-300 border-b-4 text-3xl font-bold ">
              Product reviews
            </h4>
            <p className="my-10">
              <ThumbUpIcon className="mr-4" />
              91% of customers recommend this brand
            </p>
            <Divider sx={{ marginBottom: "2rem" }} />
            <div className="flex gap-4 items-center pr-8 ">
              <span>5</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={80}
              />
              <span>80+</span>{" "}
            </div>
            <div className="flex gap-4 items-center pr-8 ">
              <span>4</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={10}
              />
              <span>10+</span>{" "}
            </div>
            <div className="flex gap-4 items-center pr-8 ">
              <span>3</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={7}
              />{" "}
              <span>7+</span>
            </div>
            <div className="flex gap-4 items-center pr-8 ">
              <span>2</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={3}
              />{" "}
              <span>3+</span>
            </div>
            <div className="flex gap-4 items-center pr-8 ">
              <span>1</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={1}
              />{" "}
              <span>1+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <ul className="flex">
          <li className="flex flex-col items-center">
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon1.jpg"
              alt="1.5M+ Happy Beyoungsters"
            />
            <p>1.5M+ Happy Beyoungsters</p>
          </li>
          <li className="flex flex-col items-center">
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon2.jpg"
              alt="15 Days Easy Returns"
            />
            <p>15 Days Easy Returns</p>
          </li>
          <li className="flex flex-col items-center">
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon3.jpg"
              alt="Homegrown Brand"
            />
            <p>Homegrown Brand</p>
          </li>
          <li className="flex flex-col items-center">
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon4.jpg"
              alt="Packed with Safety"
            />
            <p>Packed with Safety</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
