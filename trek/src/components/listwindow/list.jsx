import React, { useEffect, useState } from 'react'
import './list.css'
import { db } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom';

const List = () => {
    const [productList, setProductList] = useState([]);

    const productCollectionRef = collection(db, 'products');

    useEffect(() => {
        const getProductList = async () => {
            try {
                const data = await getDocs(productCollectionRef);
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

    // const generateProductURL = (productId) => `/product/${productId}`;
    
    return (
        <div>
            {productList.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className='listcard'>
                <img className='imgwrap' alt='img' src={product.Image}></img>
                <div style={{ marginLeft: "10px" }}>
                    <h1>
                        {product.Title}
                    </h1>
                    <h1>
                        {product.Price}
                    </h1>
                </div>
            </Link>
            ))}
        </div>
    )
}

export default List
