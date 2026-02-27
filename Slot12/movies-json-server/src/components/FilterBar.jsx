import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
    const { genres } = useMovieState();
    const { fetchMovies } = useMovieDispatch();

    const [filters, setFilters] = useState({
        title: '',
        id: '',
        genreId: '',
        sortBy: 'title',
        order: 'asc'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        // Auto trigger for dropdowns
        if (name !== 'title' && name !== 'id') {
            fetchMovies(newFilters);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            title: '',
            id: '',
            genreId: '',
            sortBy: 'title',
            order: 'asc'
        };
        setFilters(resetFilters);
        fetchMovies(resetFilters);
    };

    return (
        <div className="pro-card p-4 mb-5 animate-fade">
            <Form onSubmit={handleSearch}>
                <Row className="g-4 align-items-end">
                    <Col sm={6} lg={4}>
                        <Form.Group>
                            <Form.Label>SEARCH DATABASE (TITLE)</Form.Label>
                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Enter keywords..."
                                    value={filters.title}
                                    onChange={handleChange}
                                    className="border-0"
                                />
                                <Button
                                    type="submit"
                                    variant="white"
                                    className="px-3 border-start"
                                >
                                    🔍
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col sm={6} lg={2}>
                        <Form.Group>
                            <Form.Label>MOVIE ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                placeholder="ID#"
                                value={filters.id}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={6} md={3} lg={2}>
                        <Form.Group>
                            <Form.Label>GENRE</Form.Label>
                            <Form.Select
                                name="genreId"
                                value={filters.genreId}
                                onChange={handleChange}
                            >
                                <option value="">All Categories</option>
                                {genres.map(g => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col sm={6} md={3} lg={2}>
                        <Form.Group>
                            <Form.Label>ORDER BY</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleChange}
                                >
                                    <option value="id">ID #</option>
                                    <option value="title" className="bg-white">Title</option>
                                    <option value="year" className="bg-white">Year</option>
                                    <option value="duration" className="bg-white">Duration</option>
                                </Form.Select>
                                <Form.Select
                                    name="order"
                                    value={filters.order}
                                    onChange={handleChange}
                                    style={{ width: '80px' }}
                                >
                                    <option value="asc">↑</option>
                                    <option value="desc">↓</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col sm={6} md={3} lg={2}>
                        <Button
                            variant="light"
                            onClick={handleReset}
                            className="w-100 py-2 border fw-bold text-secondary"
                            style={{ borderRadius: '10px', background: '#f8fafc' }}
                        >
                            RESET
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default FilterBar;
