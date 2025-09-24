import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./OfficerLayout.css"; 

const OfficerLayout = () => {
  return (
    <div className="officer-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>PMS Officer</h2>
        <nav>
          <NavLink to="/officer/dashboard">Dashboard</NavLink>
          <NavLink to="/officer/post-job">Post Job</NavLink>
          <NavLink to="/officer/view-students">View Students</NavLink>
          <NavLink to="/officer/view-applied-status">View Applied Status</NavLink>
          <NavLink to="/officer/update-status">Update Status</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default OfficerLayout;
