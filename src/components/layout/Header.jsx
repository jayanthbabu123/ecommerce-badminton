import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { PersonCircle, PersonGear, BoxArrowRight } from "react-bootstrap-icons";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };
  const userRoutes = [
    { name: "Dashboard", path: "/user-dashboard" },
    { name: "Products", path: "/user-products" },
  ];
  const adminRoutes = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Products", path: "/admin-products" },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";
  const routes = isAdmin ? adminRoutes : userRoutes;

  return (
    <Navbar bg="primary" expand="lg" className="shadow-sm" variant="dark">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center text-white"
        >
          {/* You can replace this with your logo image */}
          <span className="fw-bold">🏸 BadmintonStore</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {routes.map((route) => (
              <Nav.Link
                key={route.name}
                as={Link}
                to={route.path}
                className="text-white"
              >
                {route.name}
              </Nav.Link>
            ))}
            <NavDropdown
              title={<PersonCircle size={24} color="white" />}
              id="user-nav-dropdown"
              align="end"
              className="ms-3"
            >
              <NavDropdown.Item as={Link} to="/profile">
                <PersonGear className="me-2" size={18} /> Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <BoxArrowRight className="me-2" size={18} /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
