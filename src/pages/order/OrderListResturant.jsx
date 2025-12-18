import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderListResturant = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { restaurantId } = useParams();

  const [orders, setOrders] = useState([]);
  const [trackings, setTrackings] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/order/OrderListByResturantId/${restaurantId}`
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tracking statuses
  const fetchTrackings = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tracking`);
      setTrackings(res.data.trackings || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch riders
  const fetchRiders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/rider`);
      setRiders(res.data.riders || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTrackings();
    fetchRiders();
  }, []);

  // Update tracking
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

  // Assign rider
  const assignRider = async (orderId, rider_id) => {
    try {
      await axios.post(`${baseUrl}/order/update_order_by_rider_id`, {
        id: orderId,
        rider_id,
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
        Order List
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
              <th>Tracking</th>
              <th>Assign Rider</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, i) => {
                const date = new Date(order.created_at).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                );

                // Get tracking name from trackings array
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

                    {/* Tracking Dropdown */}
                    <td>
                      <select
                        className="form-select"
                        value={order.tracking_id || ""}
                        onChange={(e) =>
                          updateTracking(order.id, Number(e.target.value))
                        }
                      >
                        <option value="">Select Status</option>
                        {trackings.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Rider Dropdown */}
                    <td>
                      <select
                        className="form-select"
                        value={order.rider_id || ""}
                        onChange={(e) =>
                          assignRider(order.id, Number(e.target.value))
                        }
                      >
                        <option value="">Assign Rider</option>
                        {riders.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
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

export default OrderListResturant;
