import React, { useState, useEffect } from "react";
import "./JobList.css";

const OfficerJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const officerId = storedUser?.user_id;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/officerJobs/${officerId}`);
        const result = await response.json();
        if (response.ok || response.status === 200) {
          setJobs(result.jobs || []);
        } else {
          setMessage(result.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setMessage("Server error. Try again later.");
      }
      setLoading(false);
    };

    if (officerId) fetchJobs();
  }, [officerId]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/deleteJob/${jobId}`, { method: "DELETE" });
      const result = await response.json();
      if (response.ok || response.status === 200) {
        setJobs(jobs.filter(job => job.id !== jobId));
        setMessage("Job deleted successfully");
      } else {
        setMessage(result.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="joblist-container">
      <h2>My Posted Jobs</h2>
      {message && <div className="message">{message}</div>}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <table className="joblist-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Criteria</th>
              <th>Apply Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.criteria}</td>
                <td><a href={job.apply_link} target="_blank" rel="noopener noreferrer">Apply</a></td>
                <td>
                  <button className="edit-btn" onClick={() => alert("Edit feature coming soon")}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OfficerJobList;
