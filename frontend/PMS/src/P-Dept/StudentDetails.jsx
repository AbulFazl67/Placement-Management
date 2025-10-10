import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams(); // route se student_id le raha
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/getStudentsApplications/${id}`)
      .then(res => setApplications(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Loading student data...</p>;

  if (applications.length === 0) return <p className="no-data">No applications found for this student.</p>;

  return (
    <div className="student-details-container">
      <h2>Student Applications</h2>
      {applications.map((app) => (
        <div className="application-card" key={app.student_id}>
          <div className="student-info">
            <h3>{app.name}</h3>
            <p>Email: {app.email}</p>
            <p>Role: {app.role}</p>
          </div>
          <div className="job-info">
            <h4>Applied Job</h4>
            <p>Title: {app.job_title}</p>
            <p>Status: <span className={`status ${app.application_status.toLowerCase()}`}>{app.application_status}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentDetails;
    