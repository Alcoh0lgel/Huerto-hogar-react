import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NavigationBarIn() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        
        {/* Logo y Nombre (redirige al menú principal del usuario) */}
        <Navbar.Brand as={Link} to="/login/menu" className="d-flex align-items-center gap-2 py-0">
          <img src="/img/HuertoHogar.png" alt="Huerto Hogar" className="logo-navbar" />
          <span>Huerto Hogar</span>
        </Navbar.Brand>

        {/* Botón Hamburguesa */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">

            {/* Dropdown de Productos */}
            <NavDropdown title="Productos" id="productos-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login/producto">
                Todos los Productos
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Frutas Frescas</NavDropdown.Item>
              <NavDropdown.Item href="#">Verduras Orgánicas</NavDropdown.Item>
              <NavDropdown.Item href="#">Productos Orgánicos</NavDropdown.Item>
              <NavDropdown.Item href="#">Productos Lácteos</NavDropdown.Item>
            </NavDropdown>

            {/* Enlaces de navegación */}
            <Nav.Link as={Link} to="/login/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/login/blogs">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/login/contacto">Contacto</Nav.Link>

            {/* Dropdown de Perfil */}
            <NavDropdown title="Perfil" id="perfil-nav-dropdown">
              <NavDropdown.Item href="#">Gestionar Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#">Seguimiento de Pedidos</NavDropdown.Item>
              <NavDropdown.Item href="#">Historial de Pedidos</NavDropdown.Item>
            </NavDropdown>

          </Nav>

          {/* Sección Carrito + Salir */}
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
              <Nav.Link as={Link} to="/" className="py-0 fw-semibold text-dark">
                Salir
              </Nav.Link>
            </div>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBarIn;