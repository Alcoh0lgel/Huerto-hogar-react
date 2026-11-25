import React, { useState, useEffect } from 'react';
import AppFooter from '../../../components/footer/footer';
import styles from './perfil.module.css';
import NavigationBarIn from '../../../components/navbar/navbarIn';
import ModalBoletas from '../../../components/modal/modalboletas';
import { getPerfilUsuario, actualizarPerfilUsuario } from '../../../api/usuarioApi';
import { getMisBoletas, getDetallesBoleta } from '../../../api/boletaApi';

// Función de validación declarada fuera del componente
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

const validarPerfil = (datos) => {
  const errores = {};

  const nombre = datos.nombre.trim();
  if (nombre === '') {
    errores.nombre = 'El nombre es obligatorio.';
  } else if (nombre.length > 50) {
    errores.nombre = 'Máximo 50 caracteres.';
  }
  const apellido = (datos.apellido || '').trim();
  if (apellido === '') {
    errores.apellido = 'El apellido es obligatorio.';
  }

  const correo = (datos.correo|| '').trim();
  const partesCorreo = correo.split('@');
  const dominio = partesCorreo.length > 1 ? partesCorreo[1] : '';

  if (correo === '') {
    errores.correo = 'El correo es obligatorio.';
  } else if (correo.length > 100) {
    errores.correo = 'Máximo 100 caracteres.';
  } else if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    errores.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com';
  }

  const telefono = (datos.telefono ||'').trim();
  if (telefono === '') {
    errores.telefono = 'El teléfono es obligatorio.';
  } else if (telefono.length > 15) {
    errores.telefono = 'El teléfono no debe superar los 15 caracteres.';
  }

  const direccion = datos.direccion.trim();
  if (direccion === '') {
    errores.direccion = 'La dirección es obligatoria.';
  } else if (direccion.length > 200) {
    errores.direccion = 'La dirección no debe superar los 200 caracteres.';
  }

  return errores;
};



