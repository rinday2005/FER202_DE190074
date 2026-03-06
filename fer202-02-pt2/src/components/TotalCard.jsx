import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TotalCard = () => {
    const { items } = useSelector((state) => state.expenses);

    const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

    const formatAmount = (amount) => {
        const formatted = new Intl.NumberFormat('vi-VN').format(amount);
        return `${formatted} ₫`;
    };

    return (
        <Card className="border shadow-none mb-4" style={{ borderRadius: '8px' }}>
            <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0" style={{ fontWeight: '600', color: '#333' }}>Total of Expenses</h6>
            </Card.Header>
            <Card.Body className="py-2">
                <div style={{ fontSize: '1.1rem', color: '#555' }}>
                    {formatAmount(total)}
                </div>
            </Card.Body>
        </Card>
    );
};

export default TotalCard;
