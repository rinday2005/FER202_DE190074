import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import User from './User';
import { fetchUsers } from '../api';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
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

    // Custom style for the banner headers
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
                <div style={bannerStyle}>
                    <h2 className="d-flex align-items-center justify-content-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        Users
                    </h2>
                </div>

                <Container>
                    <div className="user-list">
                        {users.map(user => (
                            <User key={user.id} user={user} />
                        ))}
                    </div>
                </Container>
            </div>
        </Container>
    );
};

export default UserPage;
