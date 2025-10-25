import React, { useEffect, useRef, useState } from "react";
import dropin from "braintree-web-drop-in";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Cart = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dropinRef = useRef(null);

  const user = auth?.user;
  const token = auth?.token;

  // ✅ Get Braintree Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.error("Token fetch error:", err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // ✅ Initialize DropIn
  useEffect(() => {
    if (clientToken) {
      dropin.create(
        {
          authorization: clientToken,
          container: dropinRef.current,
          // ❌ Remove PayPal to avoid sandbox linking issue
          // paypal: { flow: "vault" },
        },
        (error, dropinInstance) => {
          if (error) {
            console.error("DropIn create error:", error);
          } else {
            setInstance(dropinInstance);
            console.log("✅ DropIn instance created:", dropinInstance);
          }
        }
      );
    }
  }, [clientToken]);

  // ✅ Handle Payment
  const handlePayment = async () => {
    if (!instance) return toast.error("Payment gateway not ready");
    if (!user?.address) return toast.error("Please add your address first");

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        { nonce, cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.success) {
        toast.success("Payment successful!");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/dashboard/user/orders");
      } else {
        toast.error(data?.message || "Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calculate total price
  const totalPrice = () => {
    try {
      const total = cart.reduce((acc, item) => acc + Number(item.price), 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error("Total price calculation error:", error);
      return "$0.00";
    }
  };

  // ✅ Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
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
              {clientToken && (
                <div key={clientToken}>
                  <div ref={dropinRef} className="mt-3"></div>

                  <button
                    className="btn btn-primary mt-3"
                    onClick={handlePayment}
                    disabled={loading || !instance}
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
