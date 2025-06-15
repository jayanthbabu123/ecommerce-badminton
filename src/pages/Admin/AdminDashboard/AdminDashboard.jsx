import { Container, Row, Col, Card } from "react-bootstrap";
import {
  Cart4,
  People,
  CurrencyDollar,
  Box,
  ArrowUp,
  ArrowDown,
  Calendar2Check,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Sidebar from "../../../components/layout/Sidebar";
import Layout from "../../../components/layout/Layout";
import { useEffect, useState } from "react";
import api from "../../../services/api";

function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get("/products").then((response) => {
      console.log("Products fetched successfully:", response.data.totalProducts);
      setProductsCount(response.data.data.totalProducts);
    })
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Format current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sample data - replace with actual data
  const stats = {
    totalOrders: 150,
    totalCustomers: 89,
    revenue: 15799,
    products: productsCount,
    ordersGrowth: 12.5,
    revenueGrowth: -2.4,
  };

  return (
    <>
      <Layout>
        <Container className="py-4">
          {/* Welcome Section */}
          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="text-secondary mb-1">
                      {getGreeting()} {user?.firstName || "Admin"}
                    </h4>

                    <div className="d-flex align-items-center text-muted">
                      <Calendar2Check size={18} className="me-2" />
                      <span>{getCurrentDate()}</span>
                    </div>
                  </div>
                  <div className="d-none d-md-block">
                    <div className="bg-primary bg-opacity-10 p-4 rounded-circle">
                      <People className="text-primary" size={32} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Stats Cards */}
          <Row className="g-4 mb-4">
            <Col xl={3} sm={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <Cart4 className="text-primary" size={24} />
                    </div>
                    <div
                      className={`d-flex align-items-center ${
                        stats.ordersGrowth >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      <span className="fw-bold">
                        {Math.abs(stats.ordersGrowth)}%
                      </span>
                      {stats.ordersGrowth >= 0 ? (
                        <ArrowUp size={18} />
                      ) : (
                        <ArrowDown size={18} />
                      )}
                    </div>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.totalOrders}</h3>
                  <p className="text-secondary mb-0">Total Orders</p>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <People className="text-success" size={24} />
                    </div>
                    <div className="text-success d-flex align-items-center">
                      <span className="fw-bold">8%</span>
                      <ArrowUp size={18} />
                    </div>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.totalCustomers}</h3>
                  <p className="text-secondary mb-0">Total Customers</p>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-warning bg-opacity-10 p-3 rounded">
                      <CurrencyDollar className="text-warning" size={24} />
                    </div>
                    <div
                      className={`d-flex align-items-center ${
                        stats.revenueGrowth >= 0
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      <span className="fw-bold">
                        {Math.abs(stats.revenueGrowth)}%
                      </span>
                      {stats.revenueGrowth >= 0 ? (
                        <ArrowUp size={18} />
                      ) : (
                        <ArrowDown size={18} />
                      )}
                    </div>
                  </div>
                  <h3 className="fw-bold mb-1">
                    ${stats.revenue.toLocaleString()}
                  </h3>
                  <p className="text-secondary mb-0">Total Revenue</p>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-info bg-opacity-10 p-3 rounded">
                      <Box className="text-info" size={24} />
                    </div>
                    <div className="text-success d-flex align-items-center">
                      <span className="fw-bold">5%</span>
                      <ArrowUp size={18} />
                    </div>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.products}</h3>
                  <p className="text-secondary mb-0">Total Products</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-4">Quick Actions</h5>
                  <Row className="g-4">
                    <Col md={3}>
                      <Link
                        to="/admin-products"
                        className="text-decoration-none"
                      >
                        <button className="btn btn-light text-primary w-100 p-4 d-flex flex-column align-items-center">
                          <Box size={24} className="mb-2" />
                          Add New Product
                        </button>
                      </Link>
                    </Col>
                    <Col md={3}>
                      <button className="btn btn-light text-success w-100 p-4 d-flex flex-column align-items-center">
                        <Cart4 size={24} className="mb-2" />
                        View Orders
                      </button>
                    </Col>
                    <Col md={3}>
                      <button className="btn btn-light text-warning w-100 p-4 d-flex flex-column align-items-center">
                        <People size={24} className="mb-2" />
                        Manage Users
                      </button>
                    </Col>
                    <Col md={3}>
                      <button className="btn btn-light text-info w-100 p-4 d-flex flex-column align-items-center">
                        <CurrencyDollar size={24} className="mb-2" />
                        Revenue Report
                      </button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default AdminDashboard;
