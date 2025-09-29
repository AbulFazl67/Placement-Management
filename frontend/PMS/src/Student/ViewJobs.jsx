// import React from "react";

// const ViewJobs = () => {
//   return (
//     <div>
//       <h1>Available Jobs</h1>
//       <p>List of jobs will be shown here (fetch from backend later).</p>
//     </div>
//   );
// };

// export default ViewJobs;

import { useEffect, useState } from "react";
import axios from "axios";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const student = JSON.parse(localStorage.getItem("user")); // login ke baad save kiya tha

  useEffect(() => {
    axios.get("http://localhost:3000/api/student/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApply = async (jobId) => {
    try {
      await axios.post("http://localhost:3000/api/student/apply", {
        student_id: student.user_id, 
        job_id: jobId
      });
      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply");
    }
  };

  return (
    <div className="container">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.job_id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => handleApply(job.job_id)}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewJobs;
