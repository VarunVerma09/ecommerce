import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

function Modal({ setVisible, category, onUpdate }) {
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    if (category) setUpdatedName(category.name);
  }, [category]);

  const handleUpdate = () => {
    if (updatedName.trim() !== "") {
      onUpdate(category._id, updatedName); // Pass id & updatedName
    }
  };

  return (
    <div className="center-fixed d-flex flex-column align-items-center p-4 bg-white shadow rounded">
      <button
        onClick={() => setVisible(false)}
        className="position-absolute top-0 end-0 p-2 border-0 bg-transparent"
      >
        <IoCloseSharp size={24} />
      </button>
      <h2>Edit Categroy Name    </h2>

      <input
        type="text"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        className="w-50 rounded px-2 py-2 mt-5 border mb-3"
      />

      <button onClick={handleUpdate} className="btn btn-success upd">
        Update
      </button>
    </div>
  );
}

export default Modal;
