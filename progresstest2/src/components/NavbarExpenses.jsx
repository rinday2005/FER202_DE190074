import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function NavbarExpenses() {

  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (

    <Navbar bg="dark" variant="dark">

      <Container>

        <Navbar.Brand>
          Personal Budget
        </Navbar.Brand>

        <Nav className="ms-auto">

          {state.user && (
            <>
              <Navbar.Text className="me-3">
                Signed in as <strong>{state.user.fullName}</strong>
              </Navbar.Text>

              <Nav.Link onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          )}

        </Nav>

      </Container>

    </Navbar>
  );
}

export default NavbarExpenses;