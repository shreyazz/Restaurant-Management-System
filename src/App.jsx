import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="*" element={<>404 Page Not Found</>} />
      </Routes>
    </>
  );
};

export default App;
