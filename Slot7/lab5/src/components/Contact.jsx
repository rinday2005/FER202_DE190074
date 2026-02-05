import React, { useReducer } from 'react';
import { Container, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';

const initialState = {
    values: {
        firstName: 'Mark',
        lastName: 'Otto',
        username: '',
        city: '',
        state: '',
        zip: '',
        agree: false
    },
    errors: {
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        zip: '',
        agree: ''
    },
    showSuccess: false
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
                },
                showSuccess: false
            };
        case 'SET_CHECKED':
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.field]: action.checked
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
        case 'SET_ALL_ERRORS':
            return {
                ...state,
                errors: action.errors
            };
        case 'RESET_FORM':
            return {
                ...initialState,
                showSuccess: true
            };
        default:
            return state;
    }
};

function Contact() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const validateField = (field, value) => {
        let error = '';
        if (field === 'agree') {
            if (!value) error = 'You must agree before submitting.';
        } else {
            if (!value || (typeof value === 'string' && !value.trim())) {
                error = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`;
            }
        }
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name !== 'agree') {
            const error = validateField(name, value);
            if (error) {
                dispatch({ type: 'SET_ERROR', field: name, error });
            }
        }
    };

    const handleChange = (e) => {
        dispatch({
            type: 'SET_VALUE',
            field: e.target.name,
            value: e.target.value
        });
    };

    const handleCheck = (e) => {
        dispatch({
            type: 'SET_CHECKED',
            field: e.target.name,
            checked: e.target.checked
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
        let isValid = true;

        Object.keys(state.values).forEach(field => {
            const error = validateField(field, state.values[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        if (isValid) {
            dispatch({ type: 'RESET_FORM' });
        } else {
            dispatch({ type: 'SET_ALL_ERRORS', errors: newErrors });
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h2 className="mb-4">Contact</h2>

            {state.showSuccess && (
                <Alert variant="success" className="mb-3">
                    Message sent successfully!
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            value={state.values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!state.errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.firstName}
                        </Form.Control.Feedback>
                        {!state.errors.firstName && state.values.firstName && <Form.Control.Feedback valid>Looks good!</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            value={state.values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!state.errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.lastName}
                        </Form.Control.Feedback>
                        {!state.errors.lastName && state.values.lastName && <Form.Control.Feedback valid>Looks good!</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                name="username"
                                value={state.values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!state.errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.username || "Please choose a username."}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={state.values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!state.errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.city || "Please provide a valid city."}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={state.values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!state.errors.state}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.state || "Please provide a valid state."}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Zip"
                            name="zip"
                            value={state.values.zip}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!state.errors.zip}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.zip || "Please provide a valid zip."}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        label="Agree to terms and conditions"
                        name="agree"
                        checked={state.values.agree}
                        onChange={handleCheck}
                        isInvalid={!!state.errors.agree}
                        feedback={state.errors.agree}
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        </Container>
    );
}

export default Contact;
