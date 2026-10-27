import React from 'react';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import styles from './reportes.module.css';

const resumenVentasData = {
    totalVentas: 35900,
    totalBoletas: 5,
    promedioVenta: 7180,
    productosMasVendidos: [
        { nombre: "Naranjas Valencia", cantidadVendida: 9, ingresosTotales: 9000 },
        { nombre: "Manzana Fuji", cantidadVendida: 5, ingresosTotales: 6000 },
        { nombre: "Pimientos Tricolores", cantidadVendida: 5, ingresosTotales: 7500 },
        { nombre: "Plátanos Cavendish", cantidadVendida: 7, ingresosTotales: 5600 },
        { nombre: "Zanahorias Orgánicas", cantidadVendida: 4, ingresosTotales: 3600 },
        { nombre: "Espinacas Frescas", cantidadVendida: 6, ingresosTotales: 4200 }
    ]
};

export default function ReportesAdmin() {
    return (
        <div className={styles.adminLayout}>
            <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
                {/* Sidebar con la pestaña activa en 'reportes' o adaptado según prefieras */}
                <AdminSidebar vistaActiva="reportes" />

                <main className={styles.mainContent}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.mainTitle}>📊 Reporte y Estadísticas de Ventas</h2>
                        <button className="btn btn-outline-dark btn-sm" onClick={() => window.print()}>
                            🖨️ Exportar Reporte
                        </button>
                    </div>

                    {/* Tarjetas de Métricas Principales */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <div className={styles.cardMetric}>
                                <span className={styles.cardMetricTitle}>Ventas Totales del Periodo</span>
                                <p className={`text-success ${styles.cardMetricValue}`}>
                                    ${resumenVentasData.totalVentas.toLocaleString("cl-CL")}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.cardMetric}>
                                <span className={styles.cardMetricTitle}>Total de Boletas Emitidas</span>
                                <p className={styles.cardMetricValue}>
                                    {resumenVentasData.totalBoletas} Transacciones
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.cardMetric}>
                                <span className={styles.cardMetricTitle}>Ticket Promedio por Compra</span>
                                <p className={styles.cardMetricValue}>
                                    ${resumenVentasData.promedioVenta.toLocaleString("cl-CL")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Rendimiento por Producto */}
                    <div className="mt-4">
                        <h4 className={`mb-3 ${styles.mainTitle}`} style={{ fontSize: '1.2rem' }}>
                            📦 Rendimiento de Ventas por Producto
                        </h4>
                        <div className="table-responsive">
                            <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                                <thead className="table-dark">
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Unidades Vendidas</th>
                                        <th className="text-end">Ingresos Totales ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resumenVentasData.productosMasVendidos.map((prod, index) => (
                                        <tr key={index}>
                                            <td className="fw-bold">{prod.nombre}</td>
                                            <td className="text-center">
                                                <span className="badge bg-primary">
                                                    {prod.cantidadVendida} un.
                                                </span>
                                            </td>
                                            <td className="text-end fw-bold text-success">
                                                ${prod.ingresosTotales.toLocaleString("cl-CL")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}