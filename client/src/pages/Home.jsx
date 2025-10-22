import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import Crousel from "../components/Crousel";
import { price } from "../data/data";
import { AiOutlineReload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const [cart, setCart] = useCart();

  // ===== Get total product count =====
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // ===== Get all categories =====
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // ===== Get products with pagination =====
  const getProducts = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${pageNum}`
      );
      setLoading(false);

      if (reset) {
        setProducts(data?.products);
      } else {
        setProducts((prev) => [...prev, ...data?.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products:", error);
    }
  };

  // ===== Handle Category Filter =====
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // ===== Filtered Products =====
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log("Error filtering products:", error);
    }
  };

  // ===== Initial Data Load =====
  useEffect(() => {
    getAllCategories();
    getTotal();
    getProducts();
  }, []);

  // ===== Pagination Effect =====
  useEffect(() => {
    if (page === 1) return;
    getProducts(page);
  }, [page]);

  // ===== Filters Effect =====
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      setPage(1);
      getProducts(1, true);
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layout>
      {/* ===== Category Filters ===== */}
      <div className="container-fluid pt-3 g-0">
        <div className="row justify-content-center text-center over">
          {categories?.map((item, ind) => (
            <div key={ind} className="col-6 col-sm-4 col-md-2">
              <div className="form-check d-flex justify-content-center align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id={`category-${ind}`}
                  onChange={(e) => handleFilter(e.target.checked, item._id)}
                />
                <label
                  className="form-check-label text-uppercase fw-semibold"
                  htmlFor={`category-${ind}`}
                >
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Crousel />

      {/* ===== Price Filters ===== */}
      <div className="container mt-4 g-0">
        <h5 className="text-center mb-3 text-uppercase text-underline">
          Filter By Price
        </h5>
        <div className="row justify-content-center text-center over">
          {price?.map((item, ind) => (
            <div key={item.id} className="col-6 col-sm-4 col-md-2">
              <div className="form-check d-flex justify-content-center align-items-center">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  id={`price-${ind}`}
                  name="price"
                  onChange={() => setRadio(item.array)}
                />
                <label
                  className="form-check-label text-uppercase fw-semibold"
                  htmlFor={`price-${ind}`}
                >
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* ===== Product Cards ===== */}
      <div className="container-fluid py-5">
        <h1 className="me-5">Our Collections</h1>
        <div className="row g-4 justify-content-center">
          {products?.length > 0 ? (
            products.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 "
              >
                <div
                  className="card border-0 shadow-lg overflow-hidden w-100 h-600"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(180deg, #dcd4ff 0%, #ffffff 100%)",
                  }}
                >
                  <div
                    className="justify-content-center align-items-center"
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
                        onClick={() => {
                          const updatedCart = [...cart, item];
                          setCart(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                        }}
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
            <div className="text-center text-muted fs-5 mt-5">
              No products found
            </div>
          )}
        </div>

        {/* ===== Load More Button ===== */}
        <div className="m-2 p-3 text-center">
          {products && products.length < total && (
            <button
              className="btn loadmore btn-primary px-4 py-2"
              onClick={(e) => {
                e.preventDefault();
                setPage((prev) => prev + 1);
              }}
              disabled={loading}
            >
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  Load More <AiOutlineReload />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
