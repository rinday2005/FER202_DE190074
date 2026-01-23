import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { pizzas } from "../data/pizzas"

export default function PizzaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const pizza = pizzas.find(p => p.id === Number(id))

  if (!pizza) {
    return (
      <div className="dark-bg min-vh-100 d-flex align-items-center justify-content-center">
        <h2 className="text-light">Pizza not found 🍕</h2>
      </div>
    )
  }

  return (
    <div className="dark-bg min-vh-100">
      <Container className="py-5">
        

        <Row className="bg-dark rounded shadow-lg p-4 align-items-center">
          {/* IMAGE */}
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src={pizza.image}
              alt={pizza.title}
              className="img-fluid rounded"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Col>

          {/* INFO */}
          <Col md={6} className="text-light">
            <h2 className="mb-3">{pizza.title}</h2>

            {/* PRICE */}
            <div className="mb-3">
              {pizza.isSale ? (
                <>
                  <span className="text-warning fw-bold fs-3">
                    ${pizza.salePrice}
                  </span>{" "}
                  <span className="text-muted text-decoration-line-through fs-5">
                    ${pizza.originalPrice}
                  </span>
                </>
              ) : (
                <span className="fw-bold fs-3 text-warning">
                  ${pizza.salePrice}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <h5 className="mt-4">Mô tả sản phẩm</h5>
            <p className="text-secondary">
              Đây là một chiếc pizza cao cấp với nguyên liệu tươi ngon,
              phô mai béo ngậy và hương vị đặc trưng của Pizza House.
            </p>

            {/* NUTRITION */}
            <h5 className="mt-4">Thông tin dinh dưỡng</h5>
            <ul className="text-secondary">
              <li>Calo: 250–300</li>
              <li>Protein: 10g</li>
              <li>Fat: 12g</li>
              <li>Carbs: 30g</li>
            </ul>

            {/* ACTION BUTTONS */}
            <div className="d-flex gap-3 mt-4">
              <Button variant="warning" size="lg" className="flex-fill">
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="flex-fill"
                onClick={() => navigate("/")}
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
