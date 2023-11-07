import React, { useEffect, useState } from 'react'
import './product.css'
import { db } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'

const ProductDetails = () => {
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

    return (
        <div>
            {productList.map((product) => (
                <div className='listcard'>
                        <img className='imgwrap' src={product.Image}></img>
                    <h1>
                        {product.Title}
                    </h1>
                    <h1>
                        {product.Price}
                    </h1>
                </div>
            ))}
        </div>
    )
}

export default ProductDetails
