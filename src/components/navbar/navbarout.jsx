import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        
        {/* Logo y Nombre */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 py-0">
          <img src="/img/HuertoHogar.png" alt="Huerto Hogar" className="logo-navbar" />
          <span>Huerto Hogar</span>
        </Navbar.Brand>

        {/* Botón Hamburguesa */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">

            {/* Dropdown de Productos */}
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/producto">
                Todos los Productos
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Frutas Frescas</NavDropdown.Item>
              <NavDropdown.Item href="#">Verduras Orgánicas</NavDropdown.Item>
              <NavDropdown.Item href="#">Productos Orgánico</NavDropdown.Item>
              <NavDropdown.Item href="#">Productos Lácteos</NavDropdown.Item>
            </NavDropdown>

            {/* Enlaces de navegación */}
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>

          </Nav>

          {/* Sección Carrito + Acceder / Crear cuenta */}
          <div className="d-flex align-items-center gap-3">
            <Button 
              variant="primary" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              🛒 Ver Carrito
            </Button>

            <div className="d-flex flex-column text-end small">
              <Nav.Link as={Link} to="/acceder" className="py-0 fw-semibold text-dark">
                Acceder
              </Nav.Link>
              <Nav.Link as={Link} to="/crear-cuenta" className="py-0 text-secondary">
                Crear una cuenta
              </Nav.Link>
            </div>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;