import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../../components/layout/Layout";
import api from "../../../services/api";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Search, Filter } from "react-bootstrap-icons";
import ProductCard from "../../../components/user-products/ProductCard";

function UserProducts() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products?page=1&limit=10");
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  const handleAddToCart = useCallback(async (product, quantity) => {
    return new Promise((resolve) => {
      setCartItems((prevItems) => {
        // Find existing item
        const existingItemIndex = prevItems.findIndex(
          (cartItem) => cartItem._id === product._id
        );

        let newItems;
        if (existingItemIndex !== -1) {
          // Update existing item
          newItems = prevItems.map((item, index) => 
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          newItems = [...prevItems, { ...product, quantity }];
        }

        // Here you would typically make an API call to update the cart on the server
        // For example: await api.post('/cart', { productId: product._id, quantity });

        resolve(); // Resolve the promise after state update
        return newItems;
      });
    });
  }, []);

  return (
    <Layout>
      <Container fluid className="py-4 px-4">
        {/* Header & Search Section */}
        <div className="mb-4">
          <h3 className="mb-1">Browse Products</h3>
          <p className="text-muted mb-4">
            Find your perfect badminton equipment
          </p>

          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search products..."
                  className="border-start-0 ps-0"
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="">All Categories</option>
                <option value="rackets">Rackets</option>
                <option value="shuttlecocks">Shuttlecocks</option>
                <option value="strings">Strings</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </Form.Select>
            </Col>
          </Row>
        </div>

        {/* Products Grid */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <ProductCard
                handleAddToCart={handleAddToCart}
                product={product}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}

export default UserProducts;
