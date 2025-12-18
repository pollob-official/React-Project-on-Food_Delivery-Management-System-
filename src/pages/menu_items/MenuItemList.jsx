import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MenuItemList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imgUrl = import.meta.env.VITE_IMG_URL;

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Menu Items
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/menuitem/list`);
      setMenuItems(res.data.menu_items || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Delete Menu Item
  const deleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure to delete this menu item?")) return;

    try {
      const res = await axios.post(`${baseUrl}/menuitem/delete`, { id });
      if (res.data.success === "yes") {
        fetchMenuItems();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting menu item!");
    }
  };

  if (loading) return <p>Loading menu items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1e3a8a" }}>
        Menu Item List
      </h2>

      <Link to="/menuitem/create" className="btn btn-outline-success mb-3">
        New Menu Item
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Category</th>
              <th>Available</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.length > 0 ? (
              menuItems.map((m, i) => {
                const shortDesc =
                  m.description?.length > 40
                    ? m.description.substring(0, 40) + "..."
                    : m.description || "No description";

                return (
                  <tr key={m.id}>
                    <td className="fw-bold text-primary">{i + 1}</td>

                    <td>
                      {m.photo ? (
                        <img
                          src={`${imgUrl}/${m.photo}`}
                          alt={m.name || "menu photo"}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No photo</span>
                      )}
                    </td>

                    <td>{m.name}</td>
                    <td>{m.category}</td>

                    <td>
                      {m.is_available == 1 ? (
                        <span className="badge bg-success">Yes</span>
                      ) : (
                        <span className="badge bg-danger">No</span>
                      )}
                    </td>

                    <td style={{ maxWidth: "250px" }}>{shortDesc}</td>

                    <td>
                      <Link
                        className="btn btn-sm btn-info me-2"
                        to={`/menuitem/edit/${m.id}`}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteMenuItem(m.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No menu items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">
          Showing {menuItems.length} menu items
        </small>
      </div>
    </div>
  );
};

export default MenuItemList;
