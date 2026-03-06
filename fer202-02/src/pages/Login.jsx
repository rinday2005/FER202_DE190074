import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { accountService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import MessageModal from '../components/MessageModal';

const Login = () => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
        if (globalError) setGlobalError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.identifier) newErrors.identifier = 'Username or Email is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGlobalError('');
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await accountService.getAccounts();
            const accounts = response.data;

            const user = accounts.find(acc =>
                (acc.username === formData.identifier || acc.email === formData.identifier) &&
                acc.password === formData.password
            );

            if (!user) {
                setGlobalError('Invalid username/email or password!');
                return;
            }

            if (user.role !== 'admin') {
                setGlobalError('Access denied. Only admin users can log in.');
                return;
            }

            if (user.status === 'locked') {
                setGlobalError('Account is locked. Please contact admin.');
                return;
            }

            // Success
            login(user);
            setShowSuccessModal(true);

        } catch (error) {
            console.error('Login error:', error);
            setGlobalError('Something went wrong. Please try again later.');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <Card style={{ width: '450px', borderRadius: '8px', border: '1px solid #ddd' }} className="shadow-sm">
                <Card.Header className="bg-white text-center py-3 border-bottom-0">
                    <h3 className="mb-0">Login</h3>
                </Card.Header>
                <Card.Body className="px-5 pb-5 pt-2">
                    {globalError && (
                        <Alert
                            variant="danger"
                            dismissible
                            onClose={() => setGlobalError('')}
                            className="py-2 mb-3 d-flex align-items-center justify-content-between"
                        >
                            <span style={{ fontSize: '0.9rem' }}>{globalError}</span>
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-medium">Username or email</Form.Label>
                            <Form.Control
                                type="text"
                                name="identifier"
                                placeholder="Enter username or email"
                                value={formData.identifier}
                                onChange={handleChange}
                                isInvalid={!!errors.identifier}
                            />
                            {errors.identifier && (
                                <Form.Control.Feedback type="invalid" className="small">
                                    {errors.identifier}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-medium">Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            {errors.password && (
                                <Form.Control.Feedback type="invalid" className="small">
                                    {errors.password}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <div className="d-grid gap-3 d-md-flex justify-content-md-between mb-4">
                            <Button variant="primary" type="submit" className="px-5 flex-grow-1" style={{ borderRadius: '8px' }}>
                                Login
                            </Button>
                            <Button variant="secondary" className="px-5 flex-grow-1" style={{ borderRadius: '8px' }} onClick={() => {
                                setFormData({ identifier: '', password: '' });
                                setErrors({});
                                setGlobalError('');
                            }}>
                                Cancel
                            </Button>
                        </div>

                        <div className="text-center">
                            <Link to="#" className="text-decoration-underline small" style={{ color: '#0d6efd' }}>
                                Don't have an account? Sign up.
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <MessageModal
                show={showSuccessModal}
                title="Login Successful"
                message={`Welcome, ${formData.identifier}! You have successfully logged in.`}
                onContinue={() => navigate('/accounts')}
                handleClose={() => setShowSuccessModal(false)}
            />
        </Container>
    );
};

export default Login;
