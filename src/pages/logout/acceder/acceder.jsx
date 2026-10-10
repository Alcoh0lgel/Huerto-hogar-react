import { Link } from "react-router-dom";
import styles from "./acceder.module.css";
import logo from "../../../components/imagenes/HuertoHogar.png";
<<<<<<< HEAD
import App_navbarOut from "../../../components/navbar/navbarout"
export const Acceder = () => {
  return (
    <>
      <App_navbarOut/>
      

      
      <main className={styles.contenidoPrincipal}>
        <section id="formularioContacto">
          <div className={styles.contenedor}>
            <div className={styles.logo}>
              <img
                src={logo}
                alt="logo huerto hogar"
                className={styles.logoFormulario}
=======

export const Acceder = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link
              className="navbar-brand d-flex align-items-center gap-2 py-0"
              to="/"
            >
              <img src={logo} alt="Huerto Hogar" className="logo-navbar" />
              <span>Huerto Hogar</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <ul className="navbar-nav list-unstyled mb-0 small text-end">
              <li className="nav-item">
                <Link
                  className="nav-link py-0 fw-semibold"
                  to="/administrador/acceder"
                >
                  Acceder como administrador
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="contenido-principal">
        <section id="formularioContacto">
          <div className="contenedor">
            <div className="logo">
              <img
                src={logo}
                alt="logo huerto hogar"
                className="logo-formulario"
>>>>>>> eb17d03836a47621ee105e8bd513b7e8e130a2c8
              />
              <h2>Inicio de sesión</h2>

              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInputEmail"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInputEmail">Correo Electrónico</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInputPassword"
                  placeholder="Contraseña"
                />
                <label htmlFor="floatingInputPassword">Contraseña</label>
              </div>

<<<<<<< HEAD
              <div className={styles.acceder}>
                <div className="btn-envio">
                  <Link to="/login/menu" className="btn btn-success py-2">
=======
              <div className="acceder">
                <div className="btn-envio">
                  <Link to="/main-login" className="btn btn-success py-2">
>>>>>>> eb17d03836a47621ee105e8bd513b7e8e130a2c8
                    Acceder
                  </Link>
                </div>
                <a href="#">Recuperar contraseña</a>
              </div>
            </div>
          </div>
        </section>
      </main>
<<<<<<< HEAD
=======

>>>>>>> eb17d03836a47621ee105e8bd513b7e8e130a2c8
      
    </>

  );
};

export default Acceder;