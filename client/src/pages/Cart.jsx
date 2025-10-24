import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = auth?.user;
  const token = auth?.token;

  // Calculate total price
  const totalPrice = () => {
    try {
      const total = cart.reduce((acc, item) => acc + Number(item.price), 0);
      return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    } catch (error) {
      console.error("Total price calculation error:", error);
      return "$0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Get Braintree client token
  const getToken = async () => {
    
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data.clientToken)
     
  };

  useEffect(() => {
     getToken();
  }, [auth?.token]);

  // Handle payment
const handlePayment = async () => {
  if (!instance) return alert("Payment gateway not ready");
  if (!user?.address) return toast.error("Please add your address first");

  try {
    setLoading(true);

    const paymentMethod = await instance.requestPaymentMethod();
    const nonce = paymentMethod.nonce;

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/product/braintree/payment",
      { nonce, cart },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data?.success) {
      toast.success("Payment completed successfully!");
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
    } else {
      toast.error(data?.message || "Payment failed. Try again.");
    }
  } catch (error) {
    console.error("Payment error:", error);
    toast.error(error?.response?.data?.message || "Payment failed. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Layout>
      <div className="cart-page py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <h1 className="text-center mb-5">
            {!user ? "Hello Guest" : `Hello ${user.name}`}
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
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h5>{p.name}</h5>
                      <p className="text-muted mb-1">
                        {p.description.substring(0, 50)}...
                      </p>
                      <p className="fw-bold">
                        {Number(p.price).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
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
                <h4 className="text-center text-muted">
                  Your cart is empty 🛒
                </h4>
              )}
            </div>

            {/* Cart Summary */}
            <div className="col-lg-5 cart-summary bg-white p-4 rounded-3 shadow-sm">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>

              {/* Address Section */}
              {user?.address ? (
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{user.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}

              {/* Payment Section */}
              {clientToken && token &&(
                <div className="mt-3">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(inst) => {
                      console.log("DropIn instance ready:", inst);
                      setInstance(inst);
                    }}
                  />
                  {/* Button enabled when DropIn instance is ready */}
                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePayment}
                   
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
