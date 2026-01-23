import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>SaaS Admin</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              User Manager
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
