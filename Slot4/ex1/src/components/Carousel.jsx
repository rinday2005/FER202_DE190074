import { carouselSlides } from "../data/carousel.js"
import { Carousel } from "react-bootstrap"

export default function HeroCarousel() {
  return (
    <Carousel>
      {carouselSlides.map((slide) => (
        <Carousel.Item key={slide.id} interval={3000}>
          <img className="d-block w-100" src={slide.image || "/placeholder.svg"} alt={slide.alt} />
          <Carousel.Caption>
            <h1 className="display-4 fw-bold">{slide.title}</h1>
            <p className="fs-5">{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}