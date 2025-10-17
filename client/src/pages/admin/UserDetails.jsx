import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";

function UserDetails() {
  const [user, setUser] = useState([]);

  const api = async () => {
    const data = await axios
      .get("http://localhost:8080/api/v1/auth/all-users")
      .then((res) => {
        const userData = res.data.allUser;
        setUser(userData);
        console.log(userData);
      });
  };
  useEffect(() => {
    api();
  }, []);

  return (
    <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-10 p-3 ">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>

                </tr>
              </thead>
              <tbody>
                {user .filter((u) => u.role !== 1).map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserDetails;
