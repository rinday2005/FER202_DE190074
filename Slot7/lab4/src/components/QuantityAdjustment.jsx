import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';

function QuantityAdjustment() {
    const [quantity, setQuantity] = useState(0);

    const handleValid = (type) => {
        if (type === 'increase') {
            setQuantity(quantity + 1);
        } else if (type === 'decrease') {
            if (quantity > 0) {
                setQuantity(quantity - 1);
            }
        }
    };

    return (
        <Container className="mt-4 text-center">
            <h3>Exercise 1: Quantity Adjustment</h3>
            <InputGroup className="mb-3 mx-auto mt-3" style={{ maxWidth: '200px' }}>
                <Button variant="outline-secondary" onClick={() => handleValid('decrease')}>-</Button>
                <Form.Control className="text-center" value={quantity} readOnly />
                <Button variant="outline-secondary" onClick={() => handleValid('increase')}>+</Button>
            </InputGroup>
        </Container>
    );
}

export default QuantityAdjustment;
