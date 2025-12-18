import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_BASE_URL;

  const [customers, setCustomers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [orderItems, setOrderItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ menu_id: "", qty: 1 });

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

  // Load dropdowns
  useEffect(() => {
    const load = async () => {
      const c = await axios.get(`${base_url}/customer`);
      const r = await axios.get(`${base_url}/restaurant`);
      setCustomers(c.data.customers);
      setRestaurants(r.data.restaurants);
    };
    load();
  }, []);

  // Customer change → Fetch last address
  const handleCustomerChange = async (e) => {
    const customer_id = e.target.value;

    setOrder({ ...order, customer_id });

    if (!customer_id) return;

    const res = await axios.get(
      `${base_url}/customer/address?customer_id=${customer_id}`
    );

    setOrder((prev) => ({
      ...prev,
      delivery_address: res.data.address || "",
    }));
  };

  // Restaurant change → Load menu items
  const handleRestaurantChange = async (e) => {
    const restaurant_id = e.target.value;

    setOrder({ ...order, restaurant_id });
    setMenuItems([]);
    setSelectedItem({ menu_id: "", qty: 1 });

    if (!restaurant_id) return;

    const res = await axios.get(
      `${base_url}/menuitem?restaurant_id=${restaurant_id}`
    );
    setMenuItems(res.data.menu_items || []);
  };

  // Add item
  const addItem = () => {
    if (!selectedItem.menu_id) return alert("Select menu item");

    const item = menuItems.find((m) => m.id == selectedItem.menu_id);

    setOrderItems([
      ...orderItems,
      {
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        qty: parseInt(selectedItem.qty),
      },
    ]);

    setSelectedItem({ menu_id: "", qty: 1 });
  };

  // Remove item
  const removeItem = (index) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  // Recalculate totals
  useEffect(() => {
    let subtotal = orderItems.reduce(
      (total, i) => total + i.qty * i.price,
      0
    );

    let tax = subtotal * 0.05;
    let total = subtotal + tax + parseFloat(order.delivery_fee || 0);

    setOrder((prev) => ({
      ...prev,
      subtotal: subtotal.toFixed(2),
      tax_amount: tax.toFixed(2),
      total_amount: total.toFixed(2),
    }));
  }, [orderItems, order.delivery_fee]);

  // Save Order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return alert("Add at least one item");

    const payload = {
      ...order,
      tracking_id: 1,
      version: 1,
      items: orderItems,
    };

    await axios.post(`${base_url}/order/save_order`, payload);

    alert("Order successfully saved!");
    navigate("/order");
  };

  return (
    <div className="container mt-4 invoice">

      <h3>Create New Order</h3>

      <form onSubmit={handleSubmit}>

        {/* Customer + New Customer */}
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

          <div className="col-md-2 d-flex align-items-end">
            <Link to="/customer/create" className="btn btn-primary w-100">
              New Customer
            </Link>
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

        {/* Delivery address */}
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

        {/* Add item */}
        <div className="row mb-3">
          <div className="col-md-8">
            <label>Menu Item</label>
            <select
              className="form-select"
              value={selectedItem.menu_id}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, menu_id: e.target.value })
              }
            >
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
              className="form-control"
              value={selectedItem.qty}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, qty: e.target.value })
              }
            />
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button type="button" className="btn btn-primary w-100" onClick={addItem}>
              Add Item
            </button>
          </div>
        </div>

        {/* Order table */}
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
                    <td>{(item.price * item.qty).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
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
              <div className="col-6">
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
