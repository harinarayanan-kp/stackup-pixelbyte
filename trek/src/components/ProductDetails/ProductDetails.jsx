import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../../config/firebase';
import { doc, getDoc, updateDoc, arrayUnion, setDoc, collection } from 'firebase/firestore';
import CartButton from '../HomeScreen/CartButton/CartButton';
import Navbar from '../Navbar/Navbar';
import './product.css'

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);

  console.log('Product ID:', productId);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId);
      } else {
        console.log('No user signed in');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDocRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDocRef);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          console.log(productData);
          setProduct(productData);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      // Check if the user has a cart document
      const cartDocRef = doc(db, 'carts', userId);
      const cartDocSnapshot = await getDoc(cartDocRef);

      if (cartDocSnapshot.exists()) {
        // If the cart document exists, update it
        await updateDoc(cartDocRef, {
          products: arrayUnion(productId)
        });
      } else {
        // If the cart document doesn't exist, create it
        const cartCollectionRef = collection(db, 'carts');
        await setDoc(doc(cartCollectionRef, userId), {
          products: [productId]
        });
      }
      console.log('Product added to cart:', product.Title);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="detailsmain" style={{
        display: 'flex',
      }}>
        <img alt='error loading img' style={{
          height: "300px",
          width: "500px",
          objectFit: "cover",
          margin: "20px",
        }} src={product.Image} />

        {newFunction(product, handleAddToCart)}

      </div>

      <CartButton />
    </div>
  );
};

export default ProductDetail;


function newFunction(product, handleAddToCart) {
  return <div className="" style={{
    display: "flex",
    flexDirection: "column",
    fontSize: "30px",
    fontWeight: "600"
  }}>


    <div className=''>{product.Title}</div>

    <div className='price'>Price: ₹{product.Price}</div>

    <div>Product Details</div>

    <button style={{
      height: "60px",
      borderRadius: "50px",
      backgroundColor: "#616161",
      color: "white",
      fontSize: "30px"
    }} className='addtocart' onClick={handleAddToCart}>Add to Cart</button>

  </div>;
}

