import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { FiMail, FiLock, FiEye } from "react-icons/fi";

export default function Login() {
  return (
    <Container fluid className="login-wrapper">
      <Row className="min-vh-100">

        {/* LEFT */}
        <Col md={6} className="d-none d-md-flex login-left text-white align-items-end">
          <div className="p-5">
            <h5 className="fw-bold mb-3">SaaS Platform</h5>
            <h1 className="fw-bold">Welcome Back!</h1>
            <p className="opacity-75">
              Manage your workflow efficiently and stay connected with your team
            </p>
          </div>
        </Col>

        {/* RIGHT */}
        <Col md={6} className="d-flex justify-content-center align-items-center bg-white">
          <Card className="login-card">
            <Card.Body>
              <h2 className="login-title">Sign In</h2>
              <p className="login-subtitle">
                Enter your credentials to access your account
              </p>

              <Form>
                {/* EMAIL */}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <InputGroup className="login-input">
                    <InputGroup.Text>
                      <i className="bi bi-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="name@company.com" />
                  </InputGroup>
                </Form.Group>

                {/* PASSWORD */}
                <Form.Group className="mb-3">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Password</Form.Label>
                    <a href="#" className="forgot">Forgot password?</a>
                  </div>

                  <InputGroup className="login-input">
                    <InputGroup.Text>
                      <i className="bi bi-lock"></i>
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Enter your password" />
                  </InputGroup>
                </Form.Group>

                <Form.Check
                  className="mb-4"
                  label="Remember me for 30 days"
                />

                <Button className="btn-signin w-100">
                  Sign In
                </Button>
              </Form>

              <div className="divider">
                <span>OR CONTINUE WITH</span>
              </div>

              <Row className="g-3">
                <Col>
                  <Button className="btn-social w-100">
                    <i className="bi bi-google me-2"></i>
                    Google
                  </Button>
                </Col>
                <Col>
                  <Button className="btn-social w-100">
                    <i className="bi bi-github me-2"></i>
                    GitHub
                  </Button>
                </Col>
              </Row>

              <p className="text-center mt-4 small">
                New here?
                <a href="#" className="fw-bold ms-1">Create an account</a>
              </p>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}
