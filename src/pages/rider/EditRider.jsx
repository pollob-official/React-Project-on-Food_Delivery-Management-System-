import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRider = () => {
  const { riderId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [rider, setRider] = useState({
    name: "",
    vehicle_type: "",
    car_number: "",
    mobile: "",
    email: "",
    password: "",
    photo: null,
    car_photo: null,
    is_active: 1,
    is_available: 1,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/rider/find/${riderId}`)
      .then((res) => {
        if (res.data?.rider) setRider(res.data.rider);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [riderId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setRider((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setRider((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setRider((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      Object.keys(rider).forEach((key) => {
        payload.append(key, rider[key]);
      });

      const res = await axios.post(`${baseUrl}/rider/update/${riderId}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success === "yes") {
        alert("✅ Rider updated successfully!");
        navigate("/rider");
      } else {
        alert(`❌ Update failed! ${res.data.message || ""}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error updating rider! Check console.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Edit Rider</h3>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={rider.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Vehicle Type</label>
            <input
              type="text"
              name="vehicle_type"
              value={rider.vehicle_type}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Car Number</label>
            <input
              type="text"
              name="car_number"
              value={rider.car_number}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={rider.mobile}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={rider.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={rider.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Photo</label>
            <input type="file" name="photo" onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label>Car Photo</label>
            <input type="file" name="car_photo" onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label>Active</label>
            <select name="is_active" value={rider.is_active} onChange={handleChange} className="form-select">
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Available</label>
            <select name="is_available" value={rider.is_available} onChange={handleChange} className="form-select">
              <option value={1}>Available</option>
              <option value={0}>Not Available</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Update Rider
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRider;
