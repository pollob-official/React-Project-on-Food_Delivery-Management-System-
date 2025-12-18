import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRestaurant = () => {
  const { restaurantId } = useParams(); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [restaurant, setRestaurant] = useState({
    id: "",
    user_id: "",
    name: "",
    description: "",
    phone: "",
    address: "",
    open_hours: "",
    is_active: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.post(`${baseUrl}/restaurant/find`, { id: restaurantId });
        if (res.data.restaurant) {
          setRestaurant({
            ...res.data.restaurant,
            is_active: parseInt(res.data.restaurant.is_active) || 0,
            user_id: res.data.restaurant.user_id
          });
        } else {
          setError("Restaurant not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching restaurant data");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({
      ...prev,
      [name]: name === "is_active" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/restaurant/update`, { ...restaurant });
      alert("Restaurant updated successfully!");
      navigate("/restaurant");
    } catch (err) {
      console.error(err);
      alert("Error updating restaurant!");
    }
  };

  if (loading) return <p>Loading restaurant data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-header d-flex align-items-center"
          style={{ background: "linear-gradient(135deg, #7b8675ff, #d397b4ff)", color: "#000", borderTopLeftRadius: "0.8rem", borderTopRightRadius: "0.8rem" }}>
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🍴</span>
          <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>Edit Restaurant</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>Name</label>
              <input type="text" name="name" className="form-control form-control-lg" value={restaurant.name ?? ""} onChange={handleChange} required style={{ fontSize: '16px', padding: '14px' }} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>Description</label>
              <textarea name="description" className="form-control form-control-lg" value={restaurant.description ?? ""} onChange={handleChange} style={{ fontSize: '16px', padding: '14px' }} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>Phone</label>
              <input type="text" name="phone" className="form-control form-control-lg" value={restaurant.phone ?? ""} onChange={handleChange} style={{ fontSize: '16px', padding: '14px' }} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>Address</label>
              <input type="text" name="address" className="form-control form-control-lg" value={restaurant.address ?? ""} onChange={handleChange} style={{ fontSize: '16px', padding: '14px' }} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>Open Hours</label>
              <input type="text" name="open_hours" className="form-control form-control-lg" value={restaurant.open_hours ?? ""} onChange={handleChange} style={{ fontSize: '16px', padding: '14px' }} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>Active</label>
              <select name="is_active" className="form-select form-select-lg" value={restaurant.is_active} onChange={handleChange} style={{ fontSize: '16px', padding: '14px' }}>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">Update Restaurant</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRestaurant;
