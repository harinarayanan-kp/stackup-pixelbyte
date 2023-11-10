import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminDashboard = () => {

    const [newTitle, setNewTitle] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newImage, setNewImage] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const navigate = useNavigate();

    const productRef = collection(db, "products")
    const addProduct = async () => {
        try{

            await addDoc(productRef, {
                Title: newTitle,
                Image: newImage,
                Price: newPrice,
                Category: newCategory
            })
        }
        catch(err){
            console.log(err)
        }
    };

    const Logout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            ADMIN DASHBOARD

            <input
                name="title"
                placeholder="Title"
                onChange={(e) => setNewTitle(e.target.value)}
            ></input>
            <input
                name="category"
                placeholder="Category"
                onChange={(e) => setNewCategory(e.target.value)}
            ></input>
            <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={(e) => setNewPrice(Number(e.target.value))}
            ></input>
            <input
                name="imageLink"
                placeholder="Image Link"
                onChange={(e) => setNewImage(e.target.value)}
            ></input>

            <button onClick={addProduct}>Add Product</button>
            <button className="buttonlogout" onClick={Logout}>
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;
