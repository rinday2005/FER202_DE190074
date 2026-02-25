import React, { useReducer } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
    identifier: '', // username hoặc email
    password: '',
    errors: {},
    showSuccessModal: false
};

// 2. Định nghĩa reducer cho form
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.field]: action.message }
            };
        case 'CLEAR_ERROR':
            const { [action.field]: removed, ...restErrors } = state.errors;
            return {
                ...state,
                errors: restErrors
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.errors
            };
        case 'SHOW_SUCCESS_MODAL':
            return {
                ...state,
                showSuccessModal: true
            };
        case 'HIDE_SUCCESS_MODAL':
            return {
                ...state,
                showSuccessModal: false
            };
        case 'RESET_FORM':
            return initialFormState;
        default:
            return state;
    }
}

function LoginForm() {
    // 3. Sử dụng useReducer cho form state
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    // 4. Sử dụng AuthContext và ThemeContext
    const { login, loading, error, clearError } = useAuth();
    const { theme } = useTheme();

    const isDark = theme === 'dark';

    // 5. Validation helpers
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = (v) => v.includes('@');

    // 6. Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá trị field
        dispatch({ type: 'SET_FIELD', field: name, value });

        // Clear auth error khi user nhập
        clearError();

        // Validation real-time
        if (name === 'identifier') {
            if (!value.trim()) {
                dispatch({ type: 'SET_ERROR', field: name, message: 'Username or Email is required.' });
            } else if (isEmail(value) && !emailRe.test(value)) {
                dispatch({ type: 'SET_ERROR', field: name, message: 'Email is invalid format.' });
            } else {
                dispatch({ type: 'CLEAR_ERROR', field: name });
            }
        }

        if (name === 'password') {
            if (!value.trim()) {
                dispatch({ type: 'SET_ERROR', field: name, message: 'Password is required.' });
            } else if (value.length > 0 && value.length < 6) {
                dispatch({ type: 'SET_ERROR', field: name, message: 'Password must be at least 6 characters.' });
            } else {
                dispatch({ type: 'CLEAR_ERROR', field: name });
            }
        }
    };

    // 7. Validation form khi submit
    const validateForm = () => {
        const errors = {};

        if (!formState.identifier.trim()) {
            errors.identifier = 'Username or Email is required.';
        } else if (isEmail(formState.identifier) && !emailRe.test(formState.identifier)) {
            errors.identifier = 'Email is invalid format.';
        }

        if (!formState.password.trim()) {
            errors.password = 'Password is required.';
        } else if (formState.password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        return errors;
    };

    // 8. Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        // Validate form
        const validationErrors = validateForm();
        dispatch({ type: 'SET_ERRORS', errors: validationErrors });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            // Gọi login từ AuthContext
            const result = await login(formState.identifier.trim(), formState.password);

            if (result.ok) {

                dispatch({ type: 'RESET_FORM' });
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    // 9. Xử lý reset form
    const handleReset = () => {
        dispatch({ type: 'RESET_FORM' });
        clearError();
    };

    // Styles
    const cardStyle = {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(15px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '24px',
        boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)',
        padding: '30px',
        maxWidth: '450px',
        width: '100%',
        margin: '0 auto',
        transition: 'all 0.3s ease'
    };

    const inputStyle = {
        background: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #ced4da',
        color: isDark ? '#fff' : '#000',
        borderRadius: '12px',
        padding: '12px',
        transition: 'all 0.3s ease'
    };

    return (
        <>
            <Card style={cardStyle}>
                <Card.Body>
                    <div className="text-center mb-4">
                        <h2 style={{ fontWeight: '800', color: isDark ? '#fff' : '#222' }}>Admin Portal</h2>
                        <p style={{ opacity: 0.6, color: isDark ? '#ccc' : '#666' }}>Please login to continue</p>
                    </div>

                    {error && (
                        <Alert variant="danger" style={{ borderRadius: '12px' }} className="shake">
                            {error}
                        </Alert>
                    )}

                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formIdentifier">
                            <Form.Label style={{ fontWeight: '600', color: isDark ? '#ddd' : '#444' }}>Username or Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="identifier"
                                placeholder="Enter username or email"
                                value={formState.identifier}
                                onChange={handleChange}
                                isInvalid={!!formState.errors.identifier}
                                style={inputStyle}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formState.errors.identifier}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label style={{ fontWeight: '600', color: isDark ? '#ddd' : '#444' }}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formState.password}
                                onChange={handleChange}
                                isInvalid={!!formState.errors.password}
                                style={inputStyle}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formState.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                fontWeight: '700',
                                background: 'linear-gradient(45deg, #007bff, #6610f2)',
                                border: 'none',
                                boxShadow: '0 4px 15px rgba(102, 16, 242, 0.3)',
                                position: 'relative'
                            }}
                        >
                            {loading ? (
                                <><Spinner animation="border" size="sm" className="me-2" /> Signing in...</>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </Form>

                    <div className="mt-4 text-center" style={{ fontSize: '0.85rem', opacity: 0.5, color: isDark ? '#eee' : '#333' }}>
                        Hint: Use your admin credentials to access.
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default LoginForm;
