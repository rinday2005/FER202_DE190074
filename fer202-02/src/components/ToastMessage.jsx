import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ show, onClose, message, bg = 'success' }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={onClose} delay={3000} autohide bg={bg}>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body className={bg === 'success' ? 'text-white' : ''}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastMessage;
