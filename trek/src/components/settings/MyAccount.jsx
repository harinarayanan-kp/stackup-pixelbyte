import './account.css'
import React from 'react'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth';

const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
};

const MyAccount = () => {
    return (
        <div className='myaccount'>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default MyAccount
