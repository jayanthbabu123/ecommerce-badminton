import React from 'react';
import { Card, Badge, Button, Form } from 'react-bootstrap';
import { Cart3, Heart, Star, StarFill } from 'react-bootstrap-icons';

const ProductCard = ({ product, handleAddToCart }) => {
  const [isInWishlist, setIsInWishlist] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCartHandler = React.useCallback(async () => {
    if (isAddingToCart) return;
    
    try {
      setIsAddingToCart(true);
      await handleAddToCart(product, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, quantity, handleAddToCart, isAddingToCart]);

  return (
    <Card className="h-100 product-card border-0 shadow-sm position-relative">
      <div className="position-absolute top-0 end-0 m-2 z-1">
        <Button
          variant="light"
          size="sm"
          className="rounded-circle shadow-sm p-2"
          onClick={() => setIsInWishlist(!isInWishlist)}
        >
          <Heart
            size={16}
            className={isInWishlist ? "text-danger" : "text-secondary"}
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </Button>
      </div>

      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={product.image || "https://placehold.co/400x400/e9ecef/6c757d?text=No+Image"}
          className="product-image"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400/e9ecef/6c757d?text=No+Image";
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">
            {product.category}
          </Badge>
          <Badge bg="primary">{product.brand}</Badge>
        </div>

        <h5 className="product-title mb-1">{product.name}</h5>
        
        <div className="mb-2 d-flex align-items-center">
          <StarFill className="text-warning me-1" />
          <StarFill className="text-warning me-1" />
          <StarFill className="text-warning me-1" />
          <StarFill className="text-warning me-1" />
          <Star className="text-warning" />
          <span className="ms-2 text-muted small">(4.0)</span>
        </div>

        <p className="text-muted small mb-3">{product.description}</p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0">
              <span className="text-muted small me-1">$</span>
              <span className="text-primary fw-bold">{product.price}</span>
            </h4>
            <Badge 
              bg={product.stock > 0 ? "success" : "danger"}
              className="rounded-pill"
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </Badge>
          </div>

          <div className="quantity-selector mb-2">
            <div className="d-flex align-items-center justify-content-center border rounded">
              <Button
                variant="light"
                size="sm"
                className="border-0"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                −
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                className="border-0 text-center quantity-input"
              />
              <Button
                variant="light"
                size="sm"
                className="border-0"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
          </div>
          <Button
            variant="primary"
            className="w-100 d-flex align-items-center justify-content-center"
            disabled={product.stock === 0 || isAddingToCart}
            onClick={addToCartHandler}
          >
            <Cart3 size={18} className="me-2" />
            {isAddingToCart ? 'Adding...' : `Add ${quantity} to Cart`}
          </Button>
        </div>
      </Card.Body>

      <style jsx="true">{`
        .product-card {
          transition: transform 0.2s ease-in-out;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image-container {
          height: 200px;
          overflow: hidden;
          background-color: #f8f9fa;
        }
        .product-image {
          height: 100%;
          width: 100%;
          object-fit: contain;
          padding: 1rem;
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .product-title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.4em;
          line-height: 1.2;
        }
        .quantity-input {
          width: 60px;
          padding: 0.25rem;
          -moz-appearance: textfield;
        }
        .quantity-input::-webkit-outer-spin-button,
        .quantity-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .quantity-selector button {
          min-width: 32px;
          font-weight: bold;
        }
        .quantity-selector button:hover:not(:disabled) {
          background-color: #e9ecef;
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;
