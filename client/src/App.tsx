import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hone from "./pages/admin";
import Users from "./pages/users/Users";
import Roles from "./pages/admin/role/Roles";
import RoleCreate from "./pages/admin/role/RoleCreate";
import UserSideBar from "./components/sidebar/UserSideBar";
import RoleEdit from "./pages/admin/role/RoleEdit";
import TableTest from "./pages/admin/role/Table";
import UserEdit from "./pages/users/UserEdit";
import RegistrationForm from "./pages/register1";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Hone />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/roles" element={<Roles />} />
        <Route path="/admin/role/create" element={<RoleCreate />} />
        <Route path="/roles/:id/edit" element={<RoleEdit />} />
        <Route path="/tabletest" element={<TableTest />} />
        <Route path="/register1" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
