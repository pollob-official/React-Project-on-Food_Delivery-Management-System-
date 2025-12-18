import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RiderList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRiders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/rider`);
      setRiders(res.data.riders || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching riders");
    } finally {
      setLoading(false);
    }
  };

  const deleteRider = async (id) => {
    if (!window.confirm("Are you sure to delete this rider?")) return;

    try {
      const res = await axios.post(`${baseUrl}/rider/delete`, { id });
      if (res.data.success === "yes") {
        fetchRiders();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting rider!");
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  if (loading) return <p>Loading riders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#1e3a8a",
          marginBottom: "20px",
        }}
      >
        Rider List
      </h2>

      <button
        className="btn btn-outline-success mb-3"
        onClick={() => navigate("/rider/create")}
      >
        Add Rider
      </button>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Vehicle Type</th>
              <th>Car Number</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Total Orders</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.length > 0 ? (
              riders.map((r, i) => (
                <tr
                  key={r.id}
                  style={{
                    background: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
                    fontSize: "16px",
                  }}
                >
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.vehicle_type}</td>
                  <td>{r.car_number}</td>
                  <td>{r.mobile}</td>
                  <td>{r.email}</td>

                  {/* Total Orders Count */}
                  <td className="fw-bold text-success">{r.order_count}</td>

                  <td>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/rider/order/${r.id}`}
                    >
                      Orders
                    </Link>

                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/rider/edit/${r.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteRider(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {riders.length} riders</small>
      </div>
    </div>
  );
};

export default RiderList;
