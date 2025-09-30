import React from "react";
import Layout from "../components/layout/Layout";
import img from "../assets/images/cont.jpeg";
import { Link } from "react-router";


const Policy = () => {
  return (
    <Layout>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left side - Image */}
          <div className="col-md-6 mb-4 mb-md-0 d-flex">
            <img
              src={img}
              alt="Our Policy"
              className="img-fluid rounded shadow w-100"
              style={{ height: "50vh", objectFit: "cover" }}
            />
          </div>

          {/* Right side - Content */}
          <div className="col-md-6">
            <h2 className="mb-4">Our Policies</h2>
            <p className="text-muted">
              At <strong>E-Commerce</strong>, your trust and safety are our top
              priorities. We are committed to providing transparent policies
              that protect your rights and ensure a safe shopping experience.
            </p>
            <ul className="text-muted">
              <li>
                <strong>Privacy Policy:</strong> We respect your personal data
                and use it only for improving your shopping experience.
              </li>
              <li>
                <strong>Refund & Return Policy:</strong> If you are not
                satisfied with your purchase, you may return or exchange within
                7–14 days (conditions apply).
              </li>
              <li>
                <strong>Shipping Policy:</strong> We aim to deliver all orders
                on time, with real-time tracking available.
              </li>
              <li>
                <strong>Terms of Service:</strong> By using our platform, you
                agree to our fair and transparent usage policies.
              </li>
            </ul>
            <p className="text-muted">
              If you have any questions about our policies, feel free to{" "}
              <a href="/contact" className="text-decoration-none fw-bold">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
