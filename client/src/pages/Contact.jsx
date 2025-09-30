import React from "react";
import Layout from "../components/layout/Layout";
import img from "../assets/images/cont.jpeg";

const Contact = () => {
  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          {/* Left side - Image */}
          <div className="col-md-6 mb-4 mb-md-0 align-items-center d-flex ">
            <img
              src={img} // replace with your image
              alt="Contact"
              className="img-fluid rounded shadow w-100"
              style={{ height: "60vh", objectFit: "cover" }}
            />
          </div>

          {/* Right side - Form */}
          <div className="col-md-6">
            <h2 className="mb-4">Get in Touch</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Write your query here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
