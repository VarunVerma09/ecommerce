import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // ===== Initial Product Load =====
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* ===== Product Details ===== */}
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "600px", maxWidth: "600px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 cus">
            <h1 className="mb-3"> Name : {product.name}</h1>
            <h4 className="text-primary mb-3">
              Price :  {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h4>
            <p> <strong>Category :</strong> {product?.category?.name}</p>
            <p><strong>Description : </strong>{product.description}</p>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button className="btn btn-primary btn-lg">Add to Cart</button>
              <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* ===== Similar Products ===== */}
        <h3 className="mb-4">Similar Products</h3>
        {relatedProducts.length < 1 && <p>No Similar Products Found</p>}

        <div className="row  g-3">
          {relatedProducts?.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card border-0 shadow-lg overflow-hidden w-100 h-600"
                style={{
                  borderRadius: "20px",
                  background: "linear-gradient(180deg, #dcd4ff 0%, #ffffff 100%)",
                }}
              >
                <div
                  className="justify-content-center align-items-center"
                  style={{
                    background: "linear-gradient(180deg, rgba(100,70,255,0.2) 0%, rgba(180,140,255,0.2) 100%)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                >
                  <Link to={`/product/${item.slug}`}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                      alt={item.name}
                      className="img-fluid p-0"
                      style={{
                        width: "100%",
                        height: "25vw",
                        objectFit: "cover",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                  </Link>
                </div>
                <div className="card-body bg-white d-flex flex-column ">
                  <div>
                    <h5 className="card-title fw-bold text-dark">
                      {item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name}
                    </h5>
                    <p className="card-text text-muted small mb-2">
                      {item.description.length > 80 ? `${item.description.substring(0, 80)}...` : item.description}
                    </p>
                    <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                 
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <p className="mb-0 text-muted small">PRICE</p>
                      <h5 className="fw-bold mb-0 text-dark">${item.price.toFixed(2)}</h5>
                    </div>
                    <button className="btn px-4 py-2 fw-semibold text-white" style={{ backgroundColor: "#6c63ff", borderRadius: "10px" }}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
