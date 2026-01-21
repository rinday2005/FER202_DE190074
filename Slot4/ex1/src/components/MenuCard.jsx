import { Card, Button } from "react-bootstrap"

export default function MenuCard({ title, image, originalPrice, salePrice, badge, isNew, isSale }) {
  return (
    <Card className="menu-card h-100 position-relative shadow-sm">
      {(isSale || isNew) && (
        <div className={`badge-ribbon badge-left ${isSale ? "badge-sale" : "badge-new"}`}>
          {isSale ? "SALE" : "NEW"}
        </div>
      )}

      <Card.Img variant="top" src={image} alt={title} className="menu-card-img" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold fs-5">{title}</Card.Title>

        {/* Price */}
        <div className="mb-3">
          {originalPrice && salePrice ? (
            <>
              <span className="text-muted text-decoration-line-through me-2">${originalPrice}</span>
              <span className="text-warning fw-bold fs-5">${salePrice}</span>
            </>
          ) : (
            <span className="text-dark fw-bold fs-5">${salePrice || originalPrice}</span>
          )}
        </div>

        <Button variant="outline-dark" className="mt-auto">
          View Detail
        </Button>
        <Button variant="dark" className="mt-2">
          Buy
        </Button>
      </Card.Body>
    </Card>
  )
}
