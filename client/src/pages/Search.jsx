import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h6>
        </div>

        {/* ===== Product Cards ===== */}
        <div className="row g-4 justify-content-center">
          {values?.results?.length > 0 ? (
            values.results.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div
                  className="card border-0 shadow-lg overflow-hidden h-100"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(180deg, #dcd4ff 0%, #ffffff 100%)",
                  }}
                >
                  {/* Product Image */}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(100,70,255,0.2) 0%, rgba(180,140,255,0.2) 100%)",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                      alt={item.name}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                  </div>

                  {/* Product Details */}
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
            ))
          ) : (
            <h5 className="text-center text-muted">No products found.</h5>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
