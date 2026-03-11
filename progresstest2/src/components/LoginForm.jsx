import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { loginAction } from "../services/AuthAPI";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "./ModalConfirm";

function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    const newErrors = {};

    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await loginAction(dispatch, { username, password });

    if (result.success) {

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 3000);

    } else {

      setErrors({ message: result.message });
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setErrors({});
  };

  return (
    <Container className="mt-5">

      <Row className="justify-content-md-center">

        <Col md={6}>

          <Card>

            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>

            <Card.Body>

              {(state.error || errors.message) &&
                <Alert variant="danger">
                  {state.error || errors.message}
                </Alert>
              }

              <Form noValidate onSubmit={handleLogin}>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">

                  <Button type="submit" className="flex-fill">
                    Login
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-fill"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      <ModalConfirm
        show={showModal}
        title="Login Successful"
        message="Redirecting to dashboard..."
        onConfirm={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      />

    </Container>
  );
}

export default LoginForm;