import React, { useContext, useState } from 'react';
import { Offcanvas, Button, Card, Row, Col, Form, Modal } from 'react-bootstrap';
import { CartContext } from '../../context/cartContext';

function Carrito() {
  const {
    carrito,
    eliminarProductoCarrito,
    vaciarCarrito,
    showCarrito,
    handleCloseCarrito,
  } = useContext(CartContext);

  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState('');

  // Estados para la Pasarela de Pago
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombreTarhabiente: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: '',
  });

  // Cálculo del Total
  const subtotal = carrito.reduce((acc, item) => acc + item.precio, 0);
  const total = Math.max(0, subtotal - descuento);

  // Lógica del Cupón
  const aplicarCupon = () => {
    if (cupon.trim().toUpperCase() === 'HUERTOHOGAR10') {
      const desc = subtotal * 0.1; // 10% de descuento
      setDescuento(desc);
      setMensajeCupon('¡Cupón del 10% aplicado!');
    } else {
      setMensajeCupon('Cupón inválido');
    }
  };

  // Manejo de la Pasarela de Pago
  const handleAbrirPago = () => {
    handleCloseCarrito();
    setShowPagoModal(true);
  };

  const handleProcesarPago = (e) => {
    e.preventDefault();
    setPagoExitoso(true);
    setTimeout(() => {
      vaciarCarrito();
      setPagoExitoso(false);
      setShowPagoModal(false);
      setDescuento(0);
      setCupon('');
      setMensajeCupon('');
    }, 2500);
  };

  return (
    <>
      {/* Offcanvas del Carrito */}
      <Offcanvas show={showCarrito} onHide={handleCloseCarrito} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras 🛒</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          
          <div className="flex-grow-1 overflow-auto mb-3">
            {carrito.length === 0 ? (
              <p className="text-center fs-5 mt-4 text-muted">Tu carrito está vacío</p>
            ) : (
              carrito.map((item, index) => (
                <Card key={index} className="mb-3 w-100 shadow-sm">
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
                      <Col xs={6}>
                        <h6 className="mb-1 fw-bold">{item.nombre}</h6>
                        <span className="text-success fw-bold">${item.precio}</span>
                      </Col>
                      <Col xs={3} className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => eliminarProductoCarrito(index)}
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>

          {/* Sección de Cupón y Total */}
          {carrito.length > 0 && (
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
                {mensajeCupon && (
                  <small className="d-block mt-1 text-center text-info">
                    {mensajeCupon}
                  </small>
                )}
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

      {/* Modal Simulación Pasarela de Pago */}
      <Modal show={showPagoModal} onHide={() => setShowPagoModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pasarela de Pago 💳</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pagoExitoso ? (
            <div className="text-center py-4">
              <h3 className="text-success mb-3">¡Pago Exitoso! 🎉</h3>
              <p>Tu pedido ha sido procesado correctamente.</p>
              <p className="text-muted small">Gracias por comprar en Huerto Hogar 🌱</p>
            </div>
          ) : (
            <Form onSubmit={handleProcesarPago}>
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
                  placeholder="1234 5678 9012 3456"
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

              <Button type="submit" variant="success" className="w-100 mt-2 py-2 fw-bold">
                Pagar ${total}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Carrito;