import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import Crousel from "../components/Crousel";
import { price } from "../data/data";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([])
  const { auth } = useAuth();

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      if (data?.success) setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // Get all categories
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

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);
  
//filter by category
const handleFilter = (value,id) => {
  let all = [...checked]
  if(value){
    all.push(id);
  }else{
all = all.filter((c)=> c !== id)
  }
  setChecked(all);

}


  return (
    <Layout>
      {/* ===== Category Filters ===== */}
      <div className="container-fluid pt-3 g-0  ">
        <div className="row justify-content-center text-center   over">
          {categories?.map((item, ind) => (
            <div key={ind} className="col-6 col-sm-4 col-md-2">
              <div className="form-check d-flex justify-content-center align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id={`category-${ind}`}
                  onChange={(e)=>handleFilter(e.target.checked,item._id)}
                  name={item.name}
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
        {/* ===== price Filters ===== */}
       
  <div className="container mt-4 g-0">
    <h5 className="text-center mb-3 font-underline">Filter By Price</h5>
  <div className="row justify-content-center text-center over">
    {price?.map((item, ind) => (
      <div key={item.id} className="col-6 col-sm-4 col-md-2">
        <div className="form-check d-flex justify-content-center align-items-center">
          <input
            type="radio"
            className="form-check-input me-2"
            id={`category-${ind}`}
            value={item.name}
            name="price"
            checked={radio === item.name}
            onChange={(e) => setRadio(e.target.value)}
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


      {/* ===== Product Cards ===== */}
      <div className="container-fluid py-5">
        
        <h1 className="me-5">Best Collections</h1>
        <div className="row g-4 justify-content-center">
          {products?.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card border-0 shadow-lg overflow-hidden h-100"
                style={{
                  borderRadius: "20px",
                  background:
                    "linear-gradient(180deg, #dcd4ff 0%, #ffffff 100%)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                    padding: "0",
                  }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  />
                </div>

                {/* Card Body */}
                <div
                  className="card-body bg-white d-flex flex-column justify-content-between"
                  style={{
                    borderBottom: "6px solid white",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
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
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#574bff")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#6c63ff")
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* If no products */}
          {products.length === 0 && (
            <div className="text-center text-muted fs-5 mt-5">
              No products found
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
