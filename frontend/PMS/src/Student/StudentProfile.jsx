import React, { useState } from "react";
import "./StudentProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "Abul Fazl",
    email: "abul@gmail.com",
    phone: "9876543210",
    dob: "2003-05-10",
    course: "MCA",
    semester: "1st Year",
    skills: "React, HTML, CSS, MySQL",
    resume: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // backend call here (axios/fetch)
    alert("Profile Updated Successfully ✅");
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2>👤 Student Profile</h2>

      <div className="profile-card">
        <div className="profile-section">
          <label>Name:</label>
          {editMode ? (
            <input type="text" name="name" value={profile.name} onChange={handleChange} />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Email:</label>
          <p>{profile.email}</p>
        </div>

        <div className="profile-section">
          <label>Phone:</label>
          {editMode ? (
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Date of Birth:</label>
          {editMode ? (
            <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
          ) : (
            <p>{profile.dob}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Course:</label>
          {editMode ? (
            <input type="text" name="course" value={profile.course} onChange={handleChange} />
          ) : (
            <p>{profile.course}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Semester:</label>
          {editMode ? (
            <input type="text" name="semester" value={profile.semester} onChange={handleChange} />
          ) : (
            <p>{profile.semester}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Skills:</label>
          {editMode ? (
            <textarea name="skills" value={profile.skills} onChange={handleChange} />
          ) : (
            <p>{profile.skills}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Resume:</label>
          {editMode ? (
            <input type="file" name="resume" />
          ) : profile.resume ? (
            <a href={profile.resume} target="_blank" rel="noreferrer">View Resume</a>
          ) : (
            <p>No Resume Uploaded</p>
          )}
        </div>

        <div className="profile-buttons">
          {editMode ? (
            <>
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
