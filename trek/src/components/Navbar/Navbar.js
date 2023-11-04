import React from 'react';
import logo from '../../images/Exclude.png';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <img className='logo' src={logo} alt="logo" />
      <div className='navbarcenter'>
        <button onClick={() => { console.log('Clicked Menu') }}>
          <h3>MEN</h3>
        </button>
        <button><h3>WOMEN</h3></button>
        <button><h3>KIDS</h3></button>
        <button><h3>SPORTS</h3></button>
      </div>
      <div className='navbarend' onClick={() => { console.log("clicked login")}}>LOGIN</div>
    </div>
  );
};

export default Navbar;