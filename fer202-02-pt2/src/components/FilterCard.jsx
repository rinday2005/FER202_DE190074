import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCategory } from '../redux/expenseSlice';

const FilterCard = () => {
    const dispatch = useDispatch();
    const filterCategory = useSelector((state) => state.expenses.filterCategory);

    return (
        <Card className="border shadow-none mb-4" style={{ borderRadius: '8px' }}>
            <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0" style={{ fontWeight: '600', color: '#333' }}>Filter</h6>
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Label className="small text-muted mb-1">Category</Form.Label>
                    <Form.Select
                        value={filterCategory}
                        onChange={(e) => dispatch(setFilterCategory(e.target.value))}
                        style={{ borderRadius: '4px', fontSize: '0.9rem' }}
                    >
                        <option value="">All categories</option>
                        <option value="Food">Food</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Mua sắm">Mua sắm</option>
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default FilterCard;
