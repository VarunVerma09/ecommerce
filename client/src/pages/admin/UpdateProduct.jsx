import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(""); 
  const [ProductId, setProductId] = useState("");

  // ✅ Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      if (data?.success) {
        const p = data.product;
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setCategory(p.category?._id);
        setShipping(p.shipping ? "yes" : "no");
        setProductId(p._id);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  // ✅ Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  //  Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (photo instanceof File) productData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${ProductId}`,
        productData
      );

      if (data?.success) {
        alert(" Product updated successfully!");
        navigate("/dashboard/admin/products");
      } else {
        alert(data?.message || " Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Server error while updating product!");
    }
  };

  const handleDelete = async () => {
    try {
        let answer = window.prompt("Do You Want to delete This Product")
        if(!answer)return;
        const {data} = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${ProductId}`)
        alert("Deleted Successfully")
        navigate("/dashboard/admin/products")
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>

          <div className="col-md-10">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Photo Upload */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo instanceof File ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Photo Preview */}
              <div className="text-center mb-3">
                {photo instanceof File ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="200px"
                    className="img img-responsive"
                  />
                ) : ProductId ? (
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${ProductId}`}
                    alt={name}
                    height="200px"
                    className="img img-responsive"
                  />
                ) : null}
              </div>

              {/* Name */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shipping */}
              <div className="mb-3">
                <select
                  className="form-control"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <option value="">Select Shipping</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
           <div className="d-flex gap-5">
                {/* Update Button */}
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                {/* delete Button */}
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
