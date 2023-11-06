import React from 'react'
import Navbar from '../Navbar/Navbar'
import List from '../listwindow/list'
import HomeSlide from './slide/HomeSlide'

import './home.css'

const HomeScreen = () => {
    return (
        <>
            <Navbar />
            <HomeMain />
            <List />
        </>
    )
}

export default HomeScreen

const HomeMain = () => {
    return (
        <div className='homemain'>
            <HomeSlide />
            {newFunction()}
        </div>
    )
}
function newFunction() {
    return (<div className='sample'>
        {newFunction_1()}
        {newFunction_1()}
        </div>)
}

function newFunction_1() {
    return <div className='mainlist scrollable-content'>
        <div className='listitem'></div>
        <div className='listitem'></div>
        <div className='listitem'></div>
        <div className='listitem'></div>
        <div className='listitem'></div>
    </div>
}