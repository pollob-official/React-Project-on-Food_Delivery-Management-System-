import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRider = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    vehicle_type: "",
    car_number: "",
    mobile: "",
    email: "",
    password: "",
    photo: "",
    car_photo: "",
    is_active: 1,
    is_available: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // store file object
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      const res = await axios.post(`${baseUrl}/rider/save`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success === "yes") {
        alert("✅ Rider created successfully!");
        navigate("/rider");
      } else {
        alert(`❌ Create failed! Server says: ${res.data.message || ""}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error creating rider! Check console for details.");
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
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🏍️</span>
          <h4 className="mb-0 fw-bold">Add Rider</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Rider Name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Vehicle Type</label>
              <input
                type="text"
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                className="form-control"
                placeholder="Bike / Car / Scooty"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Car Number</label>
              <input
                type="text"
                name="car_number"
                value={formData.car_number}
                onChange={handleChange}
                className="form-control"
                placeholder="Dhaka Metro-XX-1234"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-control"
                required
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
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Car Photo</label>
              <input
                type="file"
                name="car_photo"
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active === 1}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label fw-bold">Active</label>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="is_available"
                checked={formData.is_available === 1}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label fw-bold">Available</label>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success btn-lg">
                Save Rider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRider;
