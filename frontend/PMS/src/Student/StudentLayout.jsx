import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./StudentLayout.css"; 

const StudentLayout = () => {
  return (
    <div className="student-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Student Panel</h2>
        <nav>
          <ul>
            <li><NavLink to="/student/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/student/view-jobs">View Jobs</NavLink></li>
            <li><NavLink to="/student/apply">Apply</NavLink></li>
            <li><NavLink to="/student/view-application-status">Application Status</NavLink></li>
          </ul>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
