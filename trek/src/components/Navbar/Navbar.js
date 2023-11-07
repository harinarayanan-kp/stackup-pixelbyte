import React from 'react';
import logo from '../../images/Exclude.png';
import './navbar.css';
import { Outlet, Link } from "react-router-dom";

import LoginButton from './LoginButton';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <Link style={{ textDecoration: "none" }} to="/">
        <img className='logo' src={logo} alt="logo" />
      </Link>
      <Outlet />
      <div className='navbarcenter'>
        <button onClick={() => { console.log('Clicked Menu') }}>
          <h3>MEN</h3>
        </button>
        <button><h3>WOMEN</h3></button>
        <button><h3>KIDS</h3></button>
        <button><h3>SPORTS</h3></button>
      </div>
      <LoginButton />
    </div>
  );
};

export default Navbar;