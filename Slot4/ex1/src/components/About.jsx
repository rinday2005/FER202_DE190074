import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default function About() {
  return (
    <div className="dark-bg">
      
      <main className="min-vh-100 py-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="../images/about.jpg"
                alt="Pizza House"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h1 className="display-7 fw-bold text-warning mb-5" style={{ fontFamily: "Times New Roman, serif" }}>
                About Pizza House
              </h1>
              <p className="fs-5 mb-3 text-light">
                Welcome to Pizza House, your ultimate destination for authentic Italian pizza. Founded in 2020, 
                we've been serving our community with passion and dedication.
              </p>
              <p className="fs-5 mb-3 text-light">
                Our mission is simple: to bring the authentic taste of Italy to your table. Every pizza is 
                handcrafted by our skilled pizzaiolos using time-honored techniques and the finest ingredients 
                sourced from Italy and local suppliers.
              </p>
            </Col>
          </Row>

          <Row className="py-5 border-top border-bottom border-secondary">
            <Col md={4} className="mb-4 mb-md-0 text-center">
              <div className="bg-dark p-4 rounded">
                <h3 className="text-warning fw-bold mb-3">Our Story</h3>
                <p className="text-light">
                  Started by Phương Nhi with a passion for authentic Italian cuisine, 
                  Pizza House has become a beloved local.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0 text-center">
              <div className="bg-dark p-4 rounded">
                <h3 className="text-warning fw-bold mb-3">Quality First</h3>
                <p className="text-light">
                  We use only fresh, high-quality ingredients. No preservatives, no shortcuts. 
                  Just pure, delicious pizza.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="bg-dark p-4 rounded">
                <h3 className="text-warning fw-bold mb-3">Community</h3>
                <p className="text-light">
                  We're more than a pizzeria. We're a gathering place for friends, 
                  families, and pizza lovers everywhere.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="py-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="text-warning fw-bold mb-4" style={{ fontFamily: "Times New Roman, serif" }}>
                Our Values
              </h2>
              <ul className="list-unstyled text-light">
                <li className="mb-3">
                  <strong className="text-warning"> Authenticity:</strong> Traditional Italian recipes with modern innovation
                </li>
                <li className="mb-3">
                  <strong className="text-warning"> Quality:</strong> Only the best ingredients for our pizzas
                </li>
                <li className="mb-3">
                  <strong className="text-warning"> Customer Satisfaction:</strong> Your happiness is our priority
                </li>
                <li className="mb-3">
                  <strong className="text-warning">Sustainability:</strong> Environmentally conscious practices
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <h2 className="text-warning fw-bold mb-4" style={{ fontFamily: "Times New Roman, serif" }}>
                Why Choose Us?
              </h2>
              <ul className="list-unstyled text-light">
                <li className="mb-3">✓ Handcrafted pizzas made fresh to order</li>
                <li className="mb-3">✓ Premium ingredients imported from Italy</li>
                <li className="mb-3">✓ Professional, friendly staff</li>
                <li className="mb-3">✓ Comfortable dining atmosphere</li>
                <li className="mb-3">✓ Fast and reliable delivery service</li>
                <li className="mb-3">✓ Special offers and loyalty rewards</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}
