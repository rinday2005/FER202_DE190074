import React from 'react';
import { Table, Button, Image, Modal, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
    const { movies, genres, loading, showDeleteModal, movieToDelete } = useMovieState();
    const { dispatch, confirmDelete } = useMovieDispatch();

    const genreMap = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
    }, {});

    const getGenreColor = (genreName) => {
        const colors = {
            'Sci-Fi': '#4f46e5',
            'Comedy': '#d97706',
            'Drama': '#2563eb',
            'Horror': '#dc2626',
            'Romance': '#db2777',
            'Action': '#059669',
            'Thriller': '#7c3aed'
        };
        return colors[genreName] || '#64748b';
    };

    const handleEditClick = (movie) => {
        dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
    };

    const handleDeleteClick = (movie) => {
        dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
    };

    if (loading && movies.length === 0) {
        return (
            <div className="text-center my-5 py-5">
                <Spinner animation="border" style={{ color: '#4f46e5' }} />
                <p className="mt-3 text-secondary fw-medium">Loading database records...</p>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="text-center my-5 p-5 pro-card bg-white animate-fade">
                <span style={{ fontSize: '3rem' }}>📂</span>
                <h4 className="mt-3 fw-bold text-dark">No records found</h4>
                <p className="text-muted">Adjust your filters or register a new asset.</p>
            </div>
        );
    }

    return (
        <>
            <div className="pro-table shadow-sm border animate-fade">
                <Table hover responsive className="mb-0">
                    <thead>
                        <tr>
                            <th className="px-4 py-3">MEDIA</th>
                            <th className="py-3">TITLE & DESCRIPTION</th>
                            <th className="py-3 text-center">GENRE</th>
                            <th className="py-3">RELEASE</th>
                            <th className="py-3">RUNTIME</th>
                            <th className="px-4 py-3 text-end">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => {
                            const genreName = genreMap[movie.genreId] || 'Unknown';
                            const color = getGenreColor(genreName);
                            return (
                                <tr key={movie.id} className="align-middle">
                                    <td className="px-4">
                                        <div style={{ width: '56px', height: '80px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                            <Image
                                                src={movie.poster}
                                                alt={movie.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/56x80/f1f5f9/94a3b8?text=?';
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark fs-6">{movie.title}</div>
                                        <div className="text-muted small mt-1 text-truncate" style={{ maxWidth: '350px' }}>
                                            {movie.description}
                                        </div>
                                        <div className="mt-1">
                                            <code style={{ fontSize: '0.65rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b' }}>ID: #{movie.id}</code>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge-pro" style={{
                                            background: `${color}15`,
                                            color: color,
                                            border: `1.5px solid ${color}25`
                                        }}>
                                            {genreName.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="fw-semibold text-dark">{movie.year}</div>
                                        <div className="text-muted x-small fw-bold">{movie.country.toUpperCase()}</div>
                                    </td>
                                    <td>
                                        <div className="text-dark small fw-medium">
                                            ⏳ {movie.duration} min
                                        </div>
                                    </td>
                                    <td className="px-4 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="p-2 border"
                                                onClick={() => handleEditClick(movie)}
                                                style={{ background: '#f8fafc', borderRadius: '8px' }}
                                            >
                                                ✏️
                                            </Button>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="p-2 border"
                                                onClick={() => handleDeleteClick(movie)}
                                                style={{ background: '#fff5f5', borderColor: '#fee2e2', color: '#ef4444', borderRadius: '8px' }}
                                            >
                                                🗑️
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })} centered backdropClassName="bg-dark opacity-50">
                <Modal.Body className="p-5 text-center bg-white rounded-4 border-0">
                    <div style={{ fontSize: '3.5rem' }} className="mb-4">🗑️</div>
                    <h3 className="fw-bold text-dark mb-3">Delete Movie?</h3>
                    <p className="text-muted mb-5">
                        You are about to permanently remove <strong className="text-dark">"{movieToDelete?.title}"</strong>. This action cannot be undone.
                    </p>
                    <div className="d-flex gap-3 justify-content-center">
                        <Button
                            variant="light"
                            className="px-4 py-2 border fw-bold text-secondary"
                            onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
                            style={{ borderRadius: '10px' }}
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="danger"
                            className="px-4 py-2 fw-bold"
                            onClick={() => confirmDelete(movieToDelete.id)}
                            style={{ borderRadius: '10px', background: '#ef4444' }}
                        >
                            DELETE PERMANENTLY
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <style>{`
        .badge-pro {
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.7rem;
          display: inline-block;
        }
        .pro-table thead th {
           border-top: none;
           padding: 1rem 12px;
        }
      `}</style>
        </>
    );
};

export default MovieTable;
