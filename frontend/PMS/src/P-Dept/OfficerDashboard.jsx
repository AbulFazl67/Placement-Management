// import React from 'react'

// const OfficerDashboard = () => {
//   return (
//     <div>OfficerDashboard</div>
//   )
// }

// export default OfficerDashboard

import React from "react";
import "./OfficerDashboard.css";

const stats = [
  { title: "Total Jobs Posted", value: 24, color: "blue", trend: "+3 this month" },
  { title: "Applications Pending", value: 156, color: "yellow", trend: "Awaiting review" },
  { title: "Applications Accepted", value: 89, color: "green", trend: "+12 this week" },
  { title: "Applications Rejected", value: 34, color: "red", trend: "Last updated today" },
];

const recentActivities = [
  { action: "New application received", student: "Priya Sharma", job: "Software Developer - TCS", time: "2 hours ago" },
  { action: "Application accepted", student: "Amit Patel", job: "Data Analyst - Infosys", time: "5 hours ago" },
  { action: "New job posted", student: "—", job: "Full Stack Developer - Wipro", time: "1 day ago" },
  { action: "Application rejected", student: "Sneha Reddy", job: "UI/UX Designer - HCL", time: "2 days ago" },
];

const OfficerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h2>Welcome Back, Officer!</h2>
        <p>Here's the overview of today's placement activities.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`card stat-card ${stat.color}`}>
            <div className="card-content">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-trend">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="card chart-card">
          <h3>Monthly Application Trends</h3>
          <p className="subtitle">Overview of the last 6 months</p>
          <div className="chart-placeholder">[Bar Chart Placeholder]</div>
        </div>

        <div className="card chart-card">
          <h3>Status Distribution</h3>
          <p className="subtitle">Current application status</p>
          <div className="chart-placeholder">[Pie Chart Placeholder]</div>
        </div>
      </div>

      <div className="card activities-card">
        <h3>Recent Activities</h3>
        <p className="subtitle">Latest updates on jobs and applications</p>
        <div className="activities-list">
          {recentActivities.map((act, idx) => (
            <div key={idx} className="activity-item">
              <div className="activity-info">
                <p className="action">{act.action}</p>
                <p className="details">{act.student !== "—" ? `${act.student} - ${act.job}` : act.job}</p>
              </div>
              <span className="time">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
