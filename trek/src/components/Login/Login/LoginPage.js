import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../../config/firebase'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate  } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import '../login.css'

export let isSignedin = false;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  


  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        isSignedin = true;
      } else {
        isSignedin = false;
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(auth?.currentUser?.email);

  const Login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');     
    } catch (error) {
      console.log(error);
      window.alert("INVALID E-MAIL");

    }
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="signup-container">
      <h1>LOGIN</h1>
          <input className='inputfield'
            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className='inputfield'
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button className='loginbutton pointer' type="button" onClick={Login}>Login</button>
        <Link to="/signup"> New User? Sign UP here.</Link><Outlet/>
        <>or</>
        <button className=' loginbutton pointer' type="button" onClick={SignInWithGoogle}>Sign in with Google</button>
    </section>
  );
};

export default LoginPage;