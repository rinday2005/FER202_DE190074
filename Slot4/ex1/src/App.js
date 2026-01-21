import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Carousel from "./components/Carousel"
import MenuSection from "./components/MenuSection"
import Booking from "./components/Booking"
import Footer from "./components/Footer"
import About from "./components/About"
import Contact from "./components/Contact"

function HomePage() {
  return (
    <>
      <Carousel />
      <MenuSection />
      <Booking />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="dark-bg">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}
