import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import styles from './navbar.module.css';

function NavigationBarIn() {
  const { carrito, handleOpenCarrito } = useContext(CartContext);

  return (
    <section className="sticky-top">
      <Navbar expand="lg" className={styles.customNavbar}>
        <Container fluid className="px-4">
          
          {/* Logo y Nombre */}
          <Navbar.Brand as={Link} to="/login/menu" className="d-flex align-items-center gap-2 py-0">
            <img src="/img/HuertoHogar.png" alt="Huerto Hogar" className={styles.logoNavbar} />
            <span className={styles.brandText}>Huerto Hogar</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center">
              
              <NavDropdown title={<span className={styles.navLink}>Productos</span>} id="productos-nav-dropdown">
                <NavDropdown.Item as={Link} to="/login/producto">Todos los Productos</NavDropdown.Item>
                <NavDropdown.Item href="#">Frutas Frescas</NavDropdown.Item>
                <NavDropdown.Item href="#">Verduras Orgánicas</NavDropdown.Item>
                <NavDropdown.Item href="#">Productos Orgánicos</NavDropdown.Item>
                <NavDropdown.Item href="#">Productos Lácteos</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/login/nosotros" className={styles.navLink}>
                Nosotros
              </Nav.Link>
              <Nav.Link as={Link} to="/login/blogs" className={styles.navLink}>
                Blogs
              </Nav.Link>
              <Nav.Link as={Link} to="/login/contacto" className={styles.navLink}>
                Contacto
              </Nav.Link>
              <Nav.Link as={Link} to="/login/perfil" className={styles.navLink}>
                Perfil
              </Nav.Link>

            </Nav>

            {/* Carrito + Salir */}
            <div className="d-flex align-items-center gap-3">
              <Button className={styles.btnCarrito} onClick={handleOpenCarrito}>
                🛒 Ver Carrito{' '}
                {carrito.length > 0 && (
                  <Badge bg="light" text="dark" className="ms-1">
                    {carrito.length}
                  </Badge>
                )}
              </Button>

              <div className="d-flex flex-column text-end">
                <Nav.Link as={Link} to="/" className={styles.authLink}>
                  Salir
                </Nav.Link>
              </div>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default NavigationBarIn;