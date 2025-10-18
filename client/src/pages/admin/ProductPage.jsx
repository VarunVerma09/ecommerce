import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router";

function ProductPage() {
  const [product, setProduct] = useState([]);

  const api = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/product/get-product"
    );
    console.log(data.products);
    setProduct(data.products);
  };


  useEffect(() => {
    api();
  }, []);

  return (
    <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>All Products</h1>

            <div className="d-flex flex-wrap gap-3">
            {product.map((item) => (
  <Link
    key={item._id}
    className="mycard"
    to={`/dashboard/admin/product/${item.slug}`}
  >
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
        className="card-img-top"
        alt={item.category?.name}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
      </div>
    </div>
  </Link>
))}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
