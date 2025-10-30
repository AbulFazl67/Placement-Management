import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    course: "",
    semester: "",
    skills: "",
    resume: "",
    photo: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Fetch profile on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const userId = storedUser.user_id;

    axios
      .get(`http://localhost:3000/api/profile/${userId}`)
      .then((res) => {
        if (res.data && res.data.data) {
          const data = res.data.data;
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            dob: data.dob || "",
            course: data.course || "",
            semester: data.semester || "",
            skills: data.skills || "",
            resume: data.resume || "",
            photo: data.photo || "",
          });
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/upload-${type}/${storedUser.user_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update state with returned file path
      setProfile({ ...profile, [type]: res.data[type] });
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      alert(`❌ Failed to upload ${type}`);
    }
  };

  const handleSave = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return alert("User not found!");

      const userId = storedUser.user_id;

      await axios.put(`http://localhost:3000/update-profile/${userId}`, {
        phone: profile.phone,
        dob: profile.dob,
        course: profile.course,
        semester: profile.semester,
        skills: profile.skills,
        resume: profile.resume,
        photo: profile.photo,
      });

      alert("✅ Profile Updated Successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ Failed to update profile!");
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 Student Profile</h2>
      <div className="profile-card">

        {/* Photo */}
        <div className="profile-section">
          <label>Photo:</label>
          {editMode ? (
            <input type="file" onChange={(e) => handleFileUpload(e, "photo")} />
          ) : profile.photo ? (
            <img src={`http://localhost:3000${profile.photo}`} alt="Profile" width={100} />
          ) : (
            <p>No Photo Uploaded</p>
          )}
        </div>

        {/* Name */}
        <div className="profile-section">
          <label>Name:</label>
          {editMode ? (
            <input type="text" name="name" value={profile.name} onChange={handleChange} />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="profile-section">
          <label>Email:</label>
          <p>{profile.email}</p>
        </div>

        {/* Phone */}
        <div className="profile-section">
          <label>Phone:</label>
          {editMode ? (
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="profile-section">
          <label>Date of Birth:</label>
          {editMode ? (
            <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
          ) : (
            <p>{profile.dob}</p>
          )}
        </div>

        {/* Course */}
        <div className="profile-section">
          <label>Course:</label>
          {editMode ? (
            <input type="text" name="course" value={profile.course} onChange={handleChange} />
          ) : (
            <p>{profile.course}</p>
          )}
        </div>

        {/* Semester */}
        <div className="profile-section">
          <label>Semester:</label>
          {editMode ? (
            <input type="text" name="semester" value={profile.semester} onChange={handleChange} />
          ) : (
            <p>{profile.semester}</p>
          )}
        </div>

        {/* Skills */}
        <div className="profile-section">
          <label>Skills:</label>
          {editMode ? (
            <textarea name="skills" value={profile.skills} onChange={handleChange} />
          ) : (
            <p>{profile.skills}</p>
          )}
        </div>

        {/* Resume */}
        <div className="profile-section">
          <label>Resume:</label>
          {editMode ? (
            <input type="file" onChange={(e) => handleFileUpload(e, "resume")} />
          ) : profile.resume ? (
            <a href={`http://localhost:3000${profile.resume}`} target="_blank" rel="noreferrer">
              View Resume
            </a>
          ) : (
            <p>No Resume Uploaded</p>
          )}
        </div>

        {/* Buttons */}
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
