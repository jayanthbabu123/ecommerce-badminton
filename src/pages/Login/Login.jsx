import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the login logic, e.g., API call
    console.log("Login submitted", credentials);
    axios
      .post("http://localhost:3001/api/signin", credentials)
      .then((response) => {
        console.log("Login successful", response.data.data);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        if (response.data.data.user.role == "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={handleInputChange}
                value={credentials.email}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={handleInputChange}
                value={credentials.password}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
