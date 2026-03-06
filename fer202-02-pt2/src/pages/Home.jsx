import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../redux/expenseSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalCard from '../components/TotalCard';
import FilterCard from '../components/FilterCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            dispatch(fetchExpenses(user.id));
        }
    }, [dispatch, user]);

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fff' }}>
            <Header />

            <Container className="flex-grow-1 px-4">
                <Row className="g-4">
                    {/* Left Column: Stats and Form */}
                    <Col lg={4}>
                        <TotalCard />
                        <FilterCard />
                        <ExpenseForm editingItem={editingItem} onCancelEdit={handleCancelEdit} />
                    </Col>

                    {/* Right Column: Table */}
                    <Col lg={8}>
                        <Card className="border shadow-none" style={{ borderRadius: '8px' }}>
                            <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                                <h5 className="mb-0" style={{ fontWeight: '500', color: '#333' }}>Expense Management</h5>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <ExpenseTable onEdit={handleEdit} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
};

export default Home;
