import { useState } from "react";
import styles from "./contacto_out.module.css";
import logo from "../../../components/imagenes/HuertoHogar.png";
import App_navbarOut from "../../../components/navbar/navbarout";

export const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", form);
    setForm({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <>
      <App_navbarOut />

      <main className={styles.contenidoPrincipal}>
        <section id="formularioContacto">
          <div className={styles.contenedor}>
            <form className={styles.logo} onSubmit={handleSubmit}>
              <img
                src={logo}
                alt="logo huerto hogar"
                className={styles.logoFormulario}
              />
              <h2>Formulario de Contacto</h2>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="contactoNombre"
                  name="nombre"
                  placeholder="Pepito Perez"
                  value={form.nombre}
                  onChange={handleChange}
                />
                <label htmlFor="contactoNombre">Nombre Completo</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="contactoCorreo"
                  name="correo"
                  placeholder="name@example.com"
                  value={form.correo}
                  onChange={handleChange}
                />
                <label htmlFor="contactoCorreo">Correo Electrónico</label>
              </div>

              <div className="form-floating py-2">
                <textarea
                  className="form-control"
                  id="contactoMensaje"
                  name="mensaje"
                  placeholder="Escribe tu mensaje"
                  style={{ height: "100px" }}
                  value={form.mensaje}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="contactoMensaje">Mensaje</label>
              </div>

              <div className={styles.btnEnvio}>
                <button type="submit" className="btn btn-success py-2">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

    </>
  );
};

export default Contacto;