import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import "./ViewStudents.css";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/getStudents")
      .then(res => setStudents(res.data.students))
      .catch(err => console.error(err));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/officer/student-details/${id}`);
  };

  return (
    <div className="student-container">
      <h2>All Registered Students</h2>
      <div className="student-list">
        {students.map((stu) => (
          <div className="student-card" key={stu.user_id}>
            <div>
              <h3>{stu.name}</h3>
              <p>{stu.email}</p>
            </div>
            <div
              className="arrow-icon"
              onClick={() => handleViewDetails(stu.user_id)}
            >
              <ArrowRight
                data-tooltip-id={`tip-${stu.user_id}`}
                data-tooltip-content="View Applied Jobs"
                className="arrow-icon"
              />
              <Tooltip id={`tip-${stu.user_id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudents;
