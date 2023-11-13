import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import HomeSlide from "./HomeSlide";
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
          {/* <MouseFollower/> */}
        </div>
      )}
    </>
  );
};

export default HomeScreen;

const HomeMain = () => {
  return (
    <div className="homemain">
      <HomeSlide className= "ogiyfcsj"/>
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
        const q = query(
          productCollectionRef,
          where("Category", "==", "sports")
        );
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
  }, [productCollectionRef]);

  return (
    <div style={{ display: "flex" }} className="listtilecontainer">
      {productList.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="listcard"
        >
          <img
            style={{ height: "50vh", objectFit: "cover" }}
            className="imgwrap"
            alt="img"
            src={product.Image}
          ></img>
        </Link>
      ))}
    </div>
  );
};

// const MouseFollower = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//     className='mousetracker'
//       style={{
//         position: 'fixed',
//         left: position.x -15 + 'px',
//         top: position.y -15 + 'px',
//       }}
//     >
//     </div>
//   );
// };

