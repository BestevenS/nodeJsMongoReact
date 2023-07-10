import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import SearchPage from './components/Search/SearchPage';
import PropertyDetailsPage from './components/Property/PropertyPage';
import UserPage from './components/User/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/property/:id" component={PropertyDetailsPage} />
        <Route path="/user/:id" component={UserPage} />
      </Routes>
    </Router>
  );
}

export default App;
