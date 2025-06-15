import { Modal, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

function DeleteProductModal({ showModal, onClose, onConfirm }) {
  return (
    <Modal show={showModal} onHide={onClose} size="md">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-danger fs-5">
          <Trash size={20} className="me-2" />
          Delete Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProductModal;
