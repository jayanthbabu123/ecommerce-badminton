import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import Products from "./pages/Admin/Products/Products";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UserProducts from "./pages/User/Products/Products";
import UserDashboard from "./pages/User/UserDashboard/UserDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        // admin Routes
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-products" element={<Products />} />


        // user Routes
         <Route path="/user-dashboard" element={<UserDashboard user={user} />} />
         <Route path="/user-products" element={<UserProducts user={user} />} />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
