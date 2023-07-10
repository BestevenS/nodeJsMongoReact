import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import SearchPage from './components/Search/SearchPage';
import PropertyDetailsPage from './components/Property/PropertyDetailsPage';
import UserPage from './components/User/UserPage';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/property/:id" component={PropertyDetailsPage} />
        <Route path="/user/:id" component={UserPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
