import React, { useState, useEffect } from 'react';
import AppFooter from '../../../components/footer/footer';
import styles from './perfil.module.css';
import NavigationBarIn from '../../../components/navbar/navbarIn';

// Función de validación declarada fuera del componente
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

const validarPerfil = (datos) => {
  const errores = {};

  // Validar Nombre
  const nombre = datos.nombre.trim();
  if (nombre === '') {
    errores.nombre = 'El nombre es obligatorio.';
  } else if (nombre.length > 50) {
    errores.nombre = 'Máximo 50 caracteres.';
  }

  // Validar Correo
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

  // Validar Teléfono
  const telefono = datos.telefono.trim();
  if (telefono === '') {
    errores.telefono = 'El teléfono es obligatorio.';
  } else if (telefono.length > 15) {
    errores.telefono = 'El teléfono no debe superar los 15 caracteres.';
  }

  // Validar Dirección
  const direccion = datos.direccion.trim();
  if (direccion === '') {
    errores.direccion = 'La dirección es obligatoria.';
  } else if (direccion.length > 200) {
    errores.direccion = 'La dirección no debe superar los 200 caracteres.';
  }

  return errores;
};

// Historial de compras ficticio para darle complejidad
const historialPedidos = [
  {
    id: "HH-8492",
    fecha: "10 de Octubre, 2026",
    total: 12500,
    estado: "Entregado",
    productos: "2kg Manzana Fuji, 1kg Espinacas, 1kg Zanahorias Orgánicas"
  },
  {
    id: "HH-8311",
    fecha: "28 de Septiembre, 2026",
    total: 8900,
    estado: "Entregado",
    productos: "3kg Naranjas Valencia, 2kg Plátanos Cavendish"
  },
  {
    id: "HH-8510",
    fecha: "12 de Octubre, 2026",
    total: 15300,
    estado: "En camino",
    productos: "1kg Pimientos Tricolores, 2kg Manzana Fuji, Miel de Ulmo"
  }
];

