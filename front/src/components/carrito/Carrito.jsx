import React, { useContext, useState } from 'react';
import { Offcanvas, Button, Card, Row, Col, Form, Modal, ButtonGroup } from 'react-bootstrap';
import { CartContext } from '../../context/cartContext';
import App_alert from '../alerts/alertas';
import { getPerfilUsuario } from '../../api/usuarioApi';
import { crearBoleta, crearDetalleBoleta } from '../../api/boletaApi';
import { obtenerProductos } from '../../api/productoApi';
import { getToken } from '../../auth/auth';

function Carrito() {
  const {
    carrito,
    agregarAlCarrito,
    disminuirUnidadCarrito,
    eliminarTodosDelProducto,
    vaciarCarrito,
    showCarrito,
    handleCloseCarrito,
  } = useContext(CartContext);

  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [procesando, setProcesando] = useState(false);

  // Estado de alertas
  const [alerta, setAlerta] = useState({
    mostrar: false,
    variant: 'success',
    msg: '',
  });

  const cerrarAlert = () => setAlerta((prev) => ({ ...prev, mostrar: false }));

  const mostrarAlerta = (variant, msg) => {
    setAlerta({ mostrar: true, variant, msg });
    setTimeout(() => {
      setAlerta((prev) => ({ ...prev, mostrar: false }));
    }, 3500);
  };

  // Estados para la Pasarela de Pago
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombreTarhabiente: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: '',
  });

  // Agrupar productos iguales para mostrar cantidad y botones + / -
  const itemsAgrupados = Object.values(
    carrito.reduce((acc, item, index) => {
      const prodId = item.id_producto || item.idProducto || item.id || `idx-${index}`;
      if (!acc[prodId]) {
        acc[prodId] = {
          idProducto: item.id_producto || item.idProducto || item.id,
          clave: prodId,
          nombre: item.nombre,
          precio: Number(item.precio) || 0,
          imagen: item.imagen,
          stock: item.stock !== undefined ? Number(item.stock) : Infinity,
          cantidad: 0,
          indices: [],
        };
      }
      acc[prodId].cantidad += 1;
      acc[prodId].indices.push(index);
      return acc;
    }, {})
  );

  // Aumentar cantidad (+1)
  const handleAumentarCantidad = (grupo) => {
    if (Number.isFinite(grupo.stock) && grupo.cantidad + 1 > grupo.stock) {
      mostrarAlerta(
        'warning',
        `Stock insuficiente: solo hay ${grupo.stock} unidades de "${grupo.nombre}".`
      );
      return;
    }

    const originalItem = carrito[grupo.indices[0]] || {
      id_producto: grupo.idProducto,
      nombre: grupo.nombre,
      precio: grupo.precio,
      imagen: grupo.imagen,
      stock: grupo.stock,
    };
    agregarAlCarrito(originalItem);
  };

  // Disminuir cantidad (-1)
  const handleDisminuirCantidad = (grupo) => {
    const ultimoIndice = grupo.indices[grupo.indices.length - 1];
    if (ultimoIndice !== undefined) {
      disminuirUnidadCarrito(ultimoIndice);
      if (grupo.cantidad === 1) {
        mostrarAlerta('info', `"${grupo.nombre}" eliminado del carrito.`);
      }
    }
  };

  // Eliminar TODAS las unidades del producto
  const handleEliminarTodo = (grupo) => {
    const eliminado = eliminarTodosDelProducto(grupo.idProducto, grupo.nombre);
    if (eliminado) {
      mostrarAlerta('info', `Se eliminaron todas las unidades de "${grupo.nombre}".`);
    }
  };

  // Cálculo del Total
  const subtotal = itemsAgrupados.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const total = Math.max(0, subtotal - descuento);

  // Validar stock contra el servidor antes de pagar
  const verificarStockCarrito = async () => {
    const agrupados = {};

    carrito.forEach((item) => {
      const prodId = item.id_producto || item.idProducto || item.id;
      if (!prodId) return;

      if (!agrupados[prodId]) {
        agrupados[prodId] = {
          idProducto: Number(prodId),
          nombre: item.nombre || 'Producto',
          cantidadSolicitada: 0,
          stockItem: Number(item.stock ?? Infinity),
          precioUnitario: item.precio,
        };
      }
      agrupados[prodId].cantidadSolicitada += 1;
    });

    let productosBackend = [];
    try {
      const data = await obtenerProductos();
      if (Array.isArray(data)) {
        productosBackend = data;
      }
    } catch (err) {
      console.warn('No se pudo refrescar stock desde backend, se usa stock del ítem:', err);
    }

    for (const prodId of Object.keys(agrupados)) {
      const entry = agrupados[prodId];
      const prodMatch = productosBackend.find(
        (p) => Number(p.id || p.idProducto || p.id_producto) === entry.idProducto
      );

      const stockDisponible = prodMatch
        ? Number(prodMatch.stock ?? 0)
        : entry.stockItem;

      if (stockDisponible <= 0) {
        return {
          ok: false,
          mensaje: `Stock insuficiente para "${entry.nombre}" (sin stock disponible).`,
          agrupados,
        };
      }

      if (entry.cantidadSolicitada > stockDisponible) {
        return {
          ok: false,
          mensaje: `Stock insuficiente para "${entry.nombre}": pediste ${entry.cantidadSolicitada} y solo hay ${stockDisponible} disponibles.`,
          agrupados,
        };
      }
    }

    return { ok: true, agrupados };
  };

  // Lógica del Cupón
  const aplicarCupon = () => {
    if (cupon.trim() === '') {
      mostrarAlerta('warning', 'Escribe un cupón antes de aplicar.');
      return;
    }

    if (cupon.trim().toUpperCase() === 'HUERTOHOGAR10') {
      const desc = subtotal * 0.1;
      setDescuento(desc);
      mostrarAlerta('success', '¡Cupón del 10% aplicado! 🌿');
    } else {
      mostrarAlerta('danger', 'Cupón inválido.');
    }
  };

  // Manejo de la Pasarela de Pago
  const handleAbrirPago = async () => {
    const token = getToken();
    if (!token) {
      mostrarAlerta('warning', 'Debes iniciar sesión para completar tu compra. Redirigiendo...');
      setTimeout(() => {
        handleCloseCarrito();
        window.location.href = '/acceder';
      }, 1500);
      return;
    }

    const validacion = await verificarStockCarrito();
    if (!validacion.ok) {
      mostrarAlerta('danger', validacion.mensaje);
      return;
    }

    handleCloseCarrito();
    cerrarAlert();
    setShowPagoModal(true);
  };

  const handleProcesarPago = async (e) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(datosPago.numeroTarjeta)) {
      mostrarAlerta('danger', 'El número de tarjeta debe tener 16 dígitos.');
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(datosPago.expiracion)) {
      mostrarAlerta('danger', 'La fecha de expiración debe tener el formato MM/AA.');
      return;
    }

    if (!/^\d{3}$/.test(datosPago.cvv)) {
      mostrarAlerta('danger', 'El CVV debe tener 3 dígitos.');
      return;
    }

    try {
      setProcesando(true);
      cerrarAlert();

      const validacion = await verificarStockCarrito();
      if (!validacion.ok) {
        mostrarAlerta('danger', validacion.mensaje);
        setProcesando(false);
        return;
      }

      const usuario = await getPerfilUsuario();
      if (!usuario || !usuario.id_usuario) {
        mostrarAlerta('danger', 'Debes iniciar sesión para completar la compra.');
        setProcesando(false);
        return;
      }

      const fechaHoy = new Date().toLocaleDateString('es-CL');
      const nuevaBoleta = await crearBoleta({
        fechaEmision: fechaHoy,
        montoTotal: total,
        nombreEmisor: 'Huerto Hogar SpA',
        rutEmisor: '76.543.210-K',
        usuario: { id_usuario: usuario.id_usuario },
      });

      for (const prodId of Object.keys(validacion.agrupados)) {
        const det = validacion.agrupados[prodId];
        await crearDetalleBoleta({
          cantidad: det.cantidadSolicitada,
          precioUnitario: det.precioUnitario,
          subtotal: det.cantidadSolicitada * det.precioUnitario,
          boleta: { idBoleta: nuevaBoleta.idBoleta },
          producto: { id_producto: det.idProducto },
        });
      }

      setPagoExitoso(true);
      setTimeout(() => {
        vaciarCarrito();
        setPagoExitoso(false);
        setShowPagoModal(false);
        setDescuento(0);
        setCupon('');
        setDatosPago({
          nombreTarhabiente: '',
          numeroTarjeta: '',
          expiracion: '',
          cvv: '',
        });
      }, 2500);
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      const detalleError = error?.response?.data?.message || error?.message || '';
      if (detalleError.toLowerCase().includes('stock')) {
        mostrarAlerta('danger', detalleError);
      } else {
        mostrarAlerta('danger', 'Ocurrió un error al generar tu boleta en el servidor.');
      }
    } finally {
      setProcesando(false);
    }
  };

  return (
    <>
      <Offcanvas show={showCarrito} onHide={handleCloseCarrito} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras 🛒</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <App_alert
            mostrarAlert={alerta.mostrar}
            cerrarAlert={cerrarAlert}
            variant={alerta.variant}
            msgAlert={alerta.msg}
          />

          <div className="flex-grow-1 overflow-auto mb-3">
            {itemsAgrupados.length === 0 ? (
              <p className="text-center fs-5 mt-4 text-muted">Tu carrito está vacío</p>
            ) : (
              itemsAgrupados.map((item) => (
                <Card key={item.clave} className="mb-3 w-100 shadow-sm">
                  <Card.Body className="p-2">
                    <Row className="align-items-center g-2">
                      <Col xs={3} className="text-center">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="img-fluid rounded"
                          style={{ maxHeight: '60px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col xs={5}>
                        <h6 className="mb-1 fw-bold">{item.nombre}</h6>
                        <span className="text-success fw-bold d-block">
                          ${item.precio * item.cantidad}
                        </span>
                        <small className="text-muted">${item.precio} c/u</small>
                      </Col>
                      <Col xs={4} className="text-end">
                        <ButtonGroup size="sm" className="mb-1">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleDisminuirCantidad(item)}
                            title="Disminuir cantidad"
                          >
                            -
                          </Button>
                          <Button variant="light" disabled className="fw-bold px-2">
                            {item.cantidad}
                          </Button>
                          <Button
                            variant="outline-success"
                            onClick={() => handleAumentarCantidad(item)}
                            title="Aumentar cantidad"
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        <div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleEliminarTodo(item)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>

          {itemsAgrupados.length > 0 && (
            <div className="border-top pt-3 mt-auto">
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted mb-1 d-block text-center">
                  ¿Tienes un cupón?
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="Ej: HUERTOHOGAR10"
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)}
                    className="text-uppercase"
                  />
                  <Button variant="outline-success" size="sm" onClick={aplicarCupon}>
                    Aplicar
                  </Button>
                </div>
              </Form.Group>

              <div className="text-center mb-3">
                {descuento > 0 && (
                  <p className="text-muted mb-1 text-decoration-line-through">
                    Subtotal: ${subtotal}
                  </p>
                )}
                <h4 className="fw-bold">Total: ${total}</h4>
              </div>

              <Button
                variant="success"
                className="w-100 py-2 fw-bold"
                onClick={handleAbrirPago}
              >
                Proceder al Pago
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showPagoModal} onHide={() => setShowPagoModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pasarela de Pago 💳</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pagoExitoso ? (
            <div className="text-center py-4">
              <h3 className="text-success mb-3">¡Pago Exitoso! 🎉</h3>
              <p>Tu pedido ha sido procesado y tu boleta fue emitida.</p>
              <p className="text-muted small">Puedes revisarla en tu Perfil → Mis Boletas 🌱</p>
            </div>
          ) : (
            <Form onSubmit={handleProcesarPago}>
              <App_alert
                mostrarAlert={alerta.mostrar}
                cerrarAlert={cerrarAlert}
                variant={alerta.variant}
                msgAlert={alerta.msg}
              />

              <div className="mb-3 text-center">
                <span className="fs-5 fw-bold text-success">Total a pagar: ${total}</span>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Nombre en la tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  required
                  value={datosPago.nombreTarhabiente}
                  onChange={(e) =>
                    setDatosPago({ ...datosPago, nombreTarhabiente: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Número de tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1234567890123456"
                  maxLength="16"
                  required
                  value={datosPago.numeroTarjeta}
                  onChange={(e) =>
                    setDatosPago({ ...datosPago, numeroTarjeta: e.target.value })
                  }
                />
              </Form.Group>

              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expira (MM/AA)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="12/28"
                      maxLength="5"
                      required
                      value={datosPago.expiracion}
                      onChange={(e) =>
                        setDatosPago({ ...datosPago, expiracion: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="123"
                      maxLength="3"
                      required
                      value={datosPago.cvv}
                      onChange={(e) =>
                        setDatosPago({ ...datosPago, cvv: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                variant="success"
                className="w-100 mt-2 py-2 fw-bold"
                disabled={procesando}
              >
                {procesando ? 'Procesando compra...' : `Pagar $${total}`}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Carrito;