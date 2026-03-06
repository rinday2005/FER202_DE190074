import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Image, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { accountService } from '../services/api';

const AccountDetails = () => {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await accountService.getAccountById(id);
                setAccount(response.data);
            } catch (error) {
                console.error('Error fetching account details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, [id]);

    if (loading) return <Container className="py-5 text-center">Loading...</Container>;
    if (!account) return <Container className="py-5 text-center">Account not found.</Container>;

    return (
        <Container className="py-5">
            <Card className="shadow-sm border-0" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Card.Header className="bg-white py-3">
                    <h4 className="mb-0">Account Details</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Row className="align-items-center">
                        <Col md={4} className="text-center mb-3 mb-md-0">
                            <Image
                                src={account.avatar}
                                rounded
                                fluid
                                style={{ maxHeight: '250px' }}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/250'; }}
                                className="shadow-sm"
                            />
                        </Col>
                        <Col md={8}>
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase">Username</label>
                                <p className="fs-5 mb-0">{account.username}</p>
                            </div>
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase">Email</label>
                                <p className="fs-5 mb-0">{account.email}</p>
                            </div>
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase">Role</label>
                                <p className="fs-5 mb-0 text-capitalize">{account.role}</p>
                            </div>
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase">Status</label>
                                <div>
                                    <Badge bg={account.status === 'active' ? 'success' : 'danger'} className="px-3 py-2">
                                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                                    </Badge>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="bg-light p-3">
                    <Button variant="secondary" onClick={() => navigate('/accounts')}>
                        Back to list
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default AccountDetails;
