import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import PropertyPage from "./components/PropertyPage";
import UserPage from "./components/UserPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/property" element={<PropertyPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
