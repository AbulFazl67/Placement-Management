import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {

    const studentData = JSON.parse(localStorage.getItem("user"));

    if (studentData) {
      setStudentName(studentData.name);
      setStudentEmail(studentData.email);
      setAppliedJobs(studentData.appliedJobs || 0);
      setPending(studentData.pending || 0);
      setAccepted(studentData.accepted || 0);
      setRejected(studentData.rejected || 0);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {studentName || "Student"}! 👋</h1>
        <p>Email: {studentEmail || "example@student.com"}</p>
        <p>Here's a summary of your placement activities.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{appliedJobs}</div>
          <div className="stat-label">Total Applied</div>
        </div>

        <div className="stat-card pending">
          <div className="stat-number">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>

        <div className="stat-card accepted">
          <div className="stat-number">{accepted}</div>
          <div className="stat-label">Accepted</div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-number">{rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
