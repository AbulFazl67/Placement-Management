// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { BiShow, BiHide } from "react-icons/bi";
// import "./Auth.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false); 

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!user.email || !user.password) {
//       alert("Please enter both email and password.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: user.email,  
//           password: user.password,
//         }),
//       });

//       console.log("Response status:", response.status);
//       const data = await response.json();
//       console.log("API Response:", data);

//       if (response.ok && data.result && data.result.length > 0) {
//         const loggedInUser = data.result[0];
//         alert("Login Successful!");

//         if (loggedInUser.role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (loggedInUser.role === "officer") {
//           navigate("/officer/dashboard");
//         } else {
//           navigate("/student/dashboard");
//         }
//       } else {
//         alert("Invalid email or password!");
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       alert("Something went wrong, please try again!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <div className="auth-form">
//           <h2 className="reg-logo">Placement Management System</h2>
//           <h3>Welcome Back!</h3>

//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={user.email}
//               onChange={(e) => setUser({ ...user, email: e.target.value })}
//             />

//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"} 
//                 placeholder="Password"
//                 value={user.password}
//                 onChange={(e) => setUser({ ...user, password: e.target.value })}
//               />
//               <span
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <BiHide /> : <BiShow />}
//               </span>
//             </div>

//             <button type="submit" className="btn">Log In</button>
//           </form>

//           <p className="or-text">or</p>

//           <p className="bottom-text">
//             Don’t have an account? <NavLink to="/register">Register</NavLink>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.warn("login called")
    if (!user.email || !user.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      console.warn("callinh apu")
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.user) {
        const loggedInUser = data.user;
        alert("Login Successful!");

        if (loggedInUser.role === "admin") {
          navigate("/admin/dashboard");
        } else if (loggedInUser.role === "officer") {
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          navigate("/officer/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        alert(data.error || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
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

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </span>
            </div>

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
