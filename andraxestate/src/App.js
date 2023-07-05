import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./SearchPage";
import PropertyPage from "./PropertyPage";
import UserPage from "./UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
