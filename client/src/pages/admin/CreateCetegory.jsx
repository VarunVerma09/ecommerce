import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import CategroyFrom from "../../components/form/CategroyFrom";
import Modal from "../../components/form/Modal";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        setName("");
        getAllCategories();
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating category!");
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.error(error);
    }
  };

  // Update category
  const handleUpdate = async (id, updatedName) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${id}`,
        { name: updatedName }
      );
      if (data?.success) {
        // Update the category in local state
        setCategories((prev) =>
          prev.map((cat) => (cat._id === id ? { ...cat, name: updatedName } : cat))
        );
        setVisible(false);
        setSelectedCategory(null);
      } else {
        alert(data.message || "Update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating category!");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting category!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-10 p-2 position-relative">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <CategroyFrom
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Category Name</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td>{index + 1}</td>
                        <td>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setVisible(true);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(cat._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {visible && selectedCategory && (
          <Modal
            setVisible={setVisible}
            category={selectedCategory}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </Layout>
  );
}

export default CreateCategory;
