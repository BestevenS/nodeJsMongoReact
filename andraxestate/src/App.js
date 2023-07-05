import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import SearchPage from "./SearchPage";
// Προσθέστε άλλες εισαγωγές εδώ όταν δημιουργήσετε τις σελίδες

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
        {/* Προσθέστε άλλα routes εδώ όταν δημιουργήσετε τις σελίδες */}
      </Switch>
    </Router>
  );
}

export default App;
