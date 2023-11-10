import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import HomeSlide from "./slide/HomeSlide";

import "./home.css";
import CartButton from "./CartButton/CartButton";
import Loader from "../loader/loader";
import AboutUs from "../AboutUs/AboutUs";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <HomeMain />
          <CartButton />
          <AboutUs />
        </div>
      )}
    </>
  );
};

export default HomeScreen;

const HomeMain = () => {
  return (
    <div className="homemain">
      <HomeSlide />
      <div className="mainlist scrollable-content">
        <CardProduct />
      </div>
    </div>
  );
};

const CardProduct = () => {
  const [productList, setProductList] = useState([]);
  const productCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProductList = async () => {
      try {
        const q = query(productCollectionRef, where("Category", "==", "sports"));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getProductList();
  });

  return (
    <div style={{ display: "flex" }} className="listtilecontainer">
      {productList.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="listcard"
        >
          <img style={{height: "50vh", objectFit: "cover"}} className="imgwrap" alt="img" src={product.Image}></img>
        </Link>
      ))}
    </div>
  );
};
