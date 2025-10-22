import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category p-2">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result(s) found</h6>

        {loading ? (
          <p className="text-center mt-5">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger mt-5">{error}</p>
        ) : products?.length === 0 ? (
          <p className="text-center mt-5">No products found</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {products.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              >
                <div
                  className="card border-0 shadow-lg overflow-hidden w-100 h-100"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(180deg, #dcd4ff 0%, #ffffff 100%)",
                  }}
                >
                  <div
                    className=" justify-content-center align-items-center"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(100,70,255,0.2) 0%, rgba(180,140,255,0.2) 100%)",
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

                  <div className="card-body bg-white d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold text-dark">
                        {item.name.length > 25
                          ? `${item.name.substring(0, 25)}...`
                          : item.name}
                      </h5>
                      <p className="card-text text-muted small mb-3">
                        {item.description.length > 80
                          ? `${item.description.substring(0, 80)}...`
                          : item.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        <p className="mb-0 text-muted small">PRICE</p>
                        <h5 className="fw-bold mb-0 text-dark">
                          ${item.price.toFixed(2)}
                        </h5>
                      </div>
                      <button
                        className="btn px-4 py-2 fw-semibold text-white"
                        style={{
                          backgroundColor: "#6c63ff",
                          borderRadius: "10px",
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
