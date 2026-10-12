
import { useState } from "react";
import styles from "./contacto_in.module.css";
import logo from "../../../components/imagenes/HuertoHogar.png";
import NavigationBarIn from '../../../components/navbar/navbarIn';

export const Contacto = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = () => {
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    console.log("Mensaje enviado:", datos);
    setMensajeExito(true);
    setDatos({ nombre: '', correo: '', mensaje: '' });
    setErrores({});

    setTimeout(() => {
      setMensajeExito(false);
    }, 3000);
  };

  return (
    <>
      <NavigationBarIn/>

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

              {mensajeExito && (
                <div className="alert alert-success text-center mb-3" role="alert">
                  ¡Mensaje enviado con éxito! 🌿
                </div>
              )}

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

    </>
  );
};

export default Contacto;