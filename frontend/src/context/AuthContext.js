import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
