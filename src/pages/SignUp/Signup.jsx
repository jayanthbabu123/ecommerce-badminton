import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function SignupForm() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    axios
      .post("http://localhost:3001/api/signup", userDetails)
      .then((response) => {
        console.log("User created successfully:", response.data);
        setErrors([]);
        navigate("/login", {
          state: { message: "User created successfully. Please log in." },
          replace: true,  // Use replace to avoid going back to the signup page
        });
      })
      .catch((error) => {
        console.error("There was an error creating the user:", error);
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response?.data?.message) {
          setErrors([{ message: error.response.data.message }]);
        } else if (error.message) {
          setErrors([{ message: 'Looks like the server is down. Please try after some time' }]);
        } else {
          setErrors([{ message: "An unexpected error occurred." }]);
        }
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Create Account</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                value={userDetails.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={userDetails.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={userDetails.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={userDetails.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={userDetails.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            {errors.length > 0 && (
              <div className="alert alert-danger mt-3">
                <ul className="mb-0">
                  {errors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-3">
              <p className="mb-0 text-center">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
