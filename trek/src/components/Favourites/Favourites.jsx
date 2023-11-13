import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { db, auth } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../loader/loader';

const Favourites = () => {
  const [userId, setUserId] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchLikedProducts = async () => {
      try {
        if (userId) {
          const userLikedProductsRef = doc(db, 'likedProducts', userId);
          const productSnapshot = await getDoc(userLikedProductsRef);
          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            setLikedProducts(productData.products || []);
          } else {
            console.log('Liked products not found for the user');
            setLikedProducts([]);
          }
        }
      } catch (error) {
        setError('Error fetching liked products');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = [];

      for (const productId of likedProducts) {
        try {
          const productDocRef = doc(db, 'products', productId);
          const productSnapshot = await getDoc(productDocRef);
          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            productDetails.push({ id: productId, ...productData });
          }
        } catch (error) {
          setError('Error fetching product');
        }
      }

      setProducts(productDetails);
    };

    fetchProductDetails();
  }, [likedProducts]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userId) {
    return (
      <div className="">
        <Navbar />
        <div style={{ height: "100vh" }} className='center'>
          PLEASE LOGIN TO CONTINUE
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <div className='ListContainer'>
        {products.map((product, index) => (
          <LikedProductsTile
            key={index}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

const LikedProductsTile = ({ product }) => {
  return (
    <div className='LikedProductsTile'>
      <img alt='' src={product.Image} className='ListImage' />
      <div className='details'>
        <div className='ListTitle'>{product.Title}</div>
        <div className='ListPrice'>₹{product.Price}</div>
      </div>
    </div>
  );
};

export default Favourites;
