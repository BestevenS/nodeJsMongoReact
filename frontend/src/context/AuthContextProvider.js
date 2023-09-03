import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../axios/axiosConfig';
import AuthContext from './AuthContext';

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  useEffect(() => {
    const storedAuthInfo = JSON.parse(localStorage.getItem('authInfo'));

    if (storedAuthInfo) {
      setIsAuthenticated(storedAuthInfo.isAuthenticated);
      setIsAdmin(storedAuthInfo.isAdmin);
      setTokenExpiration(storedAuthInfo.tokenExpiration);
    }
  }, []);

  const logoutHandler = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setTokenExpiration(null);
    localStorage.removeItem('authInfo');
  }, []);  

  const refreshToken = useCallback(async () => {
    console.log('Refreshing token...');
    try {
      const response = await axiosInstance.post('/api/users/refresh-token');
      const { tokenExpiration } = response.data;

      setIsAuthenticated(true);
      setTokenExpiration(tokenExpiration);

      localStorage.setItem('authInfo', JSON.stringify({
        isAuthenticated: true,
        isAdmin,
        tokenExpiration
      }));
      console.log('Token refreshed!');
    } catch (err) {
      console.error('Error refreshing token:', err);
      logoutHandler(); // Add this line to logout when there is an error refreshing the token
    }
  }, [setIsAuthenticated, setTokenExpiration, isAdmin, logoutHandler]);

  useEffect(() => {
    const currentTime = Date.now() / 1000;

    if (tokenExpiration) {
      const timeToExpiration = tokenExpiration - currentTime;
      if (timeToExpiration > 0) {
        const timerId = setTimeout(refreshToken, (timeToExpiration - 30) * 1000);
        return () => {
          clearTimeout(timerId);
        };
      } else {
        logoutHandler();
      }
    }
  }, [tokenExpiration, refreshToken, logoutHandler]);

  const loginHandler = (isAdmin = false, expiration) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
    setTokenExpiration(expiration);
    localStorage.setItem('authInfo', JSON.stringify({
      isAuthenticated: true,
      isAdmin,
      tokenExpiration: expiration
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        isAdmin: isAdmin,
        login: loginHandler,
        logout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
