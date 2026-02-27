import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview, genres, validated = false }) => (
    <div className="animate-fade">
        <Form.Group className="mb-4">
            <Form.Label>MOVIE TITLE</Form.Label>
            <Form.Control
                required
                type="text"
                name="title"
                placeholder="e.g. Inception"
                value={currentMovie.title}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-4">
            <Form.Label>SYNOPSIS</Form.Label>
            <Form.Control
                required
                as="textarea"
                rows={3}
                name="description"
                placeholder="Describe the plot..."
                value={currentMovie.description}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Row>
            <Col md={6}>
                <Form.Group className="mb-4">
                    <Form.Label>GENRE</Form.Label>
                    <Form.Select
                        required
                        name="genreId"
                        value={currentMovie.genreId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-4">
                    <Form.Label>RELEASE YEAR</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="year"
                        placeholder="2024"
                        value={currentMovie.year}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <Form.Group className="mb-4">
                    <Form.Label>ORIGIN COUNTRY</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="country"
                        placeholder="USA"
                        value={currentMovie.country}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-4">
                    <Form.Label>DURATION (MIN)</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="duration"
                        placeholder="120"
                        value={currentMovie.duration}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-1">
            <Form.Label>POSTER MEDIA (FILE OR URL)</Form.Label>
            <Form.Control
                type="text"
                name="poster"
                placeholder="https://images.com/poster.jpg"
                value={currentMovie.poster}
                onChange={handleInputChange}
                className="mb-2"
            />
            <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="small border-0 px-0"
                style={{ fontSize: '0.85rem' }}
            />
        </Form.Group>

        {imagePreview && (
            <div className="text-center mt-4 p-4 rounded-4" style={{ background: '#f8fafc', border: '2px dashed #e2e8f0' }}>
                <Image
                    src={imagePreview}
                    thumbnail
                    style={{ maxHeight: '200px', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
            </div>
        )}
    </div>
);

const MovieForm = () => {
    const { showModal, isEditing, currentMovie, genres } = useMovieState();
    const { dispatch, handleCreateOrUpdate } = useMovieDispatch();

    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(currentMovie);
    const [imagePreview, setImagePreview] = useState(currentMovie.poster);

    useEffect(() => {
        setFormData(currentMovie);
        setImagePreview(currentMovie.poster);
        setValidated(false);
        setError(null);
    }, [currentMovie]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Convert to number for specific fields if they are not empty
        let processedValue = value;
        if (['genreId', 'year', 'duration'].includes(name) && value !== '') {
            processedValue = Number(value);
        }
        setFormData({ ...formData, [name]: processedValue });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, poster: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const result = await handleCreateOrUpdate(formData, isEditing, currentMovie?.id);
        if (result.ok) {
            dispatch({ type: 'CLOSE_MODAL' });
        } else {
            setError('Could not save movie. Please check your connection and try again.');
        }
    };

    return (
        <Modal show={showModal} onHide={() => dispatch({ type: 'CLOSE_MODAL' })} size="lg" centered backdropClassName="bg-dark opacity-50">
            <Modal.Header closeButton className="px-4 py-4 bg-white border-bottom border-light" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <Modal.Title className="fw-800 text-dark" style={{ letterSpacing: '-0.02em' }}>
                    {isEditing ? 'Update Movie Entry' : 'Register New Movie'}
                </Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className="px-4 py-4 bg-white" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                    {error && (
                        <div className="alert alert-danger border-0 small py-2 mb-4" style={{ borderRadius: '10px' }}>
                            ⚠️ {error}
                        </div>
                    )}
                    <MovieFields
                        currentMovie={formData}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        imagePreview={imagePreview}
                        genres={genres}
                        validated={validated}
                    />
                </Modal.Body>
                <Modal.Footer className="px-4 py-4 bg-white border-top border-light" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <Button
                        variant="link"
                        className="text-muted fw-bold text-decoration-none me-auto"
                        onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                    >
                        CANCEL
                    </Button>
                    <Button type="submit" className="btn-primary px-5 fw-bold shadow-lg">
                        {isEditing ? 'COMMIT DATA' : 'SAVE TO COLLECTION'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default MovieForm;
