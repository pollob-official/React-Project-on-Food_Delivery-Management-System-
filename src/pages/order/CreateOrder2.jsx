import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const [order, setOrder] = useState({
    customer_id: "",
    restaurant_id: "",
    delivery_address: "",
    delivery_fee: 50,
    subtotal: 0,
    tax_amount: 0,
    total_amount: 0,
    payment_status: "unpaid",
  });

  // Load customers + restaurants
  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const c = await axios.get("http://localhost/FoodDeliveryApp/admin/api/customer");
      setCustomers(c.data.customers || []);

      const r = await axios.get("http://localhost/FoodDeliveryApp/admin/api/restaurant");
      setRestaurants(r.data.restaurants || []);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  // Restaurant change → load menu items
  const handleRestaurantChange = async (e) => {
    const restaurant_id = e.target.value;
    setOrder({ ...order, restaurant_id });
    setMenuItems([]); // Clear previous menu items

    if (!restaurant_id) return;

    try {
      const m = await axios.get(
        `http://localhost/FoodDeliveryApp/admin/api/menuitem?restaurant_id=${restaurant_id}`
      );
      setMenuItems(m.data.menu_items || []); // <-- FIXED: menu_items
    } catch (err) {
      console.error("Menu fetch error:", err);
      setMenuItems([]);
    }
  };

  // Customer → Load last address
  const handleCustomerChange = async (e) => {
    const cid = e.target.value;
    setOrder({ ...order, customer_id: cid });

    if (!cid) return;

    try {
      const res = await axios.get(
        `http://localhost/FoodDeliveryApp/admin/api/customer/address?customer_id=${cid}`
      );
      setOrder((prev) => ({
        ...prev,
        delivery_address: res.data.address || "",
      }));
    } catch (err) {
      console.error("Address fetch error:", err);
    }
  };

  // Add item to table
  const addItem = () => {
    const itemId = document.getElementById("menuItem").value;
    const qty = parseInt(document.getElementById("itemQty").value);

    if (!itemId) return alert("Please select a menu item");

    const item = menuItems.find((m) => m.id === itemId);

    const newItem = {
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      qty,
    };

    setOrderItems([...orderItems, newItem]);
  };

  // Remove item
  const removeItem = (index) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  // Auto calculate totals
  useEffect(() => {
    let subtotal = 0;
    orderItems.forEach((item) => {
      subtotal += item.price * item.qty;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax + parseFloat(order.delivery_fee || 0);

    setOrder((prev) => ({
      ...prev,
      subtotal: subtotal.toFixed(2),
      tax_amount: tax.toFixed(2),
      total_amount: total.toFixed(2),
    }));
  }, [orderItems, order.delivery_fee]);

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (orderItems.length === 0) return alert("Please add at least 1 item.");

    const postData = {
      ...order,
      items: orderItems,
      tracking_id: 1,
      version: 1,
    };

    try {
      await axios.post(
        "http://localhost/FoodDeliveryApp/admin/api/order/save_order",
        postData
      );
      alert("Order saved successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save order");
    }
  };

  return (
    <div className="container mt-4 invoice">
      <h3>Create New Order</h3>

      <form onSubmit={handleSubmit}>
        {/* Customer + Restaurant */}
        <div className="row mb-3">
          <div className="col-md-5">
            <label>Customer</label>
            <select
              className="form-select"
              value={order.customer_id}
              onChange={handleCustomerChange}
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-5">
            <label>Restaurant</label>
            <select
              className="form-select"
              value={order.restaurant_id}
              onChange={handleRestaurantChange}
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mb-3">
          <label>Delivery Address</label>
          <textarea
            className="form-control"
            rows="2"
            value={order.delivery_address}
            onChange={(e) =>
              setOrder({ ...order, delivery_address: e.target.value })
            }
          />
        </div>

        {/* Add Menu Item */}
        <div className="row mb-3">
          <div className="col-md-8">
            <label>Menu Item</label>
            <select className="form-select" id="menuItem">
              <option value="">Select Menu Item</option>
              {menuItems.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} - {parseFloat(m.price).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label>Qty</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              id="itemQty"
              className="form-control"
            />
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Line Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orderItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No items added</td>
                </tr>
              ) : (
                orderItems.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>{(item.qty * item.price).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(i)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="d-flex justify-content-end mb-3">
          <div style={{ minWidth: "300px" }}>
            <div className="row g-2">
              <div className="col-6 text-muted">Subtotal</div>
              <div className="col-6 text-end">{order.subtotal}</div>

              <div className="col-6 text-muted">Tax (5%)</div>
              <div className="col-6 text-end">{order.tax_amount}</div>

              <div className="col-6 text-muted">Delivery Fee</div>
              <div className="col-6 text-end">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={order.delivery_fee}
                  onChange={(e) =>
                    setOrder({ ...order, delivery_fee: e.target.value })
                  }
                />
              </div>

              <hr />

              <div className="col-6 text-muted fs-5">Grand Total</div>
              <div className="col-6 text-end fs-5 fw-bold">
                {order.total_amount}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button className="btn btn-success" type="submit">
          Save Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
