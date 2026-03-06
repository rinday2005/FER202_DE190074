import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <Form className="mb-4">
            <Row className="g-3 align-items-center">
                <Col md={5}>
                    <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0">
                            <BiSearch color="#aaa" />
                        </InputGroup.Text>
                        <Form.Control
                            name="search"
                            placeholder="Search by username or email"
                            value={filters.search}
                            onChange={handleChange}
                            className="border-start-0"
                        />
                    </InputGroup>
                </Col>

                <Col md={2}>
                    <Form.Select name="status" value={filters.status} onChange={handleChange}>
                        <option value="All">All statuses</option>
                        <option value="active">Active</option>
                        <option value="locked">Locked</option>
                    </Form.Select>
                </Col>

                <Col md={2}>
                    <Form.Select name="role" value={filters.role} onChange={handleChange}>
                        <option value="All">All roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </Form.Select>
                </Col>

                <Col md={3}>
                    <Form.Select name="sort" value={filters.sort} onChange={handleChange}>
                        <option value="">Sort by...</option>
                        <option value="usernameAsc">Username (A-Z)</option>
                        <option value="usernameDesc">Username (Z-A)</option>
                        <option value="role">Role (Admin first)</option>
                        <option value="status">Status (Active first)</option>
                    </Form.Select>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterBar;
