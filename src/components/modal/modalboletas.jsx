import React from 'react';

export default function ModalBoletas({ show, onClose, boleta }) {
    if (!show || !boleta) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">
                            🧾 Detalle de Boleta — {boleta.idBoleta}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body p-4">
                        {/* Encabezado de la Empresa */}
                        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                            <div>
                                <h4 className="fw-bold text-success mb-1">🌱 Huerto Hogar</h4>
                                <p className="small text-muted mb-0">Del campo a tu hogar</p>
                                <p className="small text-muted mb-0">RUT: 76.543.210-K</p>
                            </div>
                            <div className="text-end">
                                <h6 className="fw-bold m-0">{boleta.idBoleta}</h6>
                                <small className="text-muted">Fecha: {boleta.fecha}</small>
                            </div>
                        </div>

                        {/* Datos del Cliente */}
                        <div className="bg-light p-3 rounded mb-4 border">
                            <h6 className="fw-bold text-dark mb-2">👤 Datos del Cliente</h6>
                            <div className="row g-2 small">
                                <div className="col-sm-6">
                                    <strong>Nombre:</strong> {boleta.cliente.nombre}
                                </div>
                                <div className="col-sm-6">
                                    <strong>RUT:</strong> {boleta.cliente.rut}
                                </div>
                                <div className="col-sm-6">
                                    <strong>Dirección:</strong> {boleta.cliente.direccion}
                                </div>
                                <div className="col-sm-6">
                                    <strong>Teléfono:</strong> {boleta.cliente.telefono}
                                </div>
                                <div className="col-12">
                                    <strong>Método de Pago:</strong> {boleta.cliente.metodoPago}
                                </div>
                            </div>
                        </div>

                        {/* Tabla de Productos Comprados */}
                        <h6 className="fw-bold text-dark mb-2">📦 Productos Comprados</h6>
                        <div className="table-responsive mb-3">
                            <table className="table table-bordered align-middle small">
                                <thead className="table-secondary">
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-end">Precio Unit.</th>
                                        <th className="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boleta.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td className="text-center">{item.cantidad} un.</td>
                                            <td className="text-end">${item.precioUnitario.toLocaleString("cl-CL")}</td>
                                            <td className="text-end">${(item.cantidad * item.precioUnitario).toLocaleString("cl-CL")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Resumen Totales */}
                        <div className="d-flex justify-content-end">
                            <div className="card p-3 bg-light border" style={{ width: '280px' }}>
                                <div className="d-flex justify-content-between small mb-1">
                                    <span>Monto Neto:</span>
                                    <span>${Math.round(boleta.montoTotal / 1.19).toLocaleString("cl-CL")}</span>
                                </div>
                                <div className="d-flex justify-content-between small mb-1">
                                    <span>IVA (19%):</span>
                                    <span>${(boleta.montoTotal - Math.round(boleta.montoTotal / 1.19)).toLocaleString("cl-CL")}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex justify-content-between fw-bold text-success fs-5">
                                    <span>Total:</span>
                                    <span>${boleta.montoTotal.toLocaleString("cl-CL")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => window.print()}
                        >
                            🖨️ Imprimir Boleta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}