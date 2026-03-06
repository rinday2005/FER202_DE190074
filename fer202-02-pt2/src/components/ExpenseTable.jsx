import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../redux/expenseSlice';

const ExpenseTable = ({ onEdit }) => {
    const { items, filterCategory } = useSelector((state) => state.expenses);
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const filteredItems = (items || []).filter((item) => {
        if (filterCategory === '') return true;
        return item.category && item.category.toLowerCase() === filterCategory.toLowerCase();
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatAmount = (amount) => {
        // Formatting as "85.000 ₫"
        const formatted = new Intl.NumberFormat('vi-VN').format(amount);
        return `${formatted} ₫`;
    };

    const handleDelete = (id) => {
        setIdToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        dispatch(deleteExpense(idToDelete));
        setShowDeleteModal(false);
    };

    return (
        <>
            <Table hover className="mb-0 overflow-hidden" style={{ borderRadius: '8px' }}>
                <thead className="table-light">
                    <tr>
                        <th className="ps-3 border-0 py-3" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Name</th>
                        <th className="border-0 py-3" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Amount</th>
                        <th className="border-0 py-3" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Category</th>
                        <th className="border-0 py-3" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Date</th>
                        <th className="pe-3 border-0 py-3" style={{ fontWeight: '600', fontSize: '0.9rem' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item) => (
                        <tr key={item.id} className="align-middle border-bottom">
                            <td className="ps-3 py-3" style={{ fontSize: '0.9rem' }}>{item.name}</td>
                            <td className="py-3" style={{ fontSize: '0.9rem' }}>{formatAmount(item.amount)}</td>
                            <td className="py-3" style={{ fontSize: '0.9rem' }}>{item.category}</td>
                            <td className="py-3" style={{ fontSize: '0.9rem' }}>{formatDate(item.date)}</td>
                            <td className="pe-3 py-3 text-end">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2 text-white"
                                    onClick={() => onEdit(item)}
                                    style={{ backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', fontSize: '0.8rem', padding: '4px 12px' }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                    style={{ backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', fontSize: '0.8rem', padding: '4px 12px' }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {filteredItems.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">No expenses found for this category.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title style={{ fontSize: '1.2rem', fontWeight: '500' }}>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-0">Do you really want to delete this expense?</Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)} style={{ borderRadius: '4px' }}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} style={{ borderRadius: '4px' }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExpenseTable;
