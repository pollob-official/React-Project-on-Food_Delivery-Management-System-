import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const RiderOrderList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { rider_id } = useParams();

  const [orders, setOrders] = useState([]);
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // Fetch orders assigned to rider
  // =============================
  const fetchOrders = async () => {
    try {
      const res = await axios.post(`${baseUrl}/rider/order_find_by_rider_id`,
        { id: rider_id }
      );

      console.log("ORDER RESPONSE:", res.data);

      // FIXED: API returns { orders: [...] }
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Fetch tracking statuses
  // =============================
  const fetchTrackings = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tracking`);
      setTrackings(res.data.trackings || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTrackings();
  }, []);

  // =============================
  // Update order tracking
  // =============================
  const updateTracking = async (orderId, tracking_id) => {
    try {
      await axios.post(`${baseUrl}/order/update_order_by_tracking_id`, {
        id: orderId,
        tracking_id,
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="container mt-5">
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#4b0082",
          marginBottom: "25px",
          textShadow: "1px 1px 2px #ccc",
        }}
      >
        My Assigned Orders
      </h2>

      <div className="table-responsive shadow-lg rounded">
        <table className="table table-bordered table-hover align-middle">
          <thead
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <tr>
              <th>Order Code</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Update Status</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, i) => {
                const date = new Date(order.created_at).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                );

                const statusObj =
                  trackings.find((t) => t.id === order.tracking_id) || {};
                const statusName = statusObj.name || "";

                return (
                  <tr
                    key={order.id}
                    style={{
                      background: i % 2 === 0 ? "#f3f4f6" : "#ffffff",
                      fontSize: "16px",
                    }}
                  >
                    <td className="fw-bold text-primary">{order.id}</td>
                    <td>{date}</td>
                    <td>
                      <span
                        className="badge px-3 py-2"
                        style={{
                          background:
                            statusName === "delivered"
                              ? "#28a745"
                              : statusName === "pending"
                              ? "#ffc107"
                              : statusName === "cancelled"
                              ? "#dc3545"
                              : statusName === "assigned_to_rider"
                              ? "#17a2b8"
                              : "#6c757d",
                          color:
                            statusName === "pending" ||
                            statusName === "assigned_to_rider"
                              ? "#000"
                              : "#fff",
                        }}
                      >
                        {statusName.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="fw-bold">৳{order.total_amount}</td>

                    <td>
                      <select
                        className="form-select"
                        value={order.tracking_id || ""}
                        onChange={(e) =>
                          updateTracking(order.id, Number(e.target.value))
                        }
                      >
                        <option value="">Update Status</option>
                        {trackings.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <Link
                        to={`/order/invoice/${order.id}`}
                        className="btn btn-info rounded"
                      >
                        View Invoice
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No orders assigned
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

export default RiderOrderList;
