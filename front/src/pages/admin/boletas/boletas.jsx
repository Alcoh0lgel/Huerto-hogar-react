import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import ModalBoletas from '../../../components/modal/modalboletas';
import styles from './boletas.module.css';
import { getTodasLasBoletas, getDetallesBoleta } from '../../../api/boletaApi';

export default function BoletasAdmin() {
    const [boletas, setBoletas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);
    const [cargandoDetalle, setCargandoDetalle] = useState(false);

    useEffect(() => {
        const cargarBoletas = async () => {
            try {
                setCargando(true);
                setError(null);
                const data = await getTodasLasBoletas();
                setBoletas(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error al cargar boletas en admin:', err);
                setError('No se pudieron cargar las boletas desde el servidor.');
            } finally {
                setCargando(false);
            }
        };

        cargarBoletas();
    }, []);

    const handleVerDetalle = async (boleta) => {
        try {
            setCargandoDetalle(true);
            const detalles = await getDetallesBoleta(boleta.idBoleta);

            const itemsFormateados = (detalles || []).map((det, index) => ({
                id: det.idDetalleBoleta || det.id_detalle_boleta || index,
                nombre: det.producto?.nombre || det.producto?.nombreProducto || 'Producto Huerto Hogar',
                cantidad: det.cantidad,
                precioUnitario: det.precioUnitario || det.producto?.precio || 0
            }));

            setBoletaSeleccionada({
                idBoleta: `HH-${boleta.idBoleta}`,
                fecha: boleta.fechaEmision,
                montoTotal: boleta.montoTotal,
                cliente: {
                    nombre: `${boleta.usuario?.nombre || ''} ${boleta.usuario?.apellido || ''}`.trim() || 'Cliente Registrado',
                    rut: boleta.usuario?.run || 'Sin RUN',
                    direccion: boleta.usuario?.direccion || 'Sin dirección registrada',
                    telefono: boleta.usuario?.telefono || 'Sin teléfono',
                    metodoPago: 'Webpay / Transferencia'
                },
                items: itemsFormateados
            });
        } catch (err) {
            console.error('Error al obtener el detalle de la boleta:', err);
            alert('No se pudo cargar el detalle de los productos de esta boleta.');
        } finally {
            setCargandoDetalle(false);
        }
    };

    return (
        <div className={styles.adminLayout}>
            <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
                <AdminSidebar vistaActiva="boletas" />

                <main className={styles.mainContent}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.mainTitle}>🧾 Historial de Boletas de Compra</h2>
                    </div>

                    {cargando ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-success" role="status"></div>
                            <p className="mt-2 text-muted">Cargando boletas desde la base de datos...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    ) : boletas.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                            Aún no hay boletas registradas en el sistema.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                                <thead className="table-dark">
                                    <tr>
                                        <th>N° Boleta</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Dirección de Envío</th>
                                        <th>Monto Total</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boletas.map((boleta) => (
                                        <tr key={boleta.idBoleta}>
                                            <td className="fw-bold">HH-{boleta.idBoleta}</td>
                                            <td>{boleta.fechaEmision}</td>
                                            <td>
                                                {`${boleta.usuario?.nombre || ''} ${boleta.usuario?.apellido || ''}`.trim() || 'Usuario'}
                                            </td>
                                            <td>{boleta.usuario?.direccion || 'Sin dirección'}</td>
                                            <td className="fw-bold text-success">
                                                ${(boleta.montoTotal || 0).toLocaleString("es-CL")}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleVerDetalle(boleta)}
                                                    disabled={cargandoDetalle}
                                                >
                                                    👁️ Ver Detalle
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            <ModalBoletas 
                show={Boolean(boletaSeleccionada)}
                onClose={() => setBoletaSeleccionada(null)}
                boleta={boletaSeleccionada}
            />
        </div>
    );
}