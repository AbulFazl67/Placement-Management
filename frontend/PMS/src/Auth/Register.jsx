import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // get old users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate email
    const userExists = users.some((u) => u.email === user.email);
    if (userExists) {
      alert("User with this email already exists!");
      return;
    }

    // save new user
    users.push({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    // clear form
    setUser({ name: "", email: "", password: "", confirmPassword: "" });

    // redirect to login page
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2 className="reg-logo">Placement Management System</h2>
          <h3>Create Account</h3>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <button type="submit" className="btn">Register</button>
          </form>

          <p className="or-text">or</p>

          <p className="bottom-text">
            Already have an account? <NavLink to="/">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
