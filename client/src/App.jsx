import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/layout/routes/Private";
import ForgotPass from "./pages/ForgotPass";
import AdminDash from "./pages/admin/AdminDash";
import AdminRoute from "./components/layout/routes/AdminRoute";
import CreateCetegory from "./pages/admin/CreateCetegory";
import CreateProduct from "./pages/admin/CreateProduct";
import UserDetails from "./pages/admin/UserDetails";
import Orders from "./pages/admin/Orders";
import Profile from "./pages/user/Profile";
import 'antd/dist/reset.css'; 
import ProductPage from "./pages/admin/ProductPage";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";




function App() {
  return (
    <>
    <Routes>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
             <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/search" element={<Search />} />
            <Route path="/forgot-password" element={<ForgotPass/>}></Route>
            <Route path="/dashboard" element={<Private/>}>
            <Route path="user" element={<Dashboard/>}></Route> 
            <Route path="user/orders" element={<Orders/>}></Route> 
            <Route path="user/profile" element={<Profile/>}></Route> 
            </Route>
              <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDash/>}></Route>  
            <Route path="admin/category" element={<CreateCetegory/>}></Route>            
            <Route path="admin/products" element={<CreateProduct/>}></Route>
            <Route path="admin/product/:slug" element={<UpdateProduct/>}></Route>

            <Route path="admin/product" element={<ProductPage/>}></Route>
            <Route path="admin/users" element={<UserDetails/>}></Route>    
            <Route path="admin/orders" element={<Orders/>}></Route>            
            </Route>          
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/policy" element={<Policy/>}></Route>
            <Route path="/*" element={<PageNotFound/>}></Route>
    </Routes>
   
    </>
  );
}

export default App;
