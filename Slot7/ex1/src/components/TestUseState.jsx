
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function TestUseState() {
    const [username, setUsername] = useState('ntpnhi');
    const [age, setAge] = useState(20);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(`Hello, ${username}, ${age} years old`);
    };

    return (
        <Container>
            <h2> Test useState Hook </h2>
            <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={2}>
                        <Form.Label>Username:</Form.Label>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={2}>
                        <Form.Label>Age:</Form.Label>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {message && <div className="mt-3 text-success fw-bold">{message}</div>}
            </Form>
        </Container>
    );
}
export default TestUseState