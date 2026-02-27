import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import MovieTable from '../components/MovieTable';
import MovieForm from '../components/MovieForm';
import { MovieProvider, useMovieDispatch, useMovieState } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const DashboardContent = () => {
    const { isAuthenticated } = useAuth();
    const { dispatch } = useMovieDispatch();
    const { movies } = useMovieState();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <Header />
            <Container className="pb-5">
                <Row className="mb-5 align-items-center animate-fade">
                    <Col>
                        <h2 className="fw-800 text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>ASSET REPOSITORY</h2>
                        <p className="text-secondary small fw-medium">Managing {movies.length} cinematographic records in the central database</p>
                    </Col>
                    <Col xs="auto">
                        <Button
                            className="btn-primary shadow-lg d-flex align-items-center gap-2 px-4 py-2"
                            onClick={() => dispatch({ type: 'OPEN_ADD_MODAL' })}
                            style={{ borderRadius: '12px' }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>＋</span>
                            REGISTER NEW ASSET
                        </Button>
                    </Col>
                </Row>

                <FilterBar />

                <section className="mt-4">
                    <MovieTable />
                </section>

                <MovieForm />
            </Container>
        </div>
    );
};

const MovieManager = () => {
    return (
        <MovieProvider>
            <DashboardContent />
        </MovieProvider>
    );
};

export default MovieManager;
