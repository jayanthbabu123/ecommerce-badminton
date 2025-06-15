import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

function AddProductModal({
  showModal,
  onClose,
  productData,
  onInputChange,
  onSubmit,
  categoryOptions,
  brandOptions,
  imageUploadProps,
}) {
  const { isUploading, uploadError, handleImageUpload } = imageUploadProps;

  return (
    <Modal show={showModal} onHide={onClose} size="lg">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-primary fs-5">
          <Plus size={20} className="me-2" />
          Add New Product
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
                  value={productData.name}
                  onChange={onInputChange}
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
                  value={productData.description}
                  onChange={onInputChange}
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
                      value={productData.price}
                      onChange={onInputChange}
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
                      value={productData.stock}
                      onChange={onInputChange}
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
                      productData.image ||
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
                    required={!productData.image}
                    className="mt-2"
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="mt-2">
                      <div
                        className="spinner-border spinner-border-sm text-primary me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Uploading...</span>
                      </div>
                      Uploading...
                    </div>
                  )}
                  {uploadError && (
                    <div className="text-danger mt-2 small">{uploadError}</div>
                  )}
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
                  onChange={onInputChange}
                  value={productData.category}
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((category, index) => (
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
                  onChange={onInputChange}
                  required
                  name="brand"
                  value={productData.brand}
                >
                  <option value="">Select brand</option>
                  {brandOptions.map((brand, index) => (
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
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Create Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;
