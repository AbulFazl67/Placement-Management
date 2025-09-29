import React, { useState  , useEffect} from "react";
import "./P-Dept.css";

const PostJob = () => {

    const [userInfo, setUserInfo] = useState(null)
  const [formData, setFormData] = useState({
    officer_id:"",
    title: "",
    description: "",
    criteria: "",
    apply_link: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // string -> object
      setUserInfo(parsedUser);

      // agar officer_id chahiye to direct set kar do
      setFormData((prev) => ({
        ...prev,
        officer_id: parsedUser.id || parsedUser.officer_id || "" 
      }));
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/postJobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.result || result.message);
      if (response.ok) {
        setFormData({
          officer_id: "",
          title: "",
          description: "",
          criteria: "",
          apply_link: ""
        });
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };

  return (
    <div className="postjob-container">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit} className="postjob-form">
        <div className="form-group">
          <label>Officer ID</label>
          <input
            type="text"
            name="officer_id"
            value={formData.officer_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter job description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Eligibility Criteria</label>
          <textarea
            name="criteria"
            value={formData.criteria}
            onChange={handleChange}
            required
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
            required
            placeholder="https://company.com/careers/apply"
          />
        </div>

        <button type="submit" className="btn-submit">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
