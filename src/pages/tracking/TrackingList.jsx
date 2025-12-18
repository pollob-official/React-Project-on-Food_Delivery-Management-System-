import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TrackingList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrackings = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tracking`);
      setTrackings(res.data.trackings || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching tracking statuses!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackings();
  }, []);

  const deleteTracking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tracking status?")) return;

    try {
      const res = await axios.post(`${baseUrl}/tracking/delete`, { id });
      if (res.data.success === "yes") {
        fetchTrackings();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting tracking!");
    }
  };

  if (loading) return <p>Loading tracking list...</p>;
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
        Tracking Status List
      </h2>

      <Link to="/tracking/create" className="btn btn-outline-success mb-3">
        New Tracking Status
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-hover align-middle">
          <thead
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <tr>
              <th>#</th>
              <th>Status Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trackings.length > 0 ? (
              trackings.map((t, i) => (
                <tr
                  key={t.id}
                  style={{
                    background: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
                    fontSize: "16px",
                  }}
                >
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td style={{ fontWeight: "600", textTransform: "capitalize" }}>
                    {t.name.replace(/_/g, " ")}
                  </td>

                  <td>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/tracking/edit/${t.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTracking(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted py-4">
                  No tracking statuses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {trackings.length} statuses</small>
      </div>
    </div>
  );
};

export default TrackingList;
