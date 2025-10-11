import { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPass() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        formData
      );
      console.log("Response:", res.data);

      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card shadow-lg p-4"
          style={{ width: "400px", borderRadius: "15px" }}
        >
          <h2 className="text-center mb-4">Forgot Password</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Answer */}
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Enter Your Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="answer"
                name="answer"
                placeholder="Enter your father name"
                value={formData.answer}
                onChange={handleChange}
                required
              />
            </div>

            {/* New Password */}
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Set New Password
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center mt-3">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPass;
