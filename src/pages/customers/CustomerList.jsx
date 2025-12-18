import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/customer/list`);
      setCustomers(res.data.customers || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure to delete this customer?")) return;

    try {
      const res = await axios.post(`${baseUrl}/customer/delete`, { id });
      if (res.data.success === "yes") {
        fetchCustomers();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting customer!");
    }
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1e3a8a", marginBottom: "20px" }}>
        Customer List
      </h2>

      <Link to="/customer/create" className="btn btn-outline-success mb-3">
        New Customer
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th style={{ fontWeight: '700' }}>#</th>
              <th style={{ fontWeight: '700' }}>Name</th>
              <th style={{ fontWeight: '700' }}>Email</th>
              <th style={{ fontWeight: '700' }}>Phone</th>
              <th style={{ fontWeight: '700' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c, i) => (
                <tr key={c.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff', fontSize: '16px' }}>
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/customer/edit/${c.id}`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(c.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {customers.length} customers</small>
      </div>
    </div>
  );
};

export default CustomerList;
