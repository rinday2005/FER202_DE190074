import React from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar sticky="top" className="bg-white py-3 mb-5 border-0 border-bottom shadow-sm">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>🎬</span>
                    </div>
                    <span style={{
                        fontWeight: '800',
                        letterSpacing: '-0.01em',
                        color: '#0f172a'
                    }}>
                        MOVIE HUB
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar-nav" className="border-0" />

                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user && (
                            <div className="d-flex align-items-center">
                                <div className="text-end me-3 d-none d-sm-block">
                                    <div className="fw-bold text-dark small" style={{ lineHeight: '1' }}>{user.username}</div>
                                    <small className="text-muted" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>{user.role.toUpperCase()}</small>
                                </div>

                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    background: '#f1f5f9',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    marginRight: '15px'
                                }}>
                                    <Image
                                        src={`https://ui-avatars.com/api/?name=${user.username}&background=4f46e5&color=fff`}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>

                                <Button
                                    onClick={logout}
                                    className="btn-outline-danger"
                                    style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        borderRadius: '8px',
                                        padding: '6px 14px',
                                        border: '1.5px solid #fee2e2',
                                        background: '#fef2f2',
                                        color: '#dc2626'
                                    }}
                                >
                                    SIGN OUT
                                </Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
