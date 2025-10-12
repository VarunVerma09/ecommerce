import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";


function AdminDash() {
  return (
    <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-10 p-2 ">
            
           
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDash;
