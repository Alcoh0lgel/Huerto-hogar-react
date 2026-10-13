import { useState } from "react";
import styles from "./contacto_out.module.css";
import logo from "../../../components/imagenes/HuertoHogar.png";
import App_navbarOut from "../../../components/navbar/navbarout";
import AppFooter from '../../../components/footer/footer';
import App_alert from "../../../components/alerts/alertas";

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];


const validar = (datos) => {
  const errores = {};

  const nombre = datos.nombre.trim();
  if (nombre === '') {
    errores.nombre = 'El nombre es obligatorio.';
  } else if (nombre.length > 50) {
    errores.nombre = 'Máximo 50 caracteres.';
  }

  const correo = datos.correo.trim();
  const partesCorreo = correo.split('@');
  const dominio = partesCorreo.length > 1 ? partesCorreo[1] : '';

  if (correo === '') {
    errores.correo = 'El correo es obligatorio.';
  } else if (correo.length > 100) {
    errores.correo = 'Máximo 100 caracteres.';
  } else if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    errores.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com';
  }

  const mensaje = datos.mensaje.trim();
  if (mensaje === '') {
    errores.mensaje = 'El mensaje es obligatorio.';
  } else if (mensaje.length > 1000) {
    errores.mensaje = 'El mensaje no debe superar los 1000 caracteres.';
  }

  return errores;
};

export const Contacto = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});

  const [alerta, setAlerta] = useState({
    mostrar: false,
    variant: 'success',
    msg: '',
  });

  const cerrarAlert = () => setAlerta((prev) => ({ ...prev, mostrar: false }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = () => {
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setAlerta({
        mostrar: true,
        variant: 'danger',
        msg: 'Revisa los campos marcados antes de enviar.',
      });
      return;
    }

    console.log("Mensaje enviado:", datos);
    setAlerta({
      mostrar: true,
      variant: 'success',
      msg: '¡Mensaje enviado con éxito! 🌿',
    });
    setDatos({ nombre: '', correo: '', mensaje: '' });
    setErrores({});

    setTimeout(() => {
      setAlerta((prev) => ({ ...prev, mostrar: false }));
    }, 3000);
  };

  return (
    <>
      <App_navbarOut />

      <main className={styles.contenidoPrincipal}>
        <section id="formularioContacto">
          <div className={styles.contenedor}>
            <div className={styles.logo}>
              <img
                src={logo}
                alt="logo huerto hogar"
                className={styles.logoFormulario}
              />
              <h2>Formulario de Contacto</h2>

              <App_alert
                mostrarAlert={alerta.mostrar}
                cerrarAlert={cerrarAlert}
                variant={alerta.variant}
                msgAlert={alerta.msg}
              />

              {/* Nombre Completo */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="contactoNombre"
                  name="nombre"
                  placeholder="Pepito Perez"
                  value={datos.nombre}
                  onChange={handleChange}
                />
                <label htmlFor="contactoNombre">Nombre Completo</label>
                <div className={styles.textoError}>{errores.nombre}</div>
              </div>

              {/* Correo Electrónico */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="contactoCorreo"
                  name="correo"
                  placeholder="name@example.com"
                  value={datos.correo}
                  onChange={handleChange}
                />
                <label htmlFor="contactoCorreo">Correo Electrónico</label>
                <div className={styles.textoError}>{errores.correo}</div>
              </div>

              {/* Mensaje */}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="contactoMensaje"
                  name="mensaje"
                  placeholder="Escribe tu mensaje"
                  style={{ height: "100px" }}
                  value={datos.mensaje}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="contactoMensaje">Mensaje</label>
                <div className={styles.textoError}>{errores.mensaje}</div>
              </div>

              {/* Botón de Enviar */}
              <div className={styles.btnEnvio}>
                <button
                  type="button"
                  className="btn btn-success py-2"
                  onClick={handleSubmit}
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
};

export default Contacto;