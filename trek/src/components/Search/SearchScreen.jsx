import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import CartButton from "../HomeScreen/CartButton/CartButton";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const productSnapshot = await getDocs(productsCollectionRef);
        const products = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (query.trim() !== "") {
          const filteredResults = products.filter((product) =>
            product.Title.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filteredResults);
        } else {
          setResults([]);
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Navbar />
      <input
        style={{
          height: "50px",
          borderRadius: "15px",
          border: "1px solid grey",
          fontSize: "20px",
          maxWidth: "600px",
          width: "80vw",
        }}
        type="text"
        placeholder="Search by product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((product, index) => (
          <ListTile key={index} product={product} />
        ))}
      </ul>
      <CartButton/>
    </div>
  );
};

export default SearchScreen;

const ListTile = ({ product }) => {
  return (
    <Link  to={`/product/${product.id}`} key={product.id}>
      <div className="ListTile">
        <div style={{ flexDirection: "row", display: "flex" }}>
          <img alt="" src={product.Image} className="ListImage" />
          <div className="details">
            <div className="ListTitle">{product.Title}</div>
            <div className="ListPrice">₹{product.Price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
