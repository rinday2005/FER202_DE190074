import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">Slot 7 Exercises</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/ex1">Exercise 1</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex1-2">Exercise 1 (Reducer)</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex2">Exercise 2</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex2-2">Exercise 2 (Reducer)</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex3">Exercise 3</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex3-2">Exercise 3 (Reducer)</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex4">Exercise 4</Nav.Link>
                        <Nav.Link as={NavLink} to="/ex4-2">Exercise 4 (Reducer)</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
