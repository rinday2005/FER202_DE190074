import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from "react"

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "lunch",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", service: "lunch", message: "" })
  }

  return (
    <section className="booking-section py-5 bg-dark text-white">
      <Container>
        <h2 className="text-center fw-bold display-5 mb-5">Book Your Table</h2>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3 g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Your Name *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Your Email *</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Select a Service *</Form.Label>
                    <Form.Select name="service" value={formData.service} onChange={handleChange}>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="late-night">Late Night</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Please write your comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Please write your comment"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="warning" size="lg" type="submit" className="fw-bold">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
