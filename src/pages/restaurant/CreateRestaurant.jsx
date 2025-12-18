import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    address: "",
    open_hours: "",
    is_active: 1,
    created_at: new Date().toISOString().slice(0, 19).replace("T", " ")
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/restaurant/save`, form);
      navigate("/restaurant");
    } catch (err) {
      console.error(err);
      alert("Error creating restaurant!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1e3a8a", marginBottom: "20px" }}>
        Create Restaurant
      </h2>

      <form className="shadow-sm p-4 rounded bg-white" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input name="address" className="form-control" value={form.address} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Open Hours</label>
          <input name="open_hours" className="form-control" value={form.open_hours} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Active</label>
          <select name="is_active" className="form-select" value={form.is_active} onChange={handleChange}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
