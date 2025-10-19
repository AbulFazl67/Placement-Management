// import { useEffect, useState } from "react";
// import axios from "axios";

// const ViewJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const student = JSON.parse(localStorage.getItem("user")); 

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/student/jobs")
//       .then(res => setJobs(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleApply = async (jobId) => {
//     try {
//       await axios.post("http://localhost:3000/api/student/apply", {
//         student_id: student.user_id, 
//         job_id: jobId
//       });
//       alert("Applied successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to apply");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Available Jobs</h2>
//       {jobs.length === 0 ? (
//         <p>No jobs available</p>
//       ) : (
//         <ul>
//           {jobs.map((job) => (
//             <li key={job.job_id}>
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//               <button onClick={() => handleApply(job.job_id)}>Apply</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewJobs;

import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import "./ViewJobs.css"; // CSS file import

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const student = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/student/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApply = async (jobId) => {
    try {
      await axios.post("http://localhost:3000/api/student/apply", {
        student_id: student.user_id,
        job_id: jobId,
      });
      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="viewjobs-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Placement Management System</h1>
          <div className="profile-icon">
            {student?.name?.[0]?.toUpperCase() || "S"}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-section">
        <div className="main-header">
          <h2>Available Job Openings</h2>
          <p>Browse and apply to the latest opportunities from top companies</p>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search jobs by title or company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Job listing */}
        <div className="job-list">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs">No jobs found matching your search.</div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.job_id} className="job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                  <div className="job-details">
                    <span>📍 {job.location || "Location not specified"}</span>
                    <span>💼 {job.type || "Full-time"}</span>
                    <span>💰 {job.salary || "N/A"}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.job_id)}
                  className="apply-btn"
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewJobs;
