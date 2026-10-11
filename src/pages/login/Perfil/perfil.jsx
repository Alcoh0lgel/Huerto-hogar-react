import React, { useState } from 'react';
import NavigationBarIn from '../../../components/navbar/navbarIn';

function Perfil() {
  
   //Nombre predeterminado
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Siempre Viva 123, Dpto 402',
    ciudad: 'Santiago',
  });

  // Estado para mostrar un mensaje al guardar los cambios
  const [mensajeExito, setMensajeExito] = useState(false);

  // Función para capturar lo que el usuario escribe en los inputs
  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };

  // Función para procesar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeExito(true);

    // Ocultar la alerta de éxito después de 3 segundos
    setTimeout(() => {
      setMensajeExito(false);
    }, 3000);
  };

  return (
    <>
      <NavigationBarIn  />

      <main className="contenido-principal py-4">
        <section className="container d-flex flex-column align-items-center">
          <h2 className="text-center mb-4">Gestionar Perfil 👤</h2>

          <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '650px' }}>
            <div className="card-body">

              {/* Mensaje de confirmación al guardar */}
              {mensajeExito && (
                <div className="alert alert-success text-center" role="alert">
                  ¡Perfil actualizado correctamente! 🌱
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Nombre Completo */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-bold">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Correo Electrónico */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Teléfono */}
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label fw-bold">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Dirección de Envío */}
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label fw-bold">
                    Dirección de Envío
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    value={perfil.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Ciudad / Comuna */}
                <div className="mb-4">
                  <label htmlFor="ciudad" className="form-label fw-bold">
                    Ciudad / Comuna
                  </label>
                  <select
                    className="form-select"
                    id="ciudad"
                    name="ciudad"
                    value={perfil.ciudad}
                    onChange={handleChange}
                  >
                    <option value="Santiago">Santiago</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Viña del Mar">Viña del Mar</option>
                    <option value="Concepción">Concepción</option>
                    <option value="Puerto Montt">Puerto Montt</option>
                    <option value="Villarrica">Villarrica</option>
                    <option value="Nacimiento">Nacimiento</option>
                  </select>
                </div>

                {/* Botón Guardar */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success py-2 fw-semibold">
                    Guardar Cambios
                  </button>
                </div>
              </form>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Perfil;