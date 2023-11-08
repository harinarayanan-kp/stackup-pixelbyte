import React, { useEffect, useState } from 'react';
import './list.css';
import { db } from '../../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom'; // Import useLocation

const List = () => {
    const [productList, setProductList] = useState([]);
    const location = useLocation(); // Use useLocation to get the current URL location

    useEffect(() => {
        const categoryFilter = new URLSearchParams(location.search).get('category'); // Get the 'category' parameter from the URL
        const productCollectionRef = collection(db, 'products');

        const getProductList = async () => {
            try {
                const q = query(productCollectionRef, where('Category', '==', categoryFilter));
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
    }, [location.search]);

    return (
        <div>
            <Navbar />
            {productList.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className='listcard'>
                    <img className='imgwrap' alt='img' src={product.Image}></img>
                    <div style={{ marginLeft: "10px" }}>
                        <h1>{product.Title}</h1>
                        <h1>{product.Price}</h1>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default List;
