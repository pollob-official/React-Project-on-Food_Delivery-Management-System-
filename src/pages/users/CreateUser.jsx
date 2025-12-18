import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    // role_id: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data:", user);

    axios({
      url: `${baseUrl}/user/save`,
      method: "POST",
      data: { user },
    })
      .then((res) => {
        console.log("Response:", res);
        if (res) {
          navigate("/user"); // ✅ redirect to user list page
        }
      })
      .catch((err) => {
        console.error("Error saving user:", err);
      });
  };

  return (
    <>
      <h3 className="my-3 text-center">Create User</h3>
      <div className="container">
        <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              name="phone"
              type="text"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Role ID</label>
            <input
              name="role_id"
              type="number"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="text-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary px-4"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
