import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Navbar.css';
import 'font-awesome/css/font-awesome.min.css';  // Προσθήκη των styles του Font Awesome
import logo from '../../assets/logo.png';  // Υποθέτοντας ότι η logo.png βρίσκεται στον ίδιο φάκελο με το AuthContext


const Navbar = () => {
    const authContext = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [language, setLanguage] = useState('en'); // en για αγγλικά, gr για ελληνικά

    const changeLanguage = (lang) => {
        setLanguage(lang);
        // Εδώ μπορείτε να προσθέσετε κώδικα για να αλλάξετε τη γλώσσα σε όλη την εφαρμογή,
        // π.χ. ενημέρωση των strings, ή χρήση ενός εργαλείου για i18n
    };
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                {!authContext.isAuthenticated ? (
                    <>
                        <img src={logo} className="brand-logo-logout" alt="Logo" to="/" />
                        <Link className="navbar-brand-logout" to="/">AndraxEstate</Link>
                    </>
                ) : (
                    <>
                        <img src={logo} className="brand-logo" alt="Logo" to="/" />
                        <Link className="navbar-brand" to="/">AndraxEstate</Link>
                    </>
                )}

                <div className="menu-toggle" onClick={toggleMenu}>
                    <i className="fa fa-bars"></i>
                </div>
                <ul className={`navbar-menu ${showMenu ? "show" : ""}`}>
                    <li className="navbar-item language-item">
                        <button onClick={() => changeLanguage('en')} className={`language-button ${language === 'en' ? 'active' : ''}`}>EN</button>
                        <button onClick={() => changeLanguage('el')} className={`language-button ${language === 'el' ? 'active' : ''}`}>EL</button>
                    </li>

                    <li className="navbar-item">
                        <Link className="navbar-link" to="/" onClick={closeMenu}><i className="fa fa-home"></i> Αρχική</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/properties" onClick={closeMenu}><i className="fa fa-building"></i> Ακίνητα</Link>  {/* Προσθήκη εικονιδίου */}
                    </li>
                    {!authContext.isAuthenticated ? (
                        <>
                            <li className="navbar-item">
                                <Link className="navbar-link" to="/user/register" onClick={closeMenu}><i className="fa fa-user-plus"></i> Εγγραφή</Link>  {/* Προσθήκη εικονιδίου */}
                            </li>
                            <li className="navbar-item">
                                <Link className="navbar-link" to="/user/login" onClick={closeMenu}><i className="fa fa-sign-in"></i> Σύνδεση</Link>  {/* Προσθήκη εικονιδίου */}
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="logout-container">
                                <Link className="navbar-link logout-link" to="/logout" onClick={closeMenu}><i className="fa fa-sign-out"></i> Αποσύνδεση</Link>  {/* Προσθήκη εικονιδίου */}
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
