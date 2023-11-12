import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";

const SearchScreen = () => {
  // const [query, setQuery] = useState("");
  // const productId = "0ExuOU9t6MhEFEIbSNGB";
  // const key = "nike";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     fetchProducts();
  //   }
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const productSnapshot = await getDocs(productsCollectionRef);
        // console.log(productSnapshot)
        const products = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(products);

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
    <div>
      <Navbar />
      <div>SearchScreen</div>
      <input
        type="text"
        placeholder="Search by product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchScreen;
