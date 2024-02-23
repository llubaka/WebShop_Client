import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<div>param</div>} />
        <Route index path="/hello" element={<div> Path </div>} />
        <Route path="*" element={<div> Else </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
