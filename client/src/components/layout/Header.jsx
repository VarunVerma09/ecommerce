import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../SearchInput";
import useCategory from "../../hook/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const { auth, setAuth } = useAuth() || {};
  const [cart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 text-uppercase">
      <div className="container-fluid">
        {/* ---------- Brand ---------- */}
        <Link className="navbar-brand fs-2 fw-bolder" to="/">
          E-Commerce
        </Link>

        {/* ---------- Mobile Toggle ---------- */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* ---------- Nav Links ---------- */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* ---------- Search in Center ---------- */}
          <div className="mx-auto" style={{ maxWidth: "500px" }}>
            <SearchInput />
          </div>

          {/* ---------- Right Side Links ---------- */}
          <ul className="navbar-nav  mb-2 mb-lg-0 fs-5 fw-bold align-items-center gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
          
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/category/allcategory"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user/profile"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                      to="/login"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart {cart?.length}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
