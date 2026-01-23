import { Container, Card, Form, Button, InputGroup, Row, Col, Alert } from "react-bootstrap";

export default function DemoForm() {
  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ width: "420px", border: "2px solid #333" }}>

        <Alert variant="warning" className="mb-0 rounded-0 text-end py-1">
          ✕
        </Alert>

        <Card.Body>
          <h4 className="fw-bold mb-4">Form đặt vé máy bay</h4>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <InputGroup> 
                <InputGroup.Text>👤</InputGroup.Text>              
                <Form.Control placeholder="Họ tên" />               
                <InputGroup.Text>vnd</InputGroup.Text>
              </InputGroup>
             
              <Form.Text className="text-muted">
                Phải nhập 5 kí tự, in hoa....
              </Form.Text>
            </Form.Group>

            {/* ===== FORM GROUP 2 ===== */}
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control placeholder="Địa chỉ" />
              <Form.Text className="text-muted">
                Phải nhập 5 kí tự, in hoa....
              </Form.Text>
            </Form.Group>

            {/* ===== FORM GROUP 3 (ROW) ===== */}
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Đi từ</Form.Label>
                  <Form.Select>
                    <option>Hà nội</option>
                    <option>Hồ Chí Minh</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Đến</Form.Label>
                  <Form.Select>
                    <option>Hà nội</option>
                    <option>Hồ Chí Minh</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* ===== FORM GROUP 4 ===== */}
            <Form.Group className="mb-4">
              <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
              <Form.Check label="Đi" />
              <Form.Check label="Về" />
            </Form.Group>

            {/* SUBMIT */}
            <Button type="submit" className="w-100 mb-2">
              Đặt vé
            </Button>

            <Button type="submit" className="w-100" variant="outline-secondary">
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
