import React, { useState } from 'react';
import { Button, Modal, Container, Alert } from 'react-bootstrap';

function OrderModal() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleClose = () => setIsShowModal(false);
    const handleShow = () => {
        setIsShowModal(true);
        setShowSuccess(false);
    };

    const handleConfirm = () => {
        setShowSuccess(true);
        setIsShowModal(false);
    };

    return (
        <Container className="mt-4">
            <h3>Exercise 2: Order Processing Modal</h3>

            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                    Thành công: Đơn hàng đã được chuyển sang bộ phận kho!
                </Alert>
            )}

            <Button variant="primary" onClick={handleShow}>
                Xử lý đơn hàng
            </Button>

            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default OrderModal;
