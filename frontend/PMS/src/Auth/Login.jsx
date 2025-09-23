import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

const handleLogin = async (e) => {
  e.preventDefault();

  if (!user.email || !user.password) {
    alert("Please enter both email and password.");
    return;
  }

 try {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.email,  // ya email, backend k hisab se
      password: user.password,
    }),
  });

  console.log("Response status:", response.status);   // 👈 ye print karega status code
  const data = await response.json();
  console.log("API Response:", data);                 // 👈 ye print karega backend ka JSON

  if (response.ok && data.result && data.result.length > 0) {
    const loggedInUser = data.result[0];
    alert("Login Successful!");

    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard");
    } else if (loggedInUser.role === "officer") {
      navigate("/officer/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  } else {
    alert("Invalid email or password!");
  }
} catch (error) {
  console.error("Fetch Error:", error);  // 👈 exact error console me aayega
  alert("Something went wrong, please try again!");
}

};


  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2 className="reg-logo">Placement Management System</h2>
          <h3>Welcome Back!</h3>

          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn">Log In</button>
          </form>

          <p className="or-text">or</p>

          <p className="bottom-text">
            Don’t have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
