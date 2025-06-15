import { Card, Badge, Button } from "react-bootstrap";
import { BoxSeam, PencilSquare, Trash } from "react-bootstrap-icons";

function ProductCard({ productDetails, onDeleteClick, onEditClick }) {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={
            productDetails.image ||
            "https://placehold.co/400x400/e9ecef/6c757d?text=No+Image"
          }
          className="bg-light"
          style={{
            height: "200px",
            objectFit: "contain",
            padding: "1rem",
          }}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x400/e9ecef/6c757d?text=No+Image";
          }}
        />
        <Badge
          bg={productDetails.stock > 0 ? "success" : "danger"}
          className="position-absolute top-0 end-0 m-2"
        >
          {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">
            {productDetails.category}
          </Badge>
          <Badge bg="info">{productDetails.brand}</Badge>
        </div>

        <Card.Title className="mb-1 fw-bold">{productDetails.name}</Card.Title>
        <Card.Text className="text-muted small mb-3">
          {productDetails.description}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 text-primary">${productDetails.price}</h5>
            <div className="d-flex align-items-center">
              <BoxSeam className="text-secondary me-2" />
              <span className="text-muted small">
                Stock: {productDetails.stock}
              </span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              onClick={() => onEditClick(productDetails)}
              size="sm"
              className="w-100"
            >
              <PencilSquare size={16} className="me-1" /> Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              className="w-100"
              onClick={() => onDeleteClick(productDetails)}
            >
              <Trash size={16} className="me-1" /> Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
