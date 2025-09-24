import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./StudentLayout.css";

const StudentLayout = () => {
  return (
    <div className="student-layout">
      {/* Sidebar */}
      <aside className="student-sidebar">
        <h2>Student Panel</h2>
        <nav>
          <ul>
            <li><NavLink to="/student/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
            <li><NavLink to="/student/view-jobs" className={({ isActive }) => isActive ? "active" : ""}>View Jobs</NavLink></li>
            <li><NavLink to="/student/apply" className={({ isActive }) => isActive ? "active" : ""}>Apply</NavLink></li>
            <li><NavLink to="/student/view-application-status" className={({ isActive }) => isActive ? "active" : ""}>Application Status</NavLink></li>
          </ul>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="student-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
