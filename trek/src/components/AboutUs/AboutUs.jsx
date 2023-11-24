import React from 'react'
import { Link } from 'react-router-dom'

const Giticon = () => {
    return (
        <Link
            style={{
                height: "50px",
                width: "50px",
                borderRadius: "25px",
                color: "white",
                objectFit: "cover",
            }}
            to={'https://github.com/harinarayanan-kp/stackup-pixelbyte'}>
            <img style={{ height: "50px" }} alt='' src='https://cdn-icons-png.flaticon.com/128/3291/3291695.png' /></Link>

    )
}

const AboutUs = () => {
    return (
        <div style={{
            marginTop: "100px",
            height: "100px",
            backgroundColor: "#36444C",
            color: "#CAC788"
        }} className='center'>

            <Giticon />

        </div>
    )
}

export default AboutUs