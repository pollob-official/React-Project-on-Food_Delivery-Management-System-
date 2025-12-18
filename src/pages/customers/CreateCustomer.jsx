import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/customer/save`, { customer: formData });
      if (res.data.success === "yes") {
        alert("✅ Customer created successfully!");
        setFormData({ name: "", email: "", phone: "" });
        navigate("/customer");
      } else {
        alert("Create failed!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error creating customer");
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div
          className="card-header d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #7b8675ff, #d397b4ff)",
            color: "#000",
            borderTopLeftRadius: "0.8rem",
            borderTopRightRadius: "0.8rem",
          }}
        >
          <span style={{ fontSize: "28px", marginRight: "10px" }}>👤</span>
          <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Add Customer
          </h4>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Customer Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Customer Email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Customer Phone"
            />
          </div>

          <div className="text-end">
            <button onClick={handleSubmit} className="btn btn-success btn-lg">
              ✅ Save Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
