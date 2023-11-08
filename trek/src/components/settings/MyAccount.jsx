import './account.css'
import React from 'react'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



const MyAccount = () => {
    
    const navigate = useNavigate();

    const Logout = async () => {

        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='myaccount'>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default MyAccount
