import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderInvoice = () => {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [rider, setRider] = useState(null);
  const [items, setItems] = useState([]);

  // Totals
  const [subtotal, setSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    loadInvoice();
  }, [id]);

  const loadInvoice = async () => {
    try {
      // ORDER
      const orderRes = await axios.get(`${baseUrl}/order/find/${id}`);
      const o = orderRes.data.order;
      console.log(o);
      
      setOrder(o);

      // CUSTOMER
      const cRes = await axios.get(`${baseUrl}/customer/find/${o.customer_id}`);
      setCustomer(cRes.data.customer);

      // RESTAURANT
      const rRes = await axios.get(`${baseUrl}/restaurant/find/${o.restaurant_id}`);
      setRestaurant(rRes.data.restaurant);

      // RIDER
      if (o.rider_id) {
        const rdRes = await axios.get(`${baseUrl}/rider/find/${o.rider_id}`);
        setRider(rdRes.data.rider);
      }

      // ITEMS
      const itemRes = await axios.get(`${baseUrl}/orderdetail/all_by_order_id/${id}`);
      console.log("orderdetails",itemRes.data);
      
      const _items = itemRes.data.orderdetail.map((it) => ({
        ...it,
        qty: parseFloat(it.qty),
        unit_price: parseFloat(it.unit_price),
        line_total: parseFloat(it.qty) * parseFloat(it.unit_price)
      }));

      setItems(_items);

      // CALCULATIONS
      const _subtotal = _items.reduce((sum, it) => sum + it.line_total, 0);
      const tax = parseFloat(o.tax_amount || 0);
      const fee = parseFloat(o.delivery_fee || 0);
      const discount = parseFloat(o.coupon_discount || 0);

      setSubtotal(_subtotal);
      setGrandTotal(_subtotal + tax + fee - discount);

    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <div>Loading invoice...</div>;

  return (
    <>
      <style>{`
        body { background: #f8f9fa; }
        .invoice { background: #fff; padding: 2rem; border-radius: .5rem; box-shadow: 0 6px 18px rgba(0,0,0,.06); max-width: 1000px; margin: 2rem auto; }
        .no-break { page-break-inside: avoid; }
        
        @media print {
            body * { visibility: hidden; }
            #printable, #printable * { visibility: visible; }
            #printable { position: fixed; top: 0; left: 0; width: 100%; }
            .no-print { display: none !important; }
        }
      `}</style>

      <div id="printable" className="invoice">

        {/* Header */}
        <div className="d-flex justify-content-between">
          <div>
            <h3>Zomo Food Delivery</h3>
            <small>Dhaka, Bangladesh</small><br />
            <small>Phone: +8801234567890</small>
          </div>

          <div className="text-end">
            <h4>INVOICE</h4>
            <small># {String(order.id).padStart(4, "0")}</small><br />
            <small>Date: {order.created_at}</small>
          </div>
        </div>

        {/* Customer & Restaurant */}
        <div className="row mt-4 mb-4">
          <div className="col-6">
            <h6>Bill To</h6>
            <strong>{customer?.name}</strong><br />
            <small>{order.delivery_address}</small><br />
            <small>Phone: {customer?.phone}</small>
          </div>

          <div className="col-6 text-end">
            <h6>Restaurant</h6>
            <strong>{restaurant?.name}</strong><br />
            <small>{restaurant?.address}</small><br />
            <small>Phone: {restaurant?.phone}</small>
          </div>
        </div>

        {/* Items table */}
        <div className="table-responsive no-break">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Line Total</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan="5">No items found.</td></tr>
              ) : (
                items.map((it, index) => (
                   <tr key={it.id}>
                    <td>{index + 1}</td>
                    <td>{it.item_name}</td>
                    <td>{it.qty}</td>
                    <td className="text-end">{it.unit_price.toFixed(2)}</td>
                    <td className="text-end">{it.line_total.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="d-flex justify-content-end mt-3">
          <div style={{ minWidth: "240px" }}>
            <div className="d-flex justify-content-between">
              <b>Subtotal:</b> <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <b>Tax:</b> <span>{parseFloat(order.tax_amount).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <b>Delivery Fee:</b> <span>{parseFloat(order.delivery_fee).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <b>Discount:</b> <span>-{parseFloat(order.coupon_discount || 0).toFixed(2)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fs-5">
              <b>Total:</b> <b>৳{grandTotal.toFixed(2)}</b>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label><b>Notes</b></label>
          <textarea className="form-control" rows="3" defaultValue={order.notes || "Thank you for ordering!"}></textarea>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-3 no-print">
          <button onClick={() => window.print()} className="btn btn-success">Print / PDF</button>
        </div>

      </div>
    </>
  );
};

export default OrderInvoice;
