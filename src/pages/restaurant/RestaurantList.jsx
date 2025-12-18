import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(`${baseUrl}/restaurant/list`);
      setRestaurants(res.data.restaurants || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const deleteRestaurant = async (id) => {
    if (!window.confirm("Are you sure to delete this restaurant?")) return;

    try {
      const res = await axios.post(`${baseUrl}/restaurant/delete`, { id });
      if (res.data.success === "yes") {
        fetchRestaurants();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting restaurant!");
    }
  };

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1e3a8a", marginBottom: "20px" }}>
        Restaurant List
      </h2>

      <Link to="/restaurant/create" className="btn btn-outline-success mb-3">
        New Restaurant
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Open Hours</th>
              <th>Active</th>
              <th>Total Orders</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.length > 0 ? (
              restaurants.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                  <td>{i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.address}</td>
                  <td>{r.open_hours}</td>
                  <td>{r.is_active ? "Yes" : "No"}</td>

                  {/* New Order Count */}
                  <td className="fw-bold text-success">{r.order_count}</td>

                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/restaurant/order/${r.id}`}>Orders</Link>
                    <Link className="btn btn-sm btn-info me-2" to={`/restaurant/edit/${r.id}`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteRestaurant(r.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">No restaurants found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {restaurants.length} restaurants</small>
      </div>
    </div>
  );
};

export default RestaurantList;
