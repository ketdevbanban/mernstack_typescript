import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hone from "./pages/admin";
import Users from "./pages/users/Users";
import Roles from "./pages/admin/role/Roles";
import RoleCreate from "./pages/admin/role/RoleCreate";
import RoleEdit from "./pages/admin/role/RoleEdit";
import TableTest from "./pages/admin/role/Table";
import UserEdit from "./pages/users/UserEdit";
import RegistrationForm from "./pages/register1";
import Products from "./pages/admin/product/Products";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductEdit from "./pages/admin/product/ProductEdit";
import ProvinceDistrictForm from "./pages/Province";
import Login1 from "./pages/login1";
import Reponsive from "./reponsive";

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
        <Route path="/register1" element={<RegistrationForm />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/create" element={<ProductCreate />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/province" element={<ProvinceDistrictForm />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="/reponsive" element={<Reponsive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
