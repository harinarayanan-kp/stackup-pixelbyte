import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import './navbar.css'
import { auth } from '../../config/firebase';

const LoginButton = () => {
        
    //change login button if user logged in or not in home page
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!isLoggedIn) {
        return (
            <div>
                <Link style={{ textDecoration: "none" }} to="/login">
                    <div className='navbarend'>LOGIN</div>
                </Link>
                <Outlet />
            </div>
        );
    }
    else {
        return (
            <div>
                <Link style={{ textDecoration: "none" }} to="/account">
                    <div className='navbarend'>MY ACCOUNT</div>
                </Link>
                <Outlet />
            </div>
        );
    }
}

export default LoginButton;
