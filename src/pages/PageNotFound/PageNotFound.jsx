import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { House, ArrowLeft } from 'react-bootstrap-icons'

function PageNotFound() {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <div className="position-relative d-inline-block">
            <span className="display-4 text-secondary">🏸</span>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              ?
            </span>
          </div>
        </div>
        
        <h2 className="mb-4 text-dark">Page Not Found</h2>
        <p className="mb-4 text-muted">
          Oops! The page you're looking for seems to have gone out of bounds.
          <br />
          Let's get you back in the game!
        </p>
        
        <div className="d-flex gap-3 justify-content-center">
          <Button 
            as={Link} 
            to="/admin-dashboard"
            variant="primary"
            className="d-flex align-items-center"
          >
            <House className="me-2" size={18} />
            Go to Dashboard
          </Button>
          <Button 
            onClick={() => window.history.back()}
            variant="outline-secondary"
            className="d-flex align-items-center"
          >
            <ArrowLeft className="me-2" size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default PageNotFound