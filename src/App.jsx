import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="*" element={<>404 Page Not Found</>} />
      </Routes>
    </>
  );
};

export default App;
