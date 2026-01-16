import { Container, Row, Col } from "react-bootstrap"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-3"> Pizza House</h5>
            <p>Authentic Italian pizza made with fresh ingredients and traditional recipes.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Booking
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-light">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-light">
                <Instagram size={24} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2026 Pizza House. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
