import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <ul className="contact-list">
                        <li><i className="fab fa-facebook-f"></i>
                            <a href='https://www.facebook.com/profile.php?id=100093551024329'
                                target="_blank" rel="noopener noreferrer">
                                facebook
                            </a>
                        </li>
                        <li><i className="fas fa-phone"></i> +30 6909608769</li>
                        <li><i className="fas fa-envelope"></i>
                            <a href="mailto:adraxestate@gmail.com">
                                adraxestate@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 AndraxEstate. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
