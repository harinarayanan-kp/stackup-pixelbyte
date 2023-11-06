import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export let isSignedin = false;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } catch (error) {
      console.log(error);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={SignUp}>Login</button>
        <button type="button" onClick={SignInWithGoogle}>Sign in with Google</button>
        <button onClick={logout}>Logout</button>
      </form>
      {isSignedin && <p>You are signed in.</p>}
    </div>
  );
};

export default LoginPage;