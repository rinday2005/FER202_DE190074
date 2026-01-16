
import { useState } from "react"
import { Navbar as BSNavbar, Container, Nav, Form, Button } from "react-bootstrap"
import { Search } from "lucide-react"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search for:", searchQuery)
  }

  return (
    <BSNavbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Container>

        <BSNavbar.Brand href="#" className="fw-bold text-warning fs-4" style={{ fontFamily: "Times New Roman, serif" }}>
          Pizza House
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 align-items-lg-center gap-5" style={{ justifyContent: "space-around", fontFamily: "Times New Roman, serif" }}>
            <Nav.Link href="#home" className="text-light">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="text-light">
              About Us
            </Nav.Link>
            <Nav.Link href="#contact" className="text-light">
              Contact
            </Nav.Link>

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
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}
