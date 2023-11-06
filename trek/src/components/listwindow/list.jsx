import React, { useEffect, useState } from 'react'

import { db } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'

const List = () => {

    const [productList, setProductList] = useState([]);

    const productCollectionRef = collection(db, "products")

    useEffect(() => {
        const getProductList = async () => {
            try {
                const data = await getDocs(productCollectionRef);
                const filterdData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setProductList(filterdData);
            } catch (err) {
                console.error(err)
            }
        };
        getProductList();
    }, []);

    return (
        <div>
            LIST HERE
            {productList.map((product) => (
                <>
                <h1>
                    
                {product.Title}
                </h1>
                <h1>
                    
                {product.Price}
                </h1>
                </>
            ))}
        </div>
    )
}

export default List
