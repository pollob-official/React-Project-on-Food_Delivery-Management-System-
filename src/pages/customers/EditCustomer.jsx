import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCustomer = () => {
  const { customerId } = useParams(); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${baseUrl}/customer/find/${customerId}`);
        if (res.data.customer) {
          setCustomer(res.data.customer);
        } else {
          setError("Customer not found");
        }
      } catch (err) {
        console.error("AxiosError", err);
        setError("Error fetching customer data");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/customer/update`, { customer });
      if (res.data.success === "yes") {
        alert("Customer updated successfully!");
        navigate("/customer");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating customer!");
    }
  };

  if (loading) return <p>Loading customer data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div
          className="card-header d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #7b8675ff, #d397b4ff)",
            color: "#000",
            borderTopLeftRadius: "0.8rem",
            borderTopRightRadius: "0.8rem",
          }}
        >
          <span style={{ fontSize: "28px", marginRight: "10px" }}>👤</span>
          <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Edit Customer
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                value={customer.name ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                value={customer.email ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Phone
              </label>
              <input
                type="text"
                name="phone"
                className="form-control form-control-lg"
                value={customer.phone ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">Update Customer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