export const Perfil = () => {
  const [pestaña, setPestaña] = useState('personal');
  const [cargando, setCargando] = useState(true);
  
  const [datos, setDatos] = useState({
    id_usuario: null,
    run: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: 'CLIENTE'
  });
  const [boletas, setBoletas] = useState([]);
  const [boletaModal, setBoletaModal] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [usuarioBack, boletasBack] = await Promise.all([
          getPerfilUsuario(),
          getMisBoletas()
        ]);
        if (usuarioBack) setDatos(usuarioBack);
        if (boletasBack) setBoletas(boletasBack);
      } catch (error) {
        console.error('Error al cargar perfil y boletas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    const nuevosErrores = validarPerfil(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      const actualizado = await actualizarPerfilUsuario(datos);
      setDatos(actualizado);
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('No se pudieron guardar los cambios en el servidor.');
    }
  };

  const handleAbrirBoleta = async (boleta) => {
    let itemsFormateados = [];
    try {
      const detalles = await getDetallesBoleta(boleta.idBoleta);
      itemsFormateados = (detalles || []).map((det, index) => ({
        id: det.idDetalleBoleta || index,
        nombre: det.producto?.nombreProducto || det.producto?.nombre || 'Producto Huerto Hogar',
        cantidad: det.cantidad,
        precioUnitario: det.precioUnitario || det.producto?.precio || 0
      }));
    } catch (err) {
      console.warn('No se pudieron cargar los ítems de detalle:', err);
    }

    setBoletaModal({
      idBoleta: `HH-${boleta.idBoleta}`,
      fecha: boleta.fechaEmision,
      montoTotal: boleta.montoTotal,
      cliente: {
        nombre: `${datos.nombre} ${datos.apellido}`,
        rut: datos.run,
        direccion: datos.direccion,
        telefono: datos.telefono,
        metodoPago: 'Webpay / Transferencia'
      },
      items: itemsFormateados
    });
    setMostrarModal(true);
  };

  const obtenerIniciales = (nombre, apellido) => {
    const n = (nombre || '').trim()[0] || '';
    const a = (apellido || '').trim()[0] || '';
    return (n + a).toUpperCase() || 'HH';
  };

  if (cargando) {
    return (
      <>
        <NavigationBarIn />
        <main className={styles.contenidoPrincipal}>
          <div className="container text-center py-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-3 text-muted">Cargando tu perfil...</p>
          </div>
        </main>
        <AppFooter />
      </>
    );
  }

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
                    {obtenerIniciales(datos.nombre, datos.apellido)}
                  </div>

                  <h4 className={styles.nombreUsuarioSidebar}>
                    {datos.nombre} {datos.apellido}
                  </h4>
                  <p className={styles.correoSidebar}>{datos.correo}</p>
                  
                  <span className={styles.badgeCliente}>
                    🌱 {datos.rol}
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
                    📦 Historial de Pedidos ({boletas.length})
                  </button>
                  <button
                    className={`${styles.btnTab} ${pestaña === 'pedidos' ? styles.btnTabActive : ''}`}
                    onClick={() => setPestaña('pedidos')}
                  >
                    🧾 Mis Boletas ({boletas.length})
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
                          <label className="form-label fw-bold text-secondary small">Nombre</label>
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
                          <label className="form-label fw-bold text-secondary small">Apellido</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="apellido"
                            value={datos.apellido}
                            onChange={handleChange}
                          />
                          {errores.apellido && <div className={styles.textoError}>{errores.apellido}</div>}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-bold text-secondary small">RUN</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="run"
                            value={datos.run}
                            onChange={handleChange}
                          />
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

                        <div className="col-12">
                          <label className="form-label fw-bold text-secondary small">Correo Electrónico</label>
                          <input
                            type="email"
                            className={`form-control ${styles.inputCustom}`}
                            name="correo"
                            value={datos.correo}
                            disabled
                          />
                          <small className="text-muted">El correo asociado a tu cuenta no se puede modificar.</small>
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
                          <label className="form-label fw-bold text-secondary small">Dirección Completa</label>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCustom}`}
                            name="direccion"
                            value={datos.direccion}
                            onChange={handleChange}
                          />
                          {errores.direccion && <div className={styles.textoError}>{errores.direccion}</div>}
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
                    <h3 className={styles.tituloFormulario}>Historial de Pedidos</h3>
                    {boletas.length === 0 ? (
                      <p className="text-muted">Aún no has realizado pedidos en Huerto Hogar.</p>
                    ) : (
                      <div>
                        {boletas.map((boleta) => (
                          <div key={boleta.idBoleta} className={styles.itemPedido}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div>
                                <span className="fw-bold text-dark me-2">Pedido #HH-{boleta.idBoleta}</span>
                                <span className="text-muted small">({boleta.fechaEmision})</span>
                              </div>
                              <span className={styles.badgeEstadoEntregado}>
                                ✓ Confirmado
                              </span>
                            </div>
                            <p className="text-muted small mb-2">
                              Dirección de entrega: {datos.direccion}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setPestaña('boletas')}
                              >
                                Ir a su boleta →
                              </button>
                              <span className="fw-bold text-success">
                                Total: $ {boleta.montoTotal.toLocaleString('es-CL')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* PESTAÑA 4: MIS BOLETAS */}
                {pestaña === 'boletas' && (
                  <div>
                    <h3 className={styles.tituloFormulario}>Mis Boletas Electrónicas</h3>
                    {boletas.length === 0 ? (
                      <p className="text-muted">Aún no tienes boletas emitidas a tu nombre.</p>
                    ) : (
                      <div>
                        {boletas.map((boleta) => (
                          <div key={boleta.idBoleta} className={styles.itemPedido}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div>
                                <span className="fw-bold text-dark me-2">Boleta N° {boleta.idBoleta}</span>
                                <span className="text-muted small">Emitida el {boleta.fechaEmision}</span>
                              </div>
                              <span className={styles.badgeEstadoEntregado}>
                                🧾 Documento Válido
                              </span>
                            </div>

                            <p className="text-muted small mb-2">
                              Emisor: {boleta.nombreEmisor} — RUT: {boleta.rutEmisor}
                            </p>

                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleAbrirBoleta(boleta)}
                              >
                                🔍 Ver Detalle Boleta
                              </button>
                              <span className="fw-bold text-success">
                                Total: $ {boleta.montoTotal.toLocaleString('es-CL')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}


                {/* PESTAÑA 5: SEGURIDAD */}
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

      <ModalBoletas
        show={mostrarModal}
        onClose={() => setMostrarModal(false)}
        boleta={boletaModal}
      />

      <AppFooter />
    </>
  );
};

export default Perfil;

 
  