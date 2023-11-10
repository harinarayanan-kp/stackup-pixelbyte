import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './cart.css';
import QuantityButton from './QuantityButton';

import { db, auth } from '../../config/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import Loader from '../loader/loader';

const Cart = () => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
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
            setCartItems([]);
          }
        }
      } catch (error) {
        setError('Error fetching cart');
      } finally {
        setLoading(false);
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
            productDetails.push({ id: productId, ...productData });
          }
        } catch (error) {
          setError('Error fetching product');
        }
      }

      setProducts(productDetails);
    };

    fetchProductDetails();
  }, [cartItems]);

  const removeFromCart = async (productId) => {
    try {
      const userCartRef = doc(db, 'carts', userId);
      const productSnapshot = await getDoc(userCartRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        const updatedProducts = productData.products.filter((id) => id !== productId);
        await setDoc(userCartRef, {
          products: updatedProducts,
        });

        setCartItems(updatedProducts);
      }
    } catch (error) {
      setError('Error removing product from cart');
    }
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userId) {
    return ( <div className=""><Navbar/><div className='center'>PLEASE LOGIN TO CONTINUE</div></div> );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Navbar />
      <div className='ListContainer'>
        {products.map((product, index) => (
          <ListTile
            key={index}
            product={product}
            onRemoveFromCart={() => removeFromCart(product.id)}
          />
        ))}
      </div>
      <button className="submit">Proceed to CheckOut</button>
    </div>
  );
};

const ListTile = ({ product, onRemoveFromCart }) => {
  return (
    <div className='ListTile'>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <img alt='' src={product.Image} className='ListImage' />
        <div className='details'>
          <div className='ListTitle'>{product.Title}</div>
          <div className='ListPrice'>₹{product.Price}</div>
          <QuantityButton />
        </div>
      </div>
      <button className='deletebutton' onClick={onRemoveFromCart}>
        <img className='deletebuttonicon' src='https://cdn-icons-png.flaticon.com/128/3405/3405244.png' alt='' />
      </button>
      
    </div>
  );
};

export default Cart;
