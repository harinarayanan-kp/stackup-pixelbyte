import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
// import List from '../listwindow/list'
import HomeSlide from './slide/HomeSlide'

import './home.css'
import CartButton from './CartButton/CartButton'
import Loader from '../loader/loader'
import AboutUs from '../AboutUs/AboutUs'
// import MouseFollower from './MouseFollower/MouseFollower'

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            {isLoading ? (<Loader />) : (
                <div>
                    <Navbar />
                    <HomeMain />
                    <CartButton />
                    <AboutUs />
                </div>)}
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
    return (
        <div className='sample'>
            <div className='mainlist scrollable-content'>
                <div className='listitem'><img style={{ objectFit: "cover", height: "50vh" }} alt='' src='https://images.pexels.com/photos/1031955/pexels-photo-1031955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img></div>
                <div className='listitem'></div>
                <div className='listitem'></div>
                <div className='listitem'></div>
                <div className='listitem'></div>
            </div>
        </div>
        )
}