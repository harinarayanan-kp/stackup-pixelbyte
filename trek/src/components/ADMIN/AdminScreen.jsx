import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './admin.css';

import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth';
import AdminDashboard from './AdminDashboard';

const AdminScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminLoggedin, setadminLoggedin] = useState(false);

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const adminEmail = "admin@example.com";
                if (user.email === adminEmail) {
                    console.log('Logged in as admin: ', user.email);
                    setadminLoggedin(true)
                } else {
                    console.log('You are not authorized as an admin.');
                    signOut(auth);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage, errorCode);
            });
    };
    if(adminLoggedin){
        return <AdminDashboard/>
    }
    else return (
        <div className='main' >
            <div className="">ADMIN AUTHENTICATION</div>
            <input
                className='formfield'
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='formfield'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='formfield' onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminScreen;
