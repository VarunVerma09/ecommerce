import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDash() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>

          {/* Main content */}
          <div className="col-md-10 p-4">
            <h2 className="mb-4">Admin Dashboard</h2>

            {auth?.user ? (
              <div className="card shadow-sm p-3">
                <h4>Welcome, {auth.user.name}</h4>
                <p>
                  <strong>Email:</strong> {auth.user.email}
                </p>
                <p>
                  <strong>Role:</strong> {auth.user.role === 1 ? "Admin" : "User"}
                </p>
                <p>
                  <strong>Token:</strong> {auth.token ? auth.token : "No token found"}
                </p>
              </div>
            ) : (
              <p>No user is logged in.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDash;
