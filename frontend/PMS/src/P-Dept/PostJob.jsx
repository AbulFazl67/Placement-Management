import React, { useState, useEffect } from "react";
import "./postjob.css";

const PostJob = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    officer_id: "",
    title: "",
    description: "",
    criteria: "",
    apply_link: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
      setFormData((prev) => ({
        ...prev,
        officer_id: parsedUser.user_id || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.title || !formData.description || !formData.criteria || !formData.apply_link) {
      setMessage({ text: "All fields are required", type: "error" });
      return false;
    }
    // Basic URL validation
    try {
      new URL(formData.apply_link);
    } catch {
      setMessage({ text: "Invalid Apply Link URL", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/postJobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({ text: "Job posted successfully!", type: "success" });
        setFormData((prev) => ({
          ...prev,
          title: "",
          description: "",
          criteria: "",
          apply_link: "",
        }));
      } else {
        setMessage({ text: result.message || "Failed to post job", type: "error" });
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setMessage({ text: "Server error. Try again later.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="postjob-container">
      <h2>Post a New Job</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="postjob-form">
        <div className="form-group">
          <label>Officer ID</label>
          <input
            type="text"
            name="officer_id"
            value={formData.officer_id}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Eligibility Criteria</label>
          <textarea
            name="criteria"
            value={formData.criteria}
            onChange={handleChange}
            placeholder="e.g., MCA, B.Tech, min 60%..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>Apply Link</label>
          <input
            type="text"
            name="apply_link"
            value={formData.apply_link}
            onChange={handleChange}
            placeholder="https://company.com/careers/apply"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
