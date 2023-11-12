import React, { useState } from 'react';
import logo from '../../images/Exclude.png';
import './navbar.css';
import { Outlet, Link } from 'react-router-dom';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [activeButton, setActiveButton] = useState('');

  const handleMenuToggle = (category) => {
    setActiveButton(category);
  };

  return (
    <div className="Navbar">
      <Link style={{ textDecoration: 'none' }} to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <Outlet />
      <div className="navbarcenter">
        <Link to="/list?category=men">
          <button
            className={activeButton === 'men' ? 'active' : ''}
            onClick={() => handleMenuToggle('men')}
          >
            <h3>MEN</h3>
          </button>
        </Link>

        <Link to="/list?category=women">
          <button
            className={activeButton === 'women' ? 'active' : ''}
            onClick={() => handleMenuToggle('women')}
          >
            <h3>WOMEN</h3>
          </button>
        </Link>

        <Link to="/list?category=kids">
          <button
            className={activeButton === 'kids' ? 'active' : ''}
            onClick={() => handleMenuToggle('kids')}
          >
            <h3>KIDS</h3>
          </button>
        </Link>
        <Link to="/list?category=sports">
          <button
            className={activeButton === 'sports' ? 'active' : ''}
            onClick={() => handleMenuToggle('sports')}
          >
            <h3>SPORTS</h3>
          </button>
        </Link>
      </div>
      <LoginButton />
    </div>
  );
};

export default Navbar;
