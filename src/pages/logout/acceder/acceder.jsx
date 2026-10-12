import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAcceder from '../../../components/navbar/navbaracceder';
import AppFooter from '../../../components/footer/footer';
import logo from '../../../components/imagenes/HuertoHogar.png';
import styles from './acceder.module.css';

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

// Función de validación externa
const validar = (datos) => {
  const errores = {};

  const correo = datos.correo.trim();
  const partesCorreo = correo.split('@');
  const dominio = partesCorreo.length > 1 ? partesCorreo[1] : '';

  if (correo === '') {
    errores.correo = 'El correo es obligatorio.';
  } else if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    errores.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com';
  }

  const password = datos.password.trim();
  if (password === '') {
    errores.password = 'La contraseña es obligatoria.';
  } else if (password.length < 4 || password.length > 10) {
    errores.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
  }

  return errores;
};

export const Acceder = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    correo: '',
    password: '',
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = () => {
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    // Proceso de inicio de sesión
    console.log("Inicio de sesión exitoso:", datos);
    navigate('/login/menu');
  };

  return (
    <>
      <NavbarAcceder />

      <main className={styles.contenidoPrincipal}>
        <div className={styles.contenedor}>
          
          {/* Logo Centrado */}
          <img
            src={logo}
            alt="Huerto Hogar Logo"
            className={styles.logoFormulario}
          />

          {/* Título en Café Tierra */}
          <h2 className={styles.tituloFormulario}>Inicio de sesión</h2>

          <form>
            {/* Campo Correo Electrónico */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${styles.inputCustom}`}
                id="inputCorreo"
                name="correo"
                placeholder="Correo Electrónico"
                value={datos.correo}
                onChange={handleChange}
              />
              <label htmlFor="inputCorreo">Correo Electrónico</label>
              {errores.correo && <div className={styles.textoError}>{errores.correo}</div>}
            </div>

            {/* Campo Contraseña */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${styles.inputCustom}`}
                id="inputPassword"
                name="password"
                placeholder="Contraseña"
                value={datos.password}
                onChange={handleChange}
              />
              <label htmlFor="inputPassword">Contraseña</label>
              {errores.password && <div className={styles.textoError}>{errores.password}</div>}
            </div>

            {/* Fila de Botón "Acceder" + Enlace "Recuperar contraseña" */}
            <div className={styles.acciones}>
              <button
                type="button"
                className={styles.btnAcceder}
                onClick={handleSubmit}
              >
                Acceder
              </button>

              <Link to="#" className={styles.linkRecuperar}>
                Recuperar contraseña
              </Link>
            </div>
          </form>

        </div>
      </main>

      <AppFooter />
    </>
  );
};

export default Acceder;