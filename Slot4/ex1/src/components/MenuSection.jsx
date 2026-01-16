import { pizzas } from "../data/pizzas.js"
import { Container, Row, Col } from "react-bootstrap"
import MenuCard from "./MenuCard"

export default function MenuSection() {
  return (
    <section className="menu-section py-5">
      <Container>
        <h2 className="text-center fw-bold display-5 mb-5">Our Menu</h2>
        <Row xs={1} sm={2} lg={4} className="g-4">
          {pizzas.map((pizza) => (
            <Col key={pizza.id}>
              <MenuCard {...pizza} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}