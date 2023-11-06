import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <div>
            <Link to="/login">
                <div className='navbarend' onClick={() => { console.log("clicked login") }}>LOGIN</div>
            </Link>
            <Outlet />
        </div>
    );
}

export default LoginButton;
