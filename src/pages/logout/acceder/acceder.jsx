import { Link } from "react-router-dom";
import styles from "./acceder.module.css";
import logo from "../../../components/imagenes/HuertoHogar.png";
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

              <div className={styles.acceder}>
                <div className="btn-envio">
                  <Link to="/login/menu" className="btn btn-success py-2">
                    Acceder
                  </Link>
                </div>
                <a href="#">Recuperar contraseña</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </>

  );
};

export default Acceder;