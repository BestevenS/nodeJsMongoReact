import React from 'react';
import useAxiosInterceptor from './useAxiosInterceptor';

function AxiosInterceptorWrapper({ children }) {
    useAxiosInterceptor();
    return <>{children}</>;
}

export default AxiosInterceptorWrapper;
