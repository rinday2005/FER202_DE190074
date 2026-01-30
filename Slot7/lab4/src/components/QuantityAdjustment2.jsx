import React, { useReducer } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count > 0 ? state.count - 1 : 0 };
        case 'SET_INPUT':
            const newValue = parseInt(action.payload, 10);
            return { count: isNaN(newValue) || newValue < 0 ? 0 : newValue };
        default:
            return state;
    }
}

function QuantityAdjustment2() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Container className="mt-4 text-center">
            <h3>Exercise 1 (useReducer): Quantity Adjustment</h3>
            <InputGroup className="mb-3 mx-auto mt-3" style={{ maxWidth: '200px' }}>
                <Button variant="outline-secondary" onClick={() => dispatch({ type: 'DECREMENT' })}>-</Button>
                <Form.Control
                    className="text-center"
                    value={state.count}
                    onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
                />
                <Button variant="outline-secondary" onClick={() => dispatch({ type: 'INCREMENT' })}>+</Button>
            </InputGroup>
        </Container>
    );
}

export default QuantityAdjustment2;
