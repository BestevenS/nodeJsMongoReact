import React, { useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Χρησιμοποιώντας το useNavigate
import './UserRegisterLogin.css'
import ChairsImage from '../../assets/keys.jpg';

function UserRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // Προσθήκη νέας κατάστασης για το μήνυμα
    const [success, setSuccess] = useState(false); // Προσθήκη νέας κατάστασης για την επιτυχία της εγγραφής


    const navigate = useNavigate(); // Χρησιμοποιώντας το useNavigate

    const register = async () => {
        if (password !== confirmPassword) {
            setMessage('Οι κωδικοί δεν ταιριάζουν.');
            setSuccess(false);
            return;
        }

        if (password.length < 8) {
            setMessage('Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.');
            setSuccess(false);
            return;
        }

        if (!/\d/.test(password)) {
            setMessage('Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν αριθμό.');
            setSuccess(false);
            return;
        }

        if (!/[a-zA-Z]/.test(password)) {
            setMessage('Ο κωδικός πρέπει να περιέχει τουλάχιστον ένα γράμμα.');
            setSuccess(false);
            return;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            setMessage('Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν ειδικό χαρακτήρα.');
            setSuccess(false);
            return;
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setMessage('Παρακαλούμε εισάγετε ένα έγκυρο email.');
            setSuccess(false);
            return;
        }

        try {
            const res = await axiosInstance.post('/api/users/register', { username, password, email });
            if (res.status === 201) {
                setMessage('Επιτυχής εγγραφή!');
                setSuccess(true);
                setTimeout(() => {
                    navigate('/user/login');
                }, 2000);
            } else {
                setMessage(res.data.message);
                setSuccess(false);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Προέκυψε σφάλμα. Παρακαλούμε προσπαθήστε ξανά.');
            }
            setSuccess(false);
        }
    }


    return (
        <div className='background-image'>
            <img src={ChairsImage} className="hero-image" alt="Chairs" />
            <div className="register-container">
                <h2 className='register-title'>Σελίδα Εγγραφής</h2>
                <input type="text" className="register-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="register-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" className="register-input" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="email" className="register-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <button className="register-button" onClick={register}>Εγγραφή</button>
                {message && <div className={`register-message ${success ? 'success' : ''}`}>{message}</div>} {/* Προσθήκη πεδίου για την εμφάνιση του μηνύματος */}
            </div>
        </div>
    );
}

export default UserRegister;
