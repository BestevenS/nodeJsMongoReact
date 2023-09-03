import Navbar                                       from './components/Navbar/Navbar';
import Home                                         from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes }   from 'react-router-dom';
import React                                        from 'react';

import UserRegister                                 from './components/users/UserRegister';
import UserProfile                                  from './components/users/UserProfile';
import UserLogin                                    from './components/users/UserLogin';

import AdminRegister                                from './components/admins/AdminRegister';
import AdminProfile                                 from './components/admins/AdminProfile';
import AdminLogin                                   from './components/admins/AdminLogin';
import Logout                                       from './components/Logout';

import PropertyList                                 from './components/properties/PropertiesList/PropertiesList';
import AddProperty                                  from './components/properties/AddProperty/AddProperty';
import PropertyDetails                              from './components/properties/PropertyDetails/PropertyDetails';
import PropertyEdit                                 from './components/properties/PropertyEdit/PropertyEdit';

function AppRouter() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/"                     element={<Home              />}     />
                
                <Route path="/user/register"        element={<UserRegister      />}     />
                <Route path="/user/login"           element={<UserLogin         />}     />
                <Route path="/user/profile"         element={<UserProfile       />}     />

                <Route path="/admin/register"       element={<AdminRegister     />}     />
                <Route path="/admin/login"          element={<AdminLogin        />}     />
                <Route path="/admin/profile"        element={<AdminProfile      />}     />

                <Route path="/properties"           element={<PropertyList      />}     />
                <Route path="/properties/:id"       element={<PropertyDetails   />}     />
                <Route path="/properties/:id/edit"  element={<PropertyEdit      />}     />
                <Route path="/add-property"         element={<AddProperty       />}     />


                <Route path="/logout"               element={<Logout            />}     />
            </Routes>
        </Router>
    );
}

export default AppRouter;
