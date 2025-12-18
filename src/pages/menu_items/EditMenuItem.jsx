import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMenuItem = () => {
  const { menuitemId } = useParams();
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
    existingPhoto: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurant list
        const resR = await axios.get(`${baseUrl}/restaurant`);
        setRestaurants(resR.data.restaurants || []);

        // Fetch menu item data
        const resM = await axios.get(`${baseUrl}/menuitem/find`, {
          params: { id: menuitemId }
           });

        const menuitem = resM.data.menuitem;

        setFormData({
          restaurant_id: menuitem.restaurant_id,
          name: menuitem.name,
          description: menuitem.description,
          price: menuitem.price,
          category: menuitem.category,
          is_available: menuitem.is_available,
          photo: null,
          existingPhoto: menuitem.photo,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load menu item data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [menuitemId]);

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
      data.append("id", menuitemId);
      data.append("restaurant_id", formData.restaurant_id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("is_available", formData.is_available);
      data.append("created_at", new Date().toISOString());
      if (formData.photo) data.append("photo", formData.photo);

      const res = await axios.post(`${baseUrl}/menuitem/update`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success === "yes") {
        alert("Menu item updated successfully!");
        navigate("/menuitem");
      } else {
        alert("Failed to update menu item.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating menu item!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Menu Item</h2>
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
          {formData.existingPhoto && (
            <img
              src={`http://localhost/FoodDeliveryApp/admin/assets/images/product/${formData.existingPhoto}`}
              alt="Existing"
              style={{ width: "60px", height: "60px", marginTop: "5px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Update Menu Item"}
        </button>
      </form>
    </div>
  );
};

export default EditMenuItem;