export const Perfil = () => {
  const [pestaña, setPestaña] = useState('personal'); // 'personal', 'direccion', 'pedidos', 'seguridad'
  
  const [datos, setDatos] = useState({
    nombre: 'Juan Pérez',
    correo: 'juan.perez@gmail.com',
    telefono: '+56 9 1234 5678',
    rut: '19.876.543-2',
    direccion: 'Av. Siempre Viva 123, Dpto 402',
    comuna: 'Santiago',
    region: 'Región Metropolitana',
    indicaciones: 'Dejar con el conserje en caso de no responder.'
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  // Cargar datos guardados previamente en localStorage
  useEffect(() => {
    const perfilGuardado = localStorage.getItem('perfilHuertoHogar');
    if (perfilGuardado) {
      setDatos(JSON.parse(perfilGuardado));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarPerfil(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    // Guardar en localStorage
    localStorage.setItem('perfilHuertoHogar', JSON.stringify(datos));
    
    setMensajeExito(true);
    setTimeout(() => {
      setMensajeExito(false);
    }, 3000);
  };

  // Obtener iniciales para el Avatar
  const obtenerIniciales = (nombre) => {
    return nombre
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <NavigationBarIn />

      <main className={styles.contenidoPrincipal}>
        <div className="container">
          
          <h2 className={`text-center ${styles.tituloSeccion}`}>
            Gestionar Perfil 👤
          </h2>

          {/* Alerta de confirmación */}
          {mensajeExito && (
            <div className="alert alert-success text-center max-w-lg mx-auto mb-4 rounded-3 shadow-sm" role="alert">
              ¡Perfil actualizado con éxito! 🌿 Sus datos han sido guardados.
            </div>
          )}

          <div className="row g-4">
            
            {/* Columna Izquierda: Tarjeta de Resumen y Menú Sidebar */}
            <div className="col-12 col-lg-4">
              <div className={styles.tarjetaBlanca}>
                <div className="text-center">
                  
                  {/* Avatar Circular con Iniciales */}
                  <div className={styles.avatarBox}>
                    {obtenerIniciales(datos.nombre || 'JP')}
                  </div>

                  <h4 className={styles.nombreUsuarioSidebar}>{datos.nombre}</h4>
                  <p className={styles.correoSidebar}>{datos.correo}</p>
                  
                  <span className={styles.badgeCliente}>
                    🌱 Cliente Frecuente
                  </span>
                </div>

                <hr className="my-3 text-muted" />

                {/* Menú de Navegación Lateral */}
                <nav className={styles.menuNavegacion}>
                  <button
                    className={`${styles.btnTab} ${pestaña === 'personal' ? styles.btnTabActive : ''}`}
                    onClick={() => setPestaña('personal')}
                  >
                    👤 Información Personal
                  </button>
                  <button
                    className={`${styles.btnTab} ${pestaña === 'direccion' ? styles.btnTabActive : ''}`}
                    onClick={() => setPestaña('direccion')}
                  >
                    🏠 Dirección de Envío
                  </button>
                  <button
                    className={`${styles.btnTab} ${pestaña === 'pedidos' ? styles.btnTabActive : ''}`}
                    onClick={() => setPestaña('pedidos')}
                  >
                    📦 Historial de Pedidos
                  </button>
                  <button
                    className={`${styles.btnTab} ${pestaña === 'seguridad' ? styles.btnTabActive : ''}`}
                    onClick={() => setPestaña('seguridad')}
                  >
                    🔒 Seguridad y Clave
                  </button>
                </nav>
              </div>
            </div>

            {/* Columna Derecha: Formulario según la pestaña activa */}
            <div className="col-12 col-lg-8">
              <div className={styles.tarjetaBlanca}>
                
                {/* PESTAÑA 1: INFORMACIÓN PERSONAL */}
                {pestaña === 'personal' && (
                  <div>
                    <h3 className={styles.tituloFormulario}>Datos Personales</h3>
                    <form onSubmit={handleGuardar}>
                      <div className="row g-3">
                        
                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Nombre Completo</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="nombre"
                            value={datos.nombre}
                            onChange={handleChange}
                          />
                          {errores.nombre && <div className={styles.textoError}>{errores.nombre}</div>}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">RUT / DNI</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="rut"
                            value={datos.rut}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Correo Electrónico</label>
                          <input
                            type="email"
                            className={`form-control ${styles.inputCustom}`}
                            name="correo"
                            value={datos.correo}
                            onChange={handleChange}
                          />
                          {errores.correo && <div className={styles.textoError}>{errores.correo}</div>}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Teléfono de Contacto</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="telefono"
                            value={datos.telefono}
                            onChange={handleChange}
                          />
                          {errores.telefono && <div className={styles.textoError}>{errores.telefono}</div>}
                        </div>

                        <div className="col-12 mt-4 text-end">
                          <button type="submit" className={styles.btnGuardar}>
                            Guardar Cambios
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>
                )}

                {/* PESTAÑA 2: DIRECCIÓN DE ENVÍO */}
                {pestaña === 'direccion' && (
                  <div>
                    <h3 className={styles.tituloFormulario}>Dirección de Entrega</h3>
                    <form onSubmit={handleGuardar}>
                      <div className="row g-3">
                        
                        <div className="col-12">
                          <label className="form-label fw-bold text-secondary small">Calle y Número (Av. / Depto / Casa)</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="direccion"
                            value={datos.direccion}
                            onChange={handleChange}
                          />
                          {errores.direccion && <div className={styles.textoError}>{errores.direccion}</div>}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Comuna</label>
                          <select
                            className={`form-select ${styles.inputCustom}`}
                            name="comuna"
                            value={datos.comuna}
                            onChange={handleChange}
                          >
                            <option value="Santiago">Santiago</option>
                            <option value="Providencia">Providencia</option>
                            <option value="Ñuñoa">Ñuñoa</option>
                            <option value="Las Condes">Las Condes</option>
                            <option value="Maipú">Maipú</option>
                            <option value="Viña del Mar">Viña del Mar</option>
                            <option value="Concepción">Concepción</option>
                          </select>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Región</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="region"
                            value={datos.region}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold text-secondary small">Indicaciones para el Repartidor</label>
                          <textarea
                            className={`form-control ${styles.inputCustom}`}
                            rows="3"
                            name="indicaciones"
                            value={datos.indicaciones}
                            onChange={handleChange}
                          ></textarea>
                        </div>

                        <div className="col-12 mt-4 text-end">
                          <button type="submit" className={styles.btnGuardar}>
                            Actualizar Dirección
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>
                )}

                {/* PESTAÑA 3: HISTORIAL DE PEDIDOS */}
                {pestaña === 'pedidos' && (
                  <div>
                    <h3 className={styles.tituloFormulario}>Historial de Pedidos Recientes</h3>
                    <div>
                      {historialPedidos.map((pedido) => (
                        <div key={pedido.id} className={styles.itemPedido}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <span className="fw-bold text-dark me-2">Pedido #{pedido.id}</span>
                              <span className="text-muted small">({pedido.fecha})</span>
                            </div>
                            <span className={pedido.estado === 'Entregado' ? styles.badgeEstadoEntregado : styles.badgeEstadoCamino}>
                              {pedido.estado === 'Entregado' ? '✓ Entregado' : '🚚 En camino'}
                            </span>
                          </div>
                          <p className="text-muted small mb-2">{pedido.productos}</p>
                          <div className="text-end fw-bold text-success">
                            Total: $ {pedido.total.toLocaleString('es-CL')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PESTAÑA 4: SEGURIDAD */}
                {pestaña === 'seguridad' && (
                  <div>
                    <h3 className={styles.tituloFormulario}>Cambiar Contraseña</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Contraseña actualizada con éxito."); }}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-bold text-secondary small">Contraseña Actual</label>
                          <input type="password" className={`form-control ${styles.inputCustom}`} required />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Nueva Contraseña</label>
                          <input type="password" className={`form-control ${styles.inputCustom}`} required />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">Confirmar Nueva Contraseña</label>
                          <input type="password" className={`form-control ${styles.inputCustom}`} required />
                        </div>
                        <div className="col-12 mt-4 text-end">
                          <button type="submit" className={styles.btnGuardar}>
                            Cambiar Clave
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>

      <AppFooter />
    </>
  );
};

export default Perfil;