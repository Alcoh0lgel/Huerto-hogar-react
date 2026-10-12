import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function NavbarAcceder() {
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

          {/* Botón Toggler para celulares */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarAdminCollapse"
            aria-controls="navbarAdminCollapse" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Enlace lateral derecho */}
          <div className="d-flex flex-column text-end small">
              <Nav.Link as={Link} to="/admin/acceder" className="py-0 fw-semibold text-dark">
                Acceder como administrador
              </Nav.Link>
              <Nav.Link as={Link} to="/crearCuenta" className="py-0 text-secondary">
                Crear una cuenta
              </Nav.Link>
            </div>

        </div>
      </nav>
    </section>
  );
}

export default NavbarAcceder;