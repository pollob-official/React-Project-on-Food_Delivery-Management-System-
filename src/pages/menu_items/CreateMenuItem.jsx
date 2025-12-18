import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMenuItem = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    restaurant_id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    is_available: 1,
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  // Fetch restaurant list for dropdown
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${baseUrl}/restaurant/list`);
        setRestaurants(res.data.restaurants || []);
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
      }
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("restaurant_id", formData.restaurant_id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("is_available", formData.is_available);
      data.append("created_at", new Date().toISOString());
      if (formData.photo) data.append("photo", formData.photo);

      const res = await axios.post(`${baseUrl}/menuitem/save`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success === "yes") {
        alert("Menu item created successfully!");
        navigate("/menuitem");
      } else {
        alert("Failed to create menu item.");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating menu item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Restaurant</label>
          <select
            className="form-select"
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Availability</label>
          <select
            className="form-select"
            name="is_available"
            value={formData.is_available}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            name="photo"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Menu Item"}
        </button>
      </form>
    </div>
  );
};

export default CreateMenuItem;
