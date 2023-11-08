import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { ref, get } from 'firebase/database';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  // Log the productId to the console
  console.log('Product ID:', productId);

  useEffect(() => {
    const productRef = ref(db, `products/${productId}`);

    get(productRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProduct(data);
        } else {
          console.log('Product not found.');
        }
      })
      .catch((error) => {
        console.error('Error getting product:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
