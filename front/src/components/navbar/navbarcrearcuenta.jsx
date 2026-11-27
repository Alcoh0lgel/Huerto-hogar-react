import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function NavbarCrearCuenta() {
  return (
    <section className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid">

          {/* Logo y Nombre */}
          <Link className="navbar-brand d-flex align-items-center gap-2 py-0" to="/">
            <img 
              src="/img/HuertoHogar.png" 
              alt="Huerto Hogar" 
              className="logo-navbar"
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
            <span>Huerto Hogar</span>
          </Link>

          <Nav.Link as={Link} to="/acceder" className="py-0 text-secondary">
                Ir a iniciar sesion
              </Nav.Link>

        </div>
      </nav>
    </section>
  );
}

export default NavbarCrearCuenta;