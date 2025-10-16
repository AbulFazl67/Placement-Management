import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); 
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/view-jobs"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                View Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/view-status"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                View Status
              </NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Log-Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
