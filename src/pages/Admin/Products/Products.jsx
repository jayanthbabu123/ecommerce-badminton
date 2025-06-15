import { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Pencil, Plus, Trash } from "react-bootstrap-icons";
import api from "../../../services/api";
import ProductCard from "../../../components/admin-products/ProductCard";
import AddProductModal from "../../../components/admin-products/AddProductModal";
import DeleteProductModal from "../../../components/admin-products/DeleteProductModal";
import EditProductModal from "../../../components/admin-products/EditProductModal";

function Products() {
  // State Management
  const [productsList, setProductsList] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);

  // Product Form State
  const [newProductData, setNewProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    stock: 0,
    image: "",
  });

  // Dropdown Options State
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  // Modal Handlers
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const closeEditModal = () => setShowEditModal(false);
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Load Products Data
  useEffect(() => {
    loadProductsData();
  }, []);

  const loadProductsData = async () => {
    try {
      const response = await api.get("/products?page=1&limit=10");
      const products = response.data.data.products;
      setProductsList(products);

      // Extract unique categories and brands
      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];
      const brands = [...new Set(products.map((product) => product.brand))];

      setCategoryList(categories);
      setBrandList(brands);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading products:", error);
      setErrorMessage("Failed to load products");
      setIsLoading(false);
    }
  };

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadError(null);

    if (!file.type.startsWith("image/")) {
      setImageUploadError("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError("Image size should be less than 5MB");
      return;
    }

    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "badminton_preset");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      setNewProductData((prev) => ({
        ...prev,
        image: data.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageUploadError(error.message || "Failed to upload image");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/products", newProductData);
      setProductsList([...productsList, response.data.data]);
      setNewProductData({
        name: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        stock: 0,
        image: "",
      });
      closeAddModal();
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage("Failed to create product");
    }
  };

  const handleProductDelete = async () => {
    try {
      await api.delete(`/products/${productToDelete._id}`);
      setProductsList(
        productsList.filter((p) => p._id !== productToDelete._id)
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Container className="py-4">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  const handleEditClick = (product) => {
    // Logic to open edit modal with product details
    setShowEditModal(true);
    console.log("Edit product:", product);
    setNewProductData(product)
  };

  const handleUpdateProduct = ()=>{
    console.log("Update product:", newProductData);
    api.put(`/products/${newProductData._id}`, newProductData)
      .then((response) => {
        const updatedProducts = productsList.map((product) =>
          product._id === newProductData._id ? response.data.data : product
        );
        setProductsList(updatedProducts);
        closeEditModal();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setErrorMessage("Failed to update product");
      });
  }

  if (errorMessage) {
    return (
      <Layout>
        <Container className="py-4">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid className="py-4 px-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-1">Products</h1>
            <p className="text-muted mb-0">Manage your product inventory</p>
          </div>
          <Button
            variant="primary"
            className="d-flex align-items-center"
            onClick={openAddModal}
          >
            <Plus size={20} className="me-2" />
            Add New Product
          </Button>
        </div>

        {/* Products Grid */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productsList.map((product) => (
            <Col key={product._id}>
              <ProductCard
                productDetails={product}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modals */}
      <AddProductModal
        showModal={showAddModal}
        onClose={closeAddModal}
        productData={newProductData}
        onInputChange={handleInputChange}
        onSubmit={handleProductSubmit}
        categoryOptions={categoryList}
        brandOptions={brandList}
        imageUploadProps={{
          isUploading: isImageUploading,
          uploadError: imageUploadError,
          handleImageUpload,
        }}
      />

      <DeleteProductModal
        showModal={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleProductDelete}
      />
     <EditProductModal
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        newProductData={newProductData}
        handleInputChange={handleInputChange}
        handleUpdateProduct={handleUpdateProduct}
        categoryList={categoryList}
        brandList={brandList}
        handleImageUpload={handleImageUpload}
      />
      
     
    </Layout>
  );
}

export default Products;
