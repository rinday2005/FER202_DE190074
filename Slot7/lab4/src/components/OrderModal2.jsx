import React, { useReducer } from 'react';
import { Button, Modal, Container, Alert } from 'react-bootstrap';

const initialState = {
    isShowModal: false,
    isConfirmed: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, isShowModal: true, isConfirmed: false };
        case 'CLOSE_MODAL':
            return { ...state, isShowModal: false };
        case 'CONFIRM_ORDER':
            return { ...state, isConfirmed: true };
        default:
            return state;
    }
}

function OrderModal2() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleConfirm = () => {
        dispatch({ type: 'CONFIRM_ORDER' });
        setTimeout(() => {
            dispatch({ type: 'CLOSE_MODAL' });
        }, 3000); 
    };


    const onConfirmClick = () => {
        dispatch({ type: 'CONFIRM_ORDER' });
        dispatch({ type: 'CLOSE_MODAL' });
    }

    return (
        <Container className="mt-4">
            <h3>Exercise 2 (useReducer): Order Processing Modal</h3>

            {state.isConfirmed && !state.isShowModal && (
             
                <Alert variant="success" onClose={() => { /* No direct close action in reducer for this? or just ignore */ }} dismissible>
                    Thành công: Đơn hàng đã được chuyển sang bộ phận kho!
                </Alert>
            )}

            <Button variant="primary" onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
                Xử lý đơn hàng
            </Button>

            <Modal show={state.isShowModal} onHide={() => dispatch({ type: 'CLOSE_MODAL' })}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onConfirmClick}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default OrderModal2;
