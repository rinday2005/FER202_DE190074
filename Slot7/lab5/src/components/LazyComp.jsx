import React, { useEffect, useState, Suspense } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import { fetchUsers, fetchPosts } from '../api';

const User = React.lazy(() => import('./User'));
const Post = React.lazy(() => import('./Post'));

const LazyComp = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // UX State for Modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, postsData] = await Promise.all([
                    fetchUsers(),
                    fetchPosts()
                ]);
                setUsers(usersData);
                setPosts(postsData);
                setError(null);
            } catch (err) {
                console.error("Error details:", err);
                if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
                    setError("Error Network: Please check your internet connection.");
                } else {
                    setError(err.message);
                }
            }
        };
        fetchData();
    }, []);

    // Handlers
    const handleUserClick = (user) => setSelectedUser(user);
    const handlePostClick = (post) => setSelectedPost(post);
    const handleClose = () => {
        setSelectedUser(null);
        setSelectedPost(null);
    };

    const bannerStyle = {
        backgroundColor: '#1a0b2e',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        borderRadius: '0px'
    };

    if (error) {
        return (
            <Container fluid className="p-0 mt-5 text-center">
                <h3 className="text-danger">{error}</h3>
            </Container>
        );
    }

    return (
        <Container fluid className="p-0">
            <div className="mb-5">

                {/* USERS COLUMN */}
                <div style={bannerStyle}>
                    <h2 className="d-flex align-items-center justify-content-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        Users List
                    </h2>
                    <p className="small text-white-50">Click to view details</p>
                </div>
                <Container className="mb-5">
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item
                                action
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                className="d-flex justify-content-between align-items-center"
                            >
                                {user.name}
                                <span className="badge bg-primary rounded-pill">View</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>

                {/* POSTS COLUMN */}
                <div style={bannerStyle}>
                    <h2 className="d-flex align-items-center justify-content-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        Posts List
                    </h2>
                    <p className="small text-white-50">Click to view details</p>
                </div>
                <Container>
                    <ListGroup variant="flush">
                        {posts.slice(0, 10).map(post => (
                            <ListGroup.Item
                                action
                                key={post.id}
                                onClick={() => handlePostClick(post)}
                                className="border-bottom"
                            >
                                <h6 className="mb-1 text-truncate">{post.title}</h6>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>


                {/* COMMON DETAIL MODAL */}
                <Modal show={!!selectedUser || !!selectedPost} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {selectedUser ? "User Details" : "Post Details"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Suspense fallback={<div className="text-center p-3">Loading details...</div>}>
                            {selectedUser && <User user={selectedUser} />}
                            {selectedPost && <Post post={selectedPost} />}
                        </Suspense>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </Container>
    );
};

export default LazyComp;
