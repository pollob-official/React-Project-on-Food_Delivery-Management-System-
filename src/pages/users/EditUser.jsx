import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", // optional
    role_id: 1,
    created_at: "",
    updated_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/user/find/${userid}`);
        if (res.data.user) {
          const u = res.data.user;
          setUser({
            name: u.name,
            email: u.email,
            phone: u.phone,
            password: "", // never prefill hashed password
            role_id: u.role_id,
            created_at: u.created_at,
            updated_at: u.updated_at,
          });
        } else {
          setError("User not found!");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading user!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userid, baseUrl]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload for backend
      const payload = {
        userid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role_id: user.role_id,
        created_at: user.created_at || new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      // Only send password if user typed a new one
      if (user.password.trim() !== "") {
        payload.password_hash = user.password;
      }

      const res = await axios.post(`${baseUrl}/user/update`, payload);

        console.log(res.data);
        
      if (res.data.success === "yes") {
        alert("User updated successfully!");
        navigate("/user");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating user!");
    }
  };

  if (loading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit User</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-light"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Password (leave blank to keep old)
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter new password (optional)"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Role ID</label>
          <input
            type="number"
            name="role_id"
            className="form-control"
            value={user.role_id}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
