import React from 'react'
import Navbar from '../Navbar/Navbar'
import './cart.css'
import QuantityButton from './QuantityButton'

const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className='ListContainer'>
        <ListTile name="DATA" details="details here" price="599" />
        <ListTile name="DATA 2" details="details hfesf ere" price="5599" />
      </div>
    </div>
  )
}

export default Cart

const ListTile = (data) => {
  return (
    <div className='ListTile'>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <div className='ListImage'></div>
        <div className='details'>
          <div className='ListTitle'>{data.name}</div>
          <div className='ListDetails'>{data.details}</div>
          <div className='ListPrice'>{data.price}</div>
          <QuantityButton />
        </div>
      </div>
      <div className='deletebutton'></div>
    </div>
  )
}