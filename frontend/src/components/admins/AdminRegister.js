import React, { useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import ChairsImage from '../../assets/keys.jpg';
import './AdminRegisterLogin.css';

function AdminRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const register = async () => {
        try {
            const res = await axiosInstance.post('/api/admin/register', { username, password, email });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='background-image'>
            <img src={ChairsImage} className="hero-image" alt="Chairs" />
            <div className="register-container">
                <h2 className='register-title'>Admin Register Page</h2>
                <input type="text" className="register-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="register-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="email" className="register-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <button className="register-button" onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default AdminRegister;
