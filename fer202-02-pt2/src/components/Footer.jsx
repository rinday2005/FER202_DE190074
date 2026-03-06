import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-white border-top">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <span className="text-muted small">&copy; 2025 PersonalBudget Demo</span>
                    </Col>
                    <Col md={6} className="text-end">
                        <span className="text-muted small">Built with React, Redux Toolkit & JSON Server</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
