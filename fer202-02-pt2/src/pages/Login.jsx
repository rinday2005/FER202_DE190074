import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError('');

        if (!username.trim() || !password.trim()) {
            setValidationError('Username and password are required');
            return;
        }

        dispatch(login({ username, password }));
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
        setValidationError('');
        dispatch(clearError());
    };

    const getErrorMessage = () => {
        if (validationError) return validationError;
        if (error) return error;
        return null;
    };

    const errorMessage = getErrorMessage();

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Row className="w-100 justify-content-center">
                <Col md={5} lg={4}>
                    <Card className="shadow-sm border-0" style={{ borderRadius: '8px' }}>
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4" style={{ fontWeight: '400', color: '#333' }}>Login</h2>

                            {errorMessage && (
                                <Alert
                                    variant="danger"
                                    className="py-2 small text-center"
                                    style={{ backgroundColor: '#f8d7da', color: '#842029', border: '1px solid #f5c2c7' }}
                                >
                                    {errorMessage}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontSize: '0.9rem', color: '#555' }}>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{ borderRadius: '4px' }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontSize: '0.9rem', color: '#555' }}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ borderRadius: '4px', backgroundColor: '#eef3ff' }}
                                    />
                                    <div className="text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                                        (at least 6 characters)
                                    </div>
                                    {password.length > 0 && password.length < 6 && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>
                                            Password must be at least 6 characters
                                        </div>
                                    )}
                                </Form.Group>

                                <div className="d-flex gap-2 mt-4">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="flex-grow-1"
                                        disabled={loading}
                                        style={{ backgroundColor: '#4285f4', border: 'none', borderRadius: '4px' }}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-grow-1"
                                        style={{ backgroundColor: '#6c757d', border: 'none', borderRadius: '4px' }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
