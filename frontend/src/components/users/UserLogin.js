import React, { useContext, useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserRegisterLogin.css';
import ChairsImage from '../../assets/keys.jpg';

function UserLogin() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const login = async () => {
        if (!username || !password) {
            setMessage('Παρακαλούμε εισάγετε όνομα χρήστη και κωδικό.');
            setSuccess(false);
            return;
        }

        try {
            await axiosInstance.post('/api/users/login', { username, password });
            authContext.login();
            setMessage('Επιτυχής σύνδεση!'); // Προσθήκη μηνύματος επιτυχίας
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Προέκυψε σφάλμα κατά τη σύνδεση. Παρακαλούμε προσπαθήστε ξανά.');
            }
            setSuccess(false);
        }
    }

    return (
        <div className='background-image'>
            <img src={ChairsImage} className="hero-image" alt="Chairs" />
            <div className="register-container">
                <h2 className='register-title'>Σελίδα Σύνδεσης</h2>
                <input type="text" className="register-input" placeholder="Όνομα χρήστη" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="register-input" placeholder="Κωδικός" onChange={(e) => setPassword(e.target.value)} />
                <button className="register-button" onClick={login}>Σύνδεση</button>
                {message && <div className={`register-message ${success ? 'success' : ''}`}>{message}</div>}
            </div>
        </div>
    );
}

export default UserLogin;
