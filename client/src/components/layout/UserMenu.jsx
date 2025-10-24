import React from 'react'
import { NavLink } from 'react-router'

function UserMenu() {
  return (
    <div className="min-vh-100 bg-dark text-white p-3 text-uppercase">
      <h4 className="text-center mb-4">User Details</h4>
      <nav className="nav flex-column">
        <NavLink to="/dashboard/user/profile" className="nav-link text-light" activeclassname="active ">
          <i className="bi bi-tags me-2"></i> Profile
        </NavLink>
        <NavLink to="/dashboard/user/orderss" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-people me-2"></i> Orders
        </NavLink>
          <NavLink to="/logout" className="nav-link text-light" activeclassname="active">
          <i className="bi bi-people me-2"></i> Logout
        </NavLink>
       
      </nav>
    </div>
  )
}

export default UserMenu