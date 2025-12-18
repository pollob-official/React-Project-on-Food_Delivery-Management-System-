import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user`);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.post(`${baseUrl}/user/delete`, { id });
      if (res.data.success === "yes") {
        fetchUsers();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user!");
    }
  };

  if (loading) return <p>Loading users...</p>;
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
        User List
      </h2>

      <Link
        to="/user/create"
        className="btn btn-outline-success mb-3"
      >
        Create User
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <tr>
              <th style={{ fontWeight: "700" }}>#</th>
              <th style={{ fontWeight: "700" }}>Name</th>
              <th style={{ fontWeight: "700" }}>Email</th>
              <th style={{ fontWeight: "700" }}>Phone</th>
              <th style={{ fontWeight: "700" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user.id}
                  style={{
                    background: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
                    fontSize: "16px",
                  }}
                >
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/user/edit/${user.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {users.length} users</small>
      </div>
    </div>
  );
};

export default UserList;
