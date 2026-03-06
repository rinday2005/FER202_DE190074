import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, handleClose, handleConfirm, title, message, confirmText = 'Confirm', confirmVariant = 'primary' }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant={confirmVariant} onClick={handleConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
