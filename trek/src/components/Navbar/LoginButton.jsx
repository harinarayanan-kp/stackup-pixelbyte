import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import profile from '../../images/profile.svg'
import like from '../../images/like.svg'
import search from '../../images/search.svg'
import './navbar.css'
import { auth } from '../../config/firebase';

const LoginButton = () => {
    
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
            <div style={{display: "flex", marginRight:"20px"}}>
                <Link to="/search">
                    <div className='searchbutton center'><img alt='' src={search}/></div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/login">
                    <div className='navbarend'>LOGIN</div>
                </Link>
                <Outlet />
            </div>
        );
    }
    else {
        return (
            <div style={{display: "flex",justifySelf: "flex-end", flexDirection:"row", justifyContent:"flex-end"}}>
                <Link to="/search">
                    <div className='searchbutton center'><img alt='' src={search}/></div>
                </Link>
                <Link to="/favourites">
                    <div className='favourites center'><img alt='' src={like}/></div>
                </Link>
                <Link to="/account">
                    <div className='myaccount'><img alt='' src={profile}/></div>
                </Link>
                <Outlet />
            </div>
        );
    }
}

export default LoginButton;
