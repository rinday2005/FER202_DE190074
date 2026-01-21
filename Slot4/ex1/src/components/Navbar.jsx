import { useState } from "react"
import { Navbar as BSNavbar, Container, Nav, Form, Button } from "react-bootstrap"
import { Search } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search for:", searchQuery)
  }

  const linkClass = (path) =>
    location.pathname === path ? "text-warning fw-bold" : "text-light"

  return (
    <BSNavbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Container>
        {/* Logo */}
        <BSNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-warning fs-4"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Pizza House
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          {/* Menu */}
          <Nav className="me-auto gap-3" style={{ fontFamily: "Times New Roman, serif" }}>
            <Nav.Link as={Link} to="/" className={linkClass("/")}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className={linkClass("/about")}>
              About Us
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className={linkClass("/contact")}>
              Contact
            </Nav.Link>
          </Nav>

          {/* Search */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="danger" type="submit">
              <Search size={18} />
            </Button>
          </Form>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}
