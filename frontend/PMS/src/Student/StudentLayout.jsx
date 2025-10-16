import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./StudentLayout.css";

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/");
  };

  return (
    <div className="student-layout">
      <aside className="student-sidebar">
        <h2>Student Panel</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/view-jobs"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                View Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/apply"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Apply
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/view-application-status"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Application Status
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
      <main className="student-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
