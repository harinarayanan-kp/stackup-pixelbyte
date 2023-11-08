import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './cart.css';
import QuantityButton from './QuantityButton';
import { db, auth } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Cart = () => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

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
    const fetchCartProducts = async () => {
      try {
        if (userId) {
          const userCartRef = doc(db, 'carts', userId);
          const productSnapshot = await getDoc(userCartRef);
          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            setCartItems(productData.products || []);
          } else {
            console.log('Cart not found for the user');
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartProducts();
  }, [userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = [];

      for (const productId of cartItems) {
        try {
          const productDocRef = doc(db, 'products', productId);
          const productSnapshot = await getDoc(productDocRef);
          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            productDetails.push(productData);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }

      setProducts(productDetails);
    };

    fetchProductDetails();
  }, [cartItems]);

  if (!userId) {
    return <div>PLEASE LOGIN TO CONTINUE</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='ListContainer'>
        {products.map((product, index) => (
          <ListTile key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;

const ListTile = ({ product }) => {
  // Assuming `product` contains product details
  return (
    <div className='ListTile'>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <div className='ListImage'></div>
        <div className='details'>
          <div className='ListTitle'>{product.Title}</div>
          <div className='ListDetails'>{product.Image}</div>
          <div className='ListPrice'>{product.Price}</div>
          <QuantityButton />
        </div>
      </div>
      <div className='deletebutton'></div>
    </div>
  );
};
