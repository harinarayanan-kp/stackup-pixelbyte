import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the specific product from Firebase based on the productId.
    const productRef = db.collection(`products/${productId}`);
    productRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setProduct(data);
    });

    // Unsubscribe from the Firebase database when the component unmounts.
    return () => {
      productRef.off();
    };
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