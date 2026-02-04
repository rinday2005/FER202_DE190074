import React, { useState, useReducer } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const initialState = {
    values: {
        name: '',
        email: '',
        subject: '',
        message: ''
    },
    errors: {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.field]: action.value
                },
                errors: {
                    ...state.errors,
                    [action.field]: ''
                }
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.error
                }
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

function Contact() {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [validated, setValidated] = useState(false);

    const validateField = (field, value) => {
        let error = '';
        switch (field) {
            case 'name':
                if (value.trim() === '') {
                    error = 'Name is required';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'subject':
                if (value.trim() === '') {
                    error = 'Subject is required';
                }
                break;
            case 'message':
                if (value.trim() === '') {
                    error = 'Message is required';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const validateForm = () => {
        let isValid = true;
        Object.keys(state.values).forEach((field) => {
            const error = validateField(field, state.values[field]);
            if (error) {
                dispatch({ type: 'SET_ERROR', field, error });
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Contact form submitted:', state.values);
            dispatch({ type: 'RESET_FORM' });
            setValidated(false);
            alert("Message sent successfully!");
        } else {
            setValidated(true);
        }
    };

    const handleBlur = (field) => {
        const error = validateField(field, state.values[field]);
        if (error) {
            dispatch({ type: 'SET_ERROR', field, error });
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={state.values.name}
                            onChange={(e) => dispatch({ type: 'SET_VALUE', field: 'name', value: e.target.value })}
                            onBlur={() => handleBlur('name')}
                            isInvalid={!!state.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={state.values.email}
                            onChange={(e) => dispatch({ type: 'SET_VALUE', field: 'email', value: e.target.value })}
                            onBlur={() => handleBlur('email')}
                            isInvalid={!!state.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        placeholder="Subject"
                        value={state.values.subject}
                        onChange={(e) => dispatch({ type: 'SET_VALUE', field: 'subject', value: e.target.value })}
                        onBlur={() => handleBlur('subject')}
                        isInvalid={!!state.errors.subject}
                    />
                    <Form.Control.Feedback type="invalid">
                        {state.errors.subject}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={state.values.message}
                        onChange={(e) => dispatch({ type: 'SET_VALUE', field: 'message', value: e.target.value })}
                        onBlur={() => handleBlur('message')}
                        isInvalid={!!state.errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                        {state.errors.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send Message
                </Button>
            </Form>
        </Container>
    );
}

export default Contact;
