import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";

const Cart = () => {
  const { auth, setAuth } = useAuth();
  const [cart, setCart] = useCart([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    try {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Get Braintree token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      if (!instance) return toast.error("Payment gateway not ready");
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment Failed");
    }
  };

  return (
    <Layout>
      <div className="cart-page py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <h1 className="text-center mb-5">
            {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
          </h1>

          <div className="row">
            {/* Cart Items */}
            <div className="col-lg-7 mb-4">
              {cart.length ? (
                cart.map((p) => (
                  <div
                    key={p._id}
                    className="d-flex mb-4 p-3 shadow-sm rounded-3 bg-white align-items-center"
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h5>{p.name}</h5>
                      <p className="text-muted mb-1">{p.description.substring(0, 50)}...</p>
                      <p className="fw-bold">{p.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <AiFillWarning size={50} className="mb-3 text-warning" />
                  <h4>Your Cart is Empty</h4>
                </div>
              )}
            </div>

            {/* Cart Summary */}
            <div className="col-lg-5">
              <div className="p-4 shadow-sm rounded-3 bg-white">
                <h3 className="mb-4">Cart Summary</h3>
                <h5>Total Items: {cart.length}</h5>
                <h4 className="mb-4 fw-bold">Total: {totalPrice()}</h4>

                {/* Address */}
                {auth?.user?.address ? (
                  <div className="mb-3">
                    <h5>Shipping Address</h5>
                    <p>{auth.user.address}</p>
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={() => navigate("/dashboard/admin")}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-warning w-100 mb-3"
                    onClick={() =>
                      navigate("/login", { state: "/cart" })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}

                {/* Payment */}
                {clientToken && auth?.token && cart.length > 0 && auth?.user?.address && (
                  <>
                    <DropIn
                      options={{ authorization: clientToken, paypal: { flow: "vault" } }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
