import React from 'react'
import './cardbutton.css'
import cart from '../../../images/cart-shopping-svgrepo-com.svg'
import { Outlet, Link } from "react-router-dom";

const CartButton = () => {
  return (
    <>
      <Link style={{ textDecoration: "none" }} to="/cart">
        <div className='mainnavbutton'>
          <img className='cartimage' src={cart} alt="cart" />
        </div>
      </Link>
      <Outlet />
    </>

  )
}

export default CartButton
