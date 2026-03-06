import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense } from '../redux/expenseSlice';

const ExpenseForm = ({ editingItem, onCancelEdit }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingItem) {
            setFormData({
                name: editingItem.name,
                amount: editingItem.amount,
                category: editingItem.category,
                date: editingItem.date,
            });
        } else {
            setFormData({
                name: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
            });
        }
        setErrors({});
    }, [editingItem]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a valid number greater than 0';
        }
        if (!formData.date) newErrors.date = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const expenseData = {
            ...formData,
            amount: Number(formData.amount),
            userId: user.id,
        };

        if (editingItem) {
            dispatch(updateExpense({ ...expenseData, id: editingItem.id }));
            onCancelEdit();
        } else {
            dispatch(addExpense(expenseData));
            setFormData({
                name: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
            });
        }
    };

    const handleReset = () => {
        if (editingItem) {
            onCancelEdit();
        } else {
            setFormData({
                name: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
            });
        }
        setErrors({});
    };

    return (
        <Card className="border shadow-none mb-4" style={{ borderRadius: '8px' }}>
            <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h5 className="mb-0" style={{ fontWeight: '500', color: '#333' }}>
                    {editingItem ? 'Edit Expense' : 'Add Expense'}
                </h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: '0.9rem', color: '#555' }}>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            isInvalid={!!errors.name}
                            style={{ borderRadius: '4px' }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label style={{ fontSize: '0.9rem', color: '#555' }}>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    isInvalid={!!errors.amount}
                                    style={{ borderRadius: '4px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label style={{ fontSize: '0.9rem', color: '#555' }}>Category</Form.Label>
                                <Form.Select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    isInvalid={!!errors.category}
                                    style={{ borderRadius: '4px' }}
                                >
                                    <option value="">Select category</option>
                                    <option value="Food">Food</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Mua sắm">Mua sắm</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {(errors.amount || errors.category) && (
                            <Col xs={12}>
                                <div className="text-danger small mt-1">{errors.amount || errors.category}</div>
                            </Col>
                        )}
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: '0.9rem', color: '#555' }}>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            isInvalid={!!errors.date}
                            style={{ borderRadius: '4px' }}
                            placeholder="mm/dd/yyyy"
                        />
                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={handleReset}
                            style={{ borderRadius: '4px', backgroundColor: '#6c757d', border: 'none', padding: '6px 15px' }}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ borderRadius: '4px', backgroundColor: '#4285f4', border: 'none', padding: '6px 15px' }}
                        >
                            {editingItem ? 'Save' : 'Add expense'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ExpenseForm;
