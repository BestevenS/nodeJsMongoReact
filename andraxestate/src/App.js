import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import SearchPage from "./SearchPage";
import PropertyPage from "./PropertyPage";
import UserPage from "./UserPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/property" component={PropertyPage} />
        <Route path="/user" component={UserPage} />
      </Switch>
    </Router>
  );
}

export default App;
