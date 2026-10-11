import React, { useState } from 'react';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import ModalBoletas from '../../../components/modal/modalboletas'; // Ajusta la ruta según tu estructura
import styles from './boletas.module.css';

const boletasPredefinidas = [
    {
        idBoleta: "BOL-2026-001",
        fecha: "10/10/2026 14:30",
        cliente: {
            nombre: "Juan Pérez González",
            rut: "15.432.876-5",
            direccion: "Av. Providencia 1234, Apto 502, Santiago",
            telefono: "+56 9 8765 4321",
            metodoPago: "Tarjeta de Crédito (Webpay)"
        },
        items: [
            { id: 1, nombre: "Manzana Fuji", cantidad: 3, precioUnitario: 1200 },
            { id: 3, nombre: "Plátanos Cavendish", cantidad: 2, precioUnitario: 800 },
            { id: 4, nombre: "Zanahorias Orgánicas", cantidad: 1, precioUnitario: 900 }
        ],
        montoTotal: 6100
    },
    {
        idBoleta: "BOL-2026-002",
        fecha: "10/10/2026 15:45",
        cliente: {
            nombre: "María Francisca Silva",
            rut: "18.123.456-7",
            direccion: "Calle Las Condes 8910, Las Condes, Santiago",
            telefono: "+56 9 9123 4567",
            metodoPago: "Transferencia Bancaria Directa"
        },
        items: [
            { id: 2, nombre: "Naranjas Valencia", cantidad: 5, precioUnitario: 1000 },
            { id: 6, nombre: "Pimientos Tricolores", cantidad: 2, precioUnitario: 1500 }
        ],
        montoTotal: 8000
    },
    {
        idBoleta: "BOL-2026-003",
        fecha: "10/10/2026 17:10",
        cliente: {
            nombre: "Carlos Alberto Rojas",
            rut: "12.987.654-3",
            direccion: "Pasaje Los Aromos 432, Maipú, Santiago",
            telefono: "+56 9 7654 3210",
            metodoPago: "Débito (Redcompra)"
        },
        items: [
            { id: 5, nombre: "Espinacas Frescas", cantidad: 4, precioUnitario: 700 },
            { id: 1, nombre: "Manzana Fuji", cantidad: 2, precioUnitario: 1200 },
            { id: 4, nombre: "Zanahorias Orgánicas", cantidad: 3, precioUnitario: 900 }
        ],
        montoTotal: 7900
    },
    {
        idBoleta: "BOL-2026-004",
        fecha: "10/10/2026 18:20",
        cliente: {
            nombre: "Ana María Morales",
            rut: "16.555.444-2",
            direccion: "Av. Vitacura 5400, Vitacura, Santiago",
            telefono: "+56 9 5555 4444",
            metodoPago: "Mercado Pago"
        },
        items: [
            { id: 6, nombre: "Pimientos Tricolores", cantidad: 3, precioUnitario: 1500 },
            { id: 2, nombre: "Naranjas Valencia", cantidad: 4, precioUnitario: 1000 }
        ],
        montoTotal: 8500
    },
    {
        idBoleta: "BOL-2026-005",
        fecha: "10/10/2026 19:05",
        cliente: {
            nombre: "Diego Ignacio Fernández",
            rut: "19.876.543-1",
            direccion: "Av. Italia 1120, Ñuñoa, Santiago",
            telefono: "+56 9 3333 2222",
            metodoPago: "Efectivo contra entrega"
        },
        items: [
            { id: 3, nombre: "Plátanos Cavendish", cantidad: 5, precioUnitario: 800 },
            { id: 5, nombre: "Espinacas Frescas", cantidad: 2, precioUnitario: 700 }
        ],
        montoTotal: 5400
    }
];

export default function BoletasAdmin() {
    const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

    return (
        <div className={styles.adminLayout}>
            <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
                <AdminSidebar vistaActiva="boletas" />

                <main className={styles.mainContent}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.mainTitle}>🧾 Historial de Boletas de Compra</h2>
                    </div>

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
                                {boletasPredefinidas.map((boleta) => (
                                    <tr key={boleta.idBoleta}>
                                        <td className="fw-bold">{boleta.idBoleta}</td>
                                        <td>{boleta.fecha}</td>
                                        <td>{boleta.cliente.nombre}</td>
                                        <td>{boleta.cliente.direccion}</td>
                                        <td className="fw-bold text-success">
                                            ${boleta.montoTotal.toLocaleString("cl-CL")}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setBoletaSeleccionada(boleta)}
                                            >
                                                👁️ Ver Detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Llamado al componente Modal independiente */}
            <ModalBoletas 
                show={Boolean(boletaSeleccionada)}
                onClose={() => setBoletaSeleccionada(null)}
                boleta={boletaSeleccionada}
            />
        </div>
    );
}