import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/order/list`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure to delete this order?")) return;

    try {
      const res = await axios.post(`${baseUrl}/order/delete`, { id });
      if (res.data.success === "yes") {
        fetchOrders();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting order!");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1e3a8a", marginBottom: "20px" }}>
        Order List
      </h2>

      <Link to="/order/create" className="btn btn-outline-success mb-3">
       New Order
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-hover align-middle">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Total</th>
              <th>Delivery Fee</th>
              <th>Tax</th>
              <th>Payment Status</th>
              {/* <th>Created At</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, i) => (
                <tr key={order.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff', fontSize: '16px' }}>
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.restaurant_id}</td>
                  <td>৳{order.total_amount}</td>
                  <td>৳{order.delivery_fee}</td>
                  <td>৳{order.tax_amount}</td>
                  <td>
                    <span
                      className={
                        "badge rounded-pill px-3 py-2 " +
                        (order.payment_status === "paid"
                          ? "bg-success"
                          : order.payment_status === "unpaid"
                          ? "bg-warning text-dark"
                          : "bg-danger")
                      }
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  {/* <td>{order.created_at}</td> */}
                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/order/invoice/${order.id}`}>
                      View
                    </Link>
                    <Link className="btn btn-sm btn-info me-2" to={`/order/edit/${order.id}`}>
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteOrder(order.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {orders.length} orders</small>
      </div>
    </div>
  );
};

export default OrderList;
