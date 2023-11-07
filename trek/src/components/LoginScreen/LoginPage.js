import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate  } from 'react-router-dom';
import './login.css'

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

  const SignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      <h1>Sign UP</h1>
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
        <button className='button pointer' type="button" onClick={SignUp}>Login</button>
        <>or</>
        <button className=' button pointer' type="button" onClick={SignInWithGoogle}>Sign in with Google</button>
    </section>
  );
};

export default LoginPage;