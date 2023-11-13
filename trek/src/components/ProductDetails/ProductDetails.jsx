import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../../config/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc, collection } from 'firebase/firestore';
import CartButton from '../HomeScreen/CartButton/CartButton';
import Navbar from '../Navbar/Navbar';
import './product.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

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

          // Check if the product is already liked by the user
          if (userId) {
            const likedProductsDocRef = doc(db, 'likedProducts', userId);
            const likedProductsDocSnapshot = await getDoc(likedProductsDocRef);
            if (likedProductsDocSnapshot.exists()) {
              const likedProductsData = likedProductsDocSnapshot.data();
              setIsLiked(likedProductsData.products.includes(productId));
            }
          }
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId, userId]);

  const handleAddToCart = async () => {
    try {
      const cartDocRef = doc(db, 'carts', userId);
      const cartDocSnapshot = await getDoc(cartDocRef);

      if (cartDocSnapshot.exists()) {
        await updateDoc(cartDocRef, {
          products: arrayUnion(productId),
        });
      } else {
        const cartCollectionRef = collection(db, 'carts');
        await setDoc(doc(cartCollectionRef, userId), {
          products: [productId],
        });
      }
      console.log('Product added to cart:', product.Title);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleToggleLike = async () => {
    try {
      const likedProductsDocRef = doc(db, 'likedProducts', userId);

      if (isLiked) {
        // If the product is liked, remove it from liked products
        await updateDoc(likedProductsDocRef, {
          products: arrayRemove(productId),
        });
      } else {
        // If the product is not liked, add it to liked products
        await updateDoc(likedProductsDocRef, {
          products: arrayUnion(productId),
        });
      }

      setIsLiked((prevIsLiked) => !prevIsLiked);
      console.log('Product toggled in liked products:', product.Title);
    } catch (error) {
      console.error('Error toggling product in liked products:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div
        className="detailsmain"
        style={{
          display: 'flex',
        }}
      >
        <img
          alt='error loading img'
          style={{
            height: '300px',
            width: '500px',
            objectFit: 'cover',
            margin: '20px',
          }}
          src={product.Image}
        />

        {newFunction(product, handleAddToCart, handleToggleLike, isLiked)}
      </div>

      <CartButton />
    </div>
  );
};

export default ProductDetail;

function newFunction(product, handleAddToCart, handleToggleLike, isLiked) {
  return (
    <div
      className=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '30px',
        fontWeight: '600',
      }}
    >
      <div className=''>{product.Title}</div>

      <div className='price'>Price: ₹{product.Price}</div>

      <div>Product Details</div>

      <button
        style={{
          height: '60px',
          borderRadius: '50px',
          backgroundColor: '#616161',
          color: 'white',
          fontSize: '30px',
        }}
        className='addtocart'
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      <button
        style={{
          height: '60px',
          borderRadius: '50px',
          backgroundColor: isLiked ? '#ff4081' : '#42a5f5',
          color: 'white',
          fontSize: '30px',
          marginTop: '20px',
        }}
        className='addtolikedproducts'
        onClick={handleToggleLike}
      >
        {isLiked ? 'Remove from Liked Products' : 'Add to Liked Products'}
      </button>
    </div>
  );
}
