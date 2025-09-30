import React from "react";
import Layout from "../components/layout/Layout";
import img from "../assets/images/cont.jpeg";


import { Link } from "react-router";

const About = () => {
  return (
    <Layout>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left side - Image */}
          <div className="col-md-6 mb-4 mb-md-0 d-flex">
            <img
              src={img}
              alt="About Us"
              className="img-fluid rounded shadow w-100"
              style={{ height: "50vh", objectFit: "cover" }}
            />
          </div>

          {/* Right side - Content */}
          <div className="col-md-6">
            <h2 className="mb-4">About Us</h2>
            <p className="text-muted">
              Welcome to <strong>E-Commerce</strong>! We are dedicated to
              providing the best shopping experience with high-quality products,
              reliable service, and great value. Our goal is to make online
              shopping simple, enjoyable, and secure for everyone.
            </p>
            <p className="text-muted">
              Our journey started with a small idea — to make shopping easier
              and accessible to everyone. Today, we are proud to serve thousands
              of happy customers and continue to grow with passion and
              innovation.
            </p>
            <p className="text-muted">
              Thank you for choosing us. We look forward to being a part of your
              journey!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
