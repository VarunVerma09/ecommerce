import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="min-vh-100 bg-dark text-white p-3 text-uppercase">
      <h4 className="text-center mb-4">Admin Panel</h4>
      <nav className="nav flex-column">
        <NavLink to="/dashboard/admin/category" className="nav-link text-light" activeclassname="active ">
          <i className="bi bi-tags me-2"></i> Category
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-people me-2"></i> Users
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-box-seam me-2"></i> Create Product 
        </NavLink>
         <NavLink to="/dashboard/admin/product" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-box-seam me-2"></i> Show Product 
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-basket me-2"></i> Orders
        </NavLink>
        <NavLink to="/dashboard/admin/settings" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-gear me-2"></i> Settings
        </NavLink>
        <NavLink to="/logout" className="nav-link text-light mt-3">
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminMenu;
