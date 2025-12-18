import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    id: "",
    customer_id: "",
    rider_id: "",
    restaurant_id: "",
    delivery_address: "",
    total_amount: "",
    delivery_fee: "",
    tax_amount: "",
    coupon_id: "",
    tracking_id: "",
    payment_status: "",
    version: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post(`${baseUrl}/order/find`, { id: orderId });
        if (res.data.order) {
          setFormData(res.data.order);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load order data");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/order/update`, formData);
      if (res.data.success === "yes") {
        alert("Order updated successfully!");
        navigate("/order");
      } else {
        alert("Failed to update order");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating order!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Simple array for rendering inputs
  const fields = [
    { label: "Id", name: "id", type: "text" },
    { label: "Customer Id", name: "customer_id", type: "text" },
    { label: "Rider", name: "rider_id", type: "text" },
    { label: "Restaurant Id", name: "restaurant_id", type: "text" },
    { label: "Delivery Address", name: "delivery_address", type: "textarea" },
    { label: "Total Amount", name: "total_amount", type: "text" },
    { label: "Delivery Fee", name: "delivery_fee", type: "text" },
    { label: "Tax Amount", name: "tax_amount", type: "text" },
    { label: "Coupon Id", name: "coupon_id", type: "text" },
    { label: "Tracking", name: "tracking_id", type: "text" },
    { label: "Payment Status", name: "payment_status", type: "text" },
    { label: "Version", name: "version", type: "text" },
  ];

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
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
          <span style={{ fontSize: "28px", marginRight: "10px" }}>📝</span>
          <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Edit Order
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {fields.map(f => (
              <div className="mb-3" key={f.name}>
                <label className="form-label fw-bold">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    className="form-control"
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                  ></textarea>
                ) : (
                  <input
                    type={f.type}
                    className="form-control"
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                {loading ? "Saving..." : "Save Change"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
