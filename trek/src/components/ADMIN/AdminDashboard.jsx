import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AdminDashboard = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newCategory, setNewCategory] = useState("");

  const navigate = useNavigate();
  const productRef = collection(db, "products");

  const handleFileChangeAndAddProduct = async (event) => {
    try {
      const file = event.target.files && event.target.files[0];
      if (!file) {
        console.error("No file selected.");
        return;
      }

      const storageRef = ref(storage, "images/" + file.name);
      await uploadBytes(storageRef, file);

      console.log("Image uploaded successfully!");

      const downloadURL = await getDownloadURL(storageRef);
    

      // Add product to Firestore
      await addDoc(productRef, {
        Image: downloadURL,
        Title: newTitle,
        Price: newPrice,
        Category: newCategory,
      });

      console.log("Product added to Firestore");
    } catch (error) {
      console.error("Error uploading image or adding product:", error.message);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      ADMIN DASHBOARD
      <input
        name="title"
        placeholder="Title"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        name="category"
        placeholder="Category"
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={(e) => setNewPrice(Number(e.target.value))}
      />
      <input type="file" onChange={handleFileChangeAndAddProduct} />
      <button onClick={handleFileChangeAndAddProduct}>Add Product</button>
      <button className="buttonlogout" onClick={Logout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
