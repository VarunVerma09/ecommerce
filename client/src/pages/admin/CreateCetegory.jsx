import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CategroyFrom from "../../components/form/CategroyFrom";

function CreateCetegory() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/category/create-category",
      { name }
    );
    if (data?.success) {
      
      setName(""); 
      getAllCategory(); 
    } else {
      alert(data.message || "Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    alert("Error creating category!");
  }
  };

  //getting all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
   
  }, []);
  return (
    <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-10 p-2 ">
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
              <div className="row">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((items, index) => {
                      return (
                        <tr key={items._id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>{items.name}</td>
                          <td>
                            <button>Edit</button>
                          </td>
                          <td>
                            <button>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCetegory;
