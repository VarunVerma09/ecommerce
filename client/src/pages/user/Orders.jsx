import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  // Fetch user orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid dashboard">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2">
            <UserMenu />
          </div>

          {/* Orders Section */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Orders</h1>

            {orders?.length === 0 ? (
              <h5 className="text-center text-muted">No orders found</h5>
            ) : (
              orders.map((o, i) => (
                <div className="border shadow rounded mb-4 p-3" key={o._id}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{new Date(o?.createdAt).toLocaleDateString()}</td>
                        <td>{o?.payment?.success ? "✅ Success" : "❌ Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Products inside each order */}
                  <div className="container">
                    {o?.products?.map((p) => (
                      <div className="row mb-2 p-2 card flex-row align-items-center" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100"
                            height="100"
                          />
                        </div>
                        <div className="col-md-8">
                          <p className="mb-1 fw-bold">{p.name}</p>
                          <p className="mb-1 text-muted">{p.description?.substring(0, 50)}...</p>
                          <p className="mb-0">💰 Price: ₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
