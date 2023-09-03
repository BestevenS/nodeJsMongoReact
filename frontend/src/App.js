import React                    from 'react';
import AuthContextProvider      from './context/AuthContextProvider';
import Navbar                   from './components/Navbar/Navbar';
import AppRouter                from './Router';
import AxiosInterceptorWrapper  from './axios/AxiosInterceptorWrapper'; // Προσθήκη

function App() {
  
  return (
    <AuthContextProvider>
      <div className="App">
          <AppRouter>
            <AxiosInterceptorWrapper>
              <Navbar />
            </AxiosInterceptorWrapper>
          </AppRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
