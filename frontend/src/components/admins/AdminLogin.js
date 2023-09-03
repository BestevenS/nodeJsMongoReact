import React, { useState, useContext, useEffect } from "react"; // προσθήκη της useEffect
import axiosInstance from "../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import ChairsImage from '../../assets/keys.jpg';
import './AdminRegisterLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      if (authContext.isAdmin) {
        navigate("/");
      } else {
        authContext.logout();
      }
    }
  }, [authContext, navigate]);

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/api/admin/login", { username, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);

        authContext.login(true);

        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className='background-image'>
      <img src={ChairsImage} className="hero-image" alt="Chairs" />
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="register-container">
            <h2 className='register-title'>Admin Login</h2>
            <input type="text" className="register-input" placeholder="Όνομα χρήστη" name="username" value={username} onChange={handleChange} />
            <input type="password" className="register-input" placeholder="Κωδικός" name="password" value={password} onChange={handleChange} />
            <input className="register-button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
