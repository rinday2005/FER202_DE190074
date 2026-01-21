import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })
  }

  return (
    <div className="dark-bg">


      <main className="min-vh-100 py-5">
        <Container>
          {/* Title */}
          <h1
            className="display-4 fw-bold text-center text-warning mb-5"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Contact Us
          </h1>

          {/* Info boxes */}
          <Row className="mb-5">
            <Col md={3} className="mb-4 mb-md-0">
              <div className="bg-dark p-4 rounded text-center border border-warning h-100">
                <MapPin className="text-warning mb-3" size={32} />
                <h5 className="fw-bold text-light mb-2">Location</h5>
                <p className="text-light small mb-0">
                  123 Pizza Street<br />
                  Your City, State 12345
                </p>
              </div>
            </Col>

            <Col md={3} className="mb-4 mb-md-0">
              <div className="bg-dark p-4 rounded text-center border border-warning h-100">
                <Phone className="text-warning mb-3" size={32} />
                <h5 className="fw-bold text-light mb-2">Phone</h5>
                <p className="text-light small mb-0">
                  +1 (555) 123-4567<br />
                  Call us anytime
                </p>
              </div>
            </Col>

            <Col md={3} className="mb-4 mb-md-0">
              <div className="bg-dark p-4 rounded text-center border border-warning h-100">
                <Mail className="text-warning mb-3" size={32} />
                <h5 className="fw-bold text-light mb-2">Email</h5>
                <p className="text-light small mb-0">
                  info@pizzahouse.com<br />
                  support@pizzahouse.com
                </p>
              </div>
            </Col>

            <Col md={3}>
              <div className="bg-dark p-4 rounded text-center border border-warning h-100">
                <Clock className="text-warning mb-3" size={32} />
                <h5 className="fw-bold text-light mb-2">Hours</h5>
                <p className="text-light small mb-0">
                  Mon–Thu: 11AM – 10PM<br />
                  Fri–Sun: 11AM – 11PM
                </p>
              </div>
            </Col>
          </Row>

          {/* Form + Info */}
          <Row className="py-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2
                className="text-warning fw-bold mb-4"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Send us a Message
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="bg-dark text-light border-warning"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-dark text-light border-warning"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light fw-bold">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-dark text-light border-warning"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light fw-bold">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-dark text-light border-warning"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-light fw-bold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    className="bg-dark text-light border-warning"
                  />
                </Form.Group>

                <Button type="submit" variant="warning" className="w-100 fw-bold">
                  Send Message
                </Button>
              </Form>
            </Col>

            <Col lg={6}>
  <h2
    className="text-warning fw-bold mb-4"
    style={{ fontFamily: "Times New Roman, serif" }}
  >
    Why Contact Us?
  </h2>

  <div className="bg-dark p-3 rounded border border-warning">
    <h5 className="text-warning fw-bold mb-2">
      We'd Love to Hear From You!
    </h5>

    <p className="text-light small mb-3">
      Have questions about our menu? Want to make a special request?
      Need to discuss a catering event? We're here to help!
    </p>

    <h6 className="text-warning fw-bold mb-2">
      Quick Links
    </h6>

    <ul className="list-unstyled text-light small mb-3">
      <li>📋 Menu Inquiries</li>
      <li>🎉 Catering & Events</li>
      <li>🏆 Feedback & Reviews</li>
      <li>💼 Business Partnerships</li>
      <li>📱 Delivery Issues</li>
      <li>🎁 Special Offers</li>
    </ul>

    <p className="text-light small mb-0">
      <strong>Response Time:</strong> Within 24 hours (business days)
    </p>
  </div>
</Col>

          </Row>

          {/* Back to home */}
          <Row className="py-5 border-top border-secondary">
            <Col className="text-center">
              <h3
                className="text-warning fw-bold mb-4"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Visit Us Today!
              </h3>
              <p className="text-light mb-4">
                Experience authentic Italian pizza in a warm and welcoming atmosphere.
              </p>

              <Button as={Link} to="/" variant="warning" className="fw-bold">
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}
