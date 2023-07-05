import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/property/:id" component={PropertyPage} />
        <Route path="/user" component={UserPage} />
        {/* μπορείτε να προσθέσετε περισσότερα routes εδώ */}
      </Switch>
    </Router>
  );
}

export default App;
