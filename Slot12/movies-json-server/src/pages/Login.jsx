import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [validated, setValidated] = useState(false);
    const { login, loading, error, clearError, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/movies');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        await login(credentials.identifier, credentials.password);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f1f5f9',
            backgroundImage: 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.05) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.05) 0px, transparent 50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="border-0 shadow-lg p-3 animate-fade" style={{ borderRadius: '24px', background: '#ffffff' }}>
                            <Card.Body>
                                <div className="text-center mb-5 mt-3">
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        color: 'white',
                                        fontSize: '2rem',
                                        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
                                    }}>
                                        🎬
                                    </div>
                                    <h2 className="fw-800" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>Movie Admin</h2>
                                    <p className="text-muted small">Sign in to manage your collection</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="border-0 small text-center mb-4" style={{ borderRadius: '12px', background: '#fef2f2', color: '#991b1b' }}>
                                        {error}
                                    </Alert>
                                )}

                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>IDENTIFIER</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="identifier"
                                            placeholder="Username or Email"
                                            value={credentials.identifier}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide an authorized identifier.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>PASSWORD</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password is required.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="btn-primary w-100 py-3 mt-2"
                                        disabled={loading}
                                        style={{ fontSize: '1rem', letterSpacing: '0.05em' }}
                                    >
                                        {loading ? (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                SIGNING IN...
                                            </div>
                                        ) : (
                                            'LOGIN'
                                        )}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <p className="text-center mt-4 text-muted small">
                            © 2026 MovieHub Pro • v2.0
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;