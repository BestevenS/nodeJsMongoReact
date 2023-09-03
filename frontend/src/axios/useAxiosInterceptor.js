import { useContext, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => {
                console.log("Response received:", response);
                return response;
            },
            (error) => {
                console.log("Error received:", error);
                if (error.response && error.response.status === 401) {
                    console.log("401 detected. Logging out...");
                    authContext.logout();
                    navigate('/user/login');
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [authContext, navigate]);
    
};

export default useAxiosInterceptor;
