// import React from "react";

// const ViewApplicationStatus = () => {
//   return (
//     <div>
//       <h1>Application Status</h1>
//       <p>Your applied jobs and their status will appear here.</p>
//     </div>
//   );
// };

// export default ViewApplicationStatus;


import { useEffect, useState } from "react";
import axios from "axios";

const ViewApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const student = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:3000/api/student/applications/${student.user_id}`)
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.application_id}>
                <td>{app.title}</td>
                <td>{app.description}</td>
                <td>{app.status}</td>
                <td>{new Date(app.applied_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewApplicationStatus;
