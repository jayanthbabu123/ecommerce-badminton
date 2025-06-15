import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Box,
  Cart4,
  People,
  BarChart,
  PersonCircle,
} from "react-bootstrap-icons";

function Sidebar() {
  const location = useLocation();

  const adminRoutes = [
    {
      path: "/admin-dashboard",
      icon: House,
      label: "Dashboard",
      bgColor: "primary",
    },
    {
      path: "/admin-products",
      icon: Box,
      label: "Products",
      bgColor: "success",
    },
  ];
  const userRoutes = [
    {
      path: "/user-dashboard",
      icon: House,
      label: "Dashboard",
      bgColor: "primary",
    },
    {
      path: "/user-products",
      icon: Cart4,
      label: "Products",
      bgColor: "success",
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const menuItems = isAdmin ? adminRoutes : userRoutes;

  return (
    <div
      className="d-flex flex-column bg-white border-end min-vh-100"
      style={{ width: "280px", transition: "all 0.3s ease" }}
    >
      {/* Admin Profile Quick View */}
      <div className="px-4 py-3 border-bottom bg-light">
        <div className="d-flex align-items-center">
          <div className="bg-white shadow-sm p-2 rounded-circle">
            <PersonCircle size={24} className="text-primary" />
          </div>
          <div className="ms-3">
            <div className="fw-semibold text-dark text-capitalize">
              {user.firstName} {user.lastName}
            </div>
            <small className="text-muted">
              {isAdmin ? "Administrator" : "Regular User"}
            </small>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <Nav className="flex-column p-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`d-flex align-items-center rounded-3 p-3 mx-2 my-1 ${
                isActive
                  ? `bg-${item.bgColor} bg-opacity-10 text-${item.bgColor}`
                  : "text-secondary"
              }`}
              style={{
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  backgroundColor: isActive ? "" : "#f8f9fa",
                },
              }}
            >
              <div
                className={`d-flex align-items-center justify-content-center rounded-circle 
                ${
                  isActive
                    ? `bg-${item.bgColor} bg-opacity-15 p-2`
                    : "bg-light p-2"
                }`}
              >
                <IconComponent
                  size={20}
                  className={
                    isActive ? `text-${item.bgColor}` : "text-secondary"
                  }
                />
              </div>
              <span
                className={`ms-3 fw-medium ${isActive ? "fw-semibold" : ""}`}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  className={`ms-auto rounded-pill bg-${item.bgColor}`}
                  style={{ width: "6px", height: "6px" }}
                ></div>
              )}
            </Nav.Link>
          );
        })}
      </Nav>

      {/* Bottom Section */}
      <div className="mt-auto p-4 border-top bg-light">
        <div className="d-flex align-items-center justify-content-between text-muted small">
          <div>© 2025</div>
          <div>BadmintonStore</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
