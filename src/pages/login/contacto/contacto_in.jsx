import { useState } from "react";
import styles from "./contacto_in.module.css";
import logo from "../../../components/imagenes/HuertoHogar.png";
import AppFooter from "../../../components/footer/footer";
import NavigationBarIn from "../../../components/navbar/navbarIn";

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

// Validación declarada fuera del componente (patrón docente)
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
        <div className={styles.contenedor}>
          
          {/* Logo Centrado */}
          <img
            src={logo}
            alt="Logo Huerto Hogar"
            className={styles.logoFormulario}
          />

          {/* Título en Café Tierra */}
          <h2 className={styles.tituloFormulario}>Formulario de Contacto</h2>

          {/* Alerta de Éxito */}
          {mensajeExito && (
            <div className="alert alert-success text-center mb-4 rounded-3" role="alert">
              ¡Mensaje enviado con éxito! 🌿
            </div>
          )}

          {/* Formulario */}
          <form>
            {/* Campo Nombre Completo */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${styles.inputCustom}`}
                id="contactoNombre"
                name="nombre"
                placeholder="Nombre Completo"
                value={datos.nombre}
                onChange={handleChange}
              />
              <label htmlFor="contactoNombre">Nombre Completo</label>
              {errores.nombre && <div className={styles.textoError}>{errores.nombre}</div>}
            </div>

            {/* Campo Correo Electrónico */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${styles.inputCustom}`}
                id="contactoCorreo"
                name="correo"
                placeholder="Correo Electrónico"
                value={datos.correo}
                onChange={handleChange}
              />
              <label htmlFor="contactoCorreo">Correo Electrónico</label>
              {errores.correo && <div className={styles.textoError}>{errores.correo}</div>}
            </div>

            {/* Campo Mensaje */}
            <div className="form-floating mb-3">
              <textarea
                className={`form-control ${styles.inputCustom}`}
                id="contactoMensaje"
                name="mensaje"
                placeholder="Mensaje"
                style={{ height: "130px" }}
                value={datos.mensaje}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="contactoMensaje">Mensaje</label>
              {errores.mensaje && <div className={styles.textoError}>{errores.mensaje}</div>}
            </div>

            {/* Botón Verde Centrado */}
            <div className={styles.btnEnvio}>
              <button
                type="button"
                className={styles.btnSubmit}
                onClick={handleSubmit}
              >
                Enviar Mensaje
              </button>
            </div>
          </form>

        </div>
      </main>

      <AppFooter />
    </>
  );
};

export default Contacto;