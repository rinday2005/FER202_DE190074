import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, handleClose, title, message, onContinue }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || 'Notification'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center py-4">
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center border-0">
                <Button variant="success" onClick={onContinue} className="px-5">
                    Continue
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
