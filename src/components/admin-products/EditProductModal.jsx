import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Pencil, Plus } from "react-bootstrap-icons";

function EditProductModal({
    showEditModal,
    closeEditModal,
    newProductData,
    handleInputChange,
    handleUpdateProduct,
    handleImageUpload,
    categoryList,
    brandList,
}) {
  return (
     <Modal show={showEditModal} onHide={closeEditModal} size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-info fs-5">
            <Pencil size={20} className="me-2" />
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row className="mb-4">
              <Col md={8}>
                <Form.Group controlId="formProductName" className="mb-3">
                  <Form.Label>
                    Product Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    required
                    name="name"
                    value={newProductData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formProductDescription" className="mb-3">
                  <Form.Label>
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    required
                    name="description"
                    value={newProductData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formProductPrice" className="mb-3">
                      <Form.Label>
                        Price ($) <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                        name="price"
                        value={newProductData.price}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formProductStock" className="mb-3">
                      <Form.Label>
                        Stock Quantity <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        min="0"
                        required
                        name="stock"
                        value={newProductData.stock}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formProductImage" className="mb-3">
                  <Form.Label>
                    Product Image <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="border rounded p-3 text-center mb-2 bg-light">
                    <img
                      src={
                        newProductData.image ||
                        "https://placehold.co/400x400/e9ecef/6c757d?text=Upload+Image"
                      }
                      alt="Product preview"
                      className="img-fluid mb-2"
                      style={{
                        maxHeight: "150px",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/400x400/e9ecef/6c757d?text=Invalid+Image";
                      }}
                    />
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required={!newProductData.image}
                      className="mt-2"
                      
                    />
                    
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formProductCategory">
                  <Form.Label>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    required
                    name="category"
                    onChange={handleInputChange}
                    value={newProductData.category}
                  >
                    <option value="">Select category</option>
                    {categoryList.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formProductBrand">
                  <Form.Label>
                    Brand <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    onChange={handleInputChange}
                    required
                    name="brand"
                    value={newProductData.brand}
                  >
                    <option value="">Select brand</option>
                    {brandList.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleUpdateProduct}>Update Product</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditProductModal;
