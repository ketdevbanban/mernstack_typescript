import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hone from "./pages/admin";
import Users from "./pages/users/Users";
import AllRoles from "./pages/admin/role";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Hone/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin/roles" element={<AllRoles/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;