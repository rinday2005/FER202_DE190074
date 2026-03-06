import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Navbar bg="white" expand="lg" className="mb-4 border-bottom shadow-sm">
            <Container>
                <Navbar.Brand href="/home" className="d-flex align-items-center">
                    <img
                        src="./images/logo.jpg"
                        alt="logo"
                        width="24"
                        height="24"
                        className="d-inline-block align-top me-2"
                    />
                    <span style={{ fontSize: '1.2rem', fontWeight: '500', color: '#333' }}>PersonalBudget</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">
                        {user && (
                            <>
                                <Navbar.Text className="me-3" style={{ fontSize: '0.9rem', color: '#555' }}>
                                    Signed in as: <strong style={{ color: '#000' }}>{user.fullName}</strong>
                                </Navbar.Text>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleLogout}
                                    style={{ borderRadius: '4px', padding: '2px 10px' }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
