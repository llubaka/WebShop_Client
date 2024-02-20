import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div> Home </div>} />
        <Route path="/:id" element={<div>param</div>} />
        <Route index path="/hello" element={<div> Path </div>} />
        <Route path="*" element={<div> Else </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
