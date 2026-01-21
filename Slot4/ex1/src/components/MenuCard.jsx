import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function MenuCard({
  id,
  title,
  image,
  originalPrice,
  salePrice,
  isNew,
  isSale,
}) {
  const navigate = useNavigate()

  return (
    <Card className="menu-card h-100 position-relative shadow-sm">
      {/* Badge NEW / SALE */}
      {(isSale || isNew) && (
        <div
          className={`badge-ribbon badge-left ${
            isSale ? "badge-sale" : "badge-new"
          }`}
        >
          {isSale ? "SALE" : "NEW"}
        </div>
      )}

      {/* Image */}
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        className="menu-card-img"
      />

      <Card.Body className="d-flex flex-column">
        {/* Title */}
        <Card.Title className="fw-bold fs-5">{title}</Card.Title>

        {/* Price */}
        <div className="mb-3">
          {originalPrice ? (
            <>
              <span className="text-muted text-decoration-line-through me-2">
                ${originalPrice}
              </span>
              <span className="text-warning fw-bold fs-5">
                ${salePrice}
              </span>
            </>
          ) : (
            <span className="text-dark fw-bold fs-5">
              ${salePrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <Button
          variant="outline-dark"
          className="mt-auto"
          onClick={() => navigate(`/pizza/${id}`)}
        >
          View Detail
        </Button>

        <Button variant="dark" className="mt-2">
          Buy
        </Button>
      </Card.Body>
    </Card>
  )
}
