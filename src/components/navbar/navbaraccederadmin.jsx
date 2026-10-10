import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function NavbarAdminPublic() {
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark px-4 py-3 shadow-sm">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Logo y Nombre (redirige al inicio/logout) */}
        <Navbar.Brand
          as={Link}
          to="/login/menu"
          className="d-flex align-items-center gap-2 py-0"
        >
          <img src="/img/HuertoHogar.png" alt="Huerto Hogar" className={styles.logoNavbar}/>
          <span>Huerto Hogar</span>
        </Navbar.Brand>

        {/* Enlace para acceder como cliente */}
        <Nav className="navbar-nav list-unstyled mb-0 small text-end">
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/acceder" 
              className="py-0 fw-semibold text-white-50"
            >
              Acceder como Cliente
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarAdminPublic;