import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    authContext.logout();
    navigate('/');
  });

  return null;
}

export default Logout;
