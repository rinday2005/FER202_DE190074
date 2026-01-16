import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./components/Navbar"
import Carousel from "./components/Carousel"
import MenuSection from "./components/MenuSection"
import Booking from "./components/Booking"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="dark-bg">
      <Navbar />
      <Carousel />
      <MenuSection />
      <Booking />
      <Footer />
    </div>
  )
}
