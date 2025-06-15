import React from "react";
import Layout from "../../../components/layout/Layout";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ListGroup,
  Table,
} from "react-bootstrap";
import {
  BoxSeam,
  Cart4,
  Heart,
  GearFill,
  Receipt,
  ChevronRight,
  CreditCard2Front,
  PersonCircle,
} from "react-bootstrap-icons";

function UserDashboard({ user }) {
  // Sample data - Replace with actual data from your API
  const recentOrders = [
    {
      id: "ORD001",
      date: "2025-06-10",
      items: 3,
      status: "Delivered",
      total: 299.97,
    },
    {
      id: "ORD002",
      date: "2025-06-13",
      items: 1,
      status: "Processing",
      total: 89.99,
    },
  ];

  const userStats = {
    totalOrders: 5,
    wishlistItems: 8,
    cartItems: 2,
    savedAddresses: 2,
  };
  
  const userName = user.firstName || "User";
  const greeting = `Welcome back, ${userName}`;

  return (
    <Layout>
      <Container fluid className="py-4 px-4 bg-light min-vh-100">
        {/* Welcome Section */}
        <div className="mb-4">
          <h1 className="display-6 mb-1 text-capitalize">{greeting}</h1>
          <p className="text-muted mb-0">
            Here's what's happening with your account.
          </p>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <Receipt className="text-primary" size={24} />
                </div>
                <div>
                  <h6 className="fw-normal text-muted mb-0">Total Orders</h6>
                  <h4 className="fw-bold mb-0">{userStats.totalOrders}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                  <Heart className="text-danger" size={24} />
                </div>
                <div>
                  <h6 className="fw-normal text-muted mb-0">Wishlist</h6>
                  <h4 className="fw-bold mb-0">{userStats.wishlistItems}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <Cart4 className="text-success" size={24} />
                </div>
                <div>
                  <h6 className="fw-normal text-muted mb-0">Cart Items</h6>
                  <h4 className="fw-bold mb-0">{userStats.cartItems}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <BoxSeam className="text-info" size={24} />
                </div>
                <div>
                  <h6 className="fw-normal text-muted mb-0">Saved Addresses</h6>
                  <h4 className="fw-bold mb-0">{userStats.savedAddresses}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Recent Orders */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Orders</h5>
                  <Button variant="link" className="text-decoration-none p-0">
                    View All
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Table responsive hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.items} items</td>
                        <td>
                          <Badge
                            bg={
                              order.status === "Delivered"
                                ? "success"
                                : "warning"
                            }
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td>${order.total}</td>
                        <td>
                          <Button variant="link" className="p-0">
                            <ChevronRight />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Quick Actions */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item
                  action
                  className="py-3 d-flex align-items-center"
                >
                  <PersonCircle className="text-primary me-3" size={24} />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Edit Profile</h6>
                    <small className="text-muted">
                      Update your personal information
                    </small>
                  </div>
                  <ChevronRight className="ms-2" />
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  className="py-3 d-flex align-items-center"
                >
                  <CreditCard2Front className="text-success me-3" size={24} />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Payment Methods</h6>
                    <small className="text-muted">
                      Manage your payment options
                    </small>
                  </div>
                  <ChevronRight className="ms-2" />
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  className="py-3 d-flex align-items-center"
                >
                  <BoxSeam className="text-info me-3" size={24} />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Shipping Addresses</h6>
                    <small className="text-muted">
                      Manage delivery addresses
                    </small>
                  </div>
                  <ChevronRight className="ms-2" />
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  className="py-3 d-flex align-items-center"
                >
                  <GearFill className="text-secondary me-3" size={24} />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Account Settings</h6>
                    <small className="text-muted">
                      Customize your preferences
                    </small>
                  </div>
                  <ChevronRight className="ms-2" />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default UserDashboard;
