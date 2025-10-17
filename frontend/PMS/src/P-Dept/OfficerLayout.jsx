import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./OfficerLayout.css"; 

const OfficerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("officerToken");
    navigate("/");
  };

  return (
    <div className="officer-layout">

      <aside className="sidebar">
        <h2>PMS Officer</h2>
        <nav>
          <NavLink to="/officer/dashboard">Dashboard</NavLink>
          <NavLink to="/officer/post-job">Post Job</NavLink>
          <NavLink to="/officer/view-students">View Students</NavLink>
          <NavLink to="/officer/view-applied-status">View Applied Status</NavLink>
          <NavLink to="/officer/update-status">Update Status</NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            Log-Out
          </button>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default OfficerLayout;
