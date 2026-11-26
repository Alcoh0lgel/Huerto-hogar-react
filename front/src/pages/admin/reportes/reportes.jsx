import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/sidebar/sidebaradmin";
import styles from "./reportes.module.css";
import {
  getTodasLasBoletas,
  getTodosLosDetallesBoleta,
} from "../../../api/boletaApi";

export default function ReportesAdmin() {
  const [boletas, setBoletas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatosReporte = async () => {
      try {
        setCargando(true);
        setError("");

        const [listaBoletas, listaDetalles] = await Promise.all([
          getTodasLasBoletas(),
          getTodosLosDetallesBoleta(),
        ]);

        setBoletas(Array.isArray(listaBoletas) ? listaBoletas : []);
        setDetalles(Array.isArray(listaDetalles) ? listaDetalles : []);
      } catch (err) {
        console.error("Error al cargar reportes:", err);
        setError("No se pudieron cargar los datos de ventas desde el servidor.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatosReporte();
  }, []);

  // Métricas generales
  const totalBoletas = boletas.length;

  const totalVentas = boletas.reduce((acc, b) => {
    const monto = Number(b.montoTotal ?? b.monto_total ?? 0);
    return acc + (Number.isNaN(monto) ? 0 : monto);
  }, 0);

  const promedioVenta = totalBoletas > 0 ? Math.round(totalVentas / totalBoletas) : 0;

  // Agrupación de productos comprados a partir de los detalles
  const mapaProductos = {};

  detalles.forEach((det) => {
    const prod = det.producto || {};
    const idProd =
      prod.id_producto ||
      prod.idProducto ||
      prod.id ||
      det.id_producto ||
      det.idProducto ||
      prod.nombre ||
      "sin-id";

    const nombreProd = prod.nombre || det.nombreProducto || `Producto #${idProd}`;
    const cantidad = Number(det.cantidad ?? 0) || 0;
    const precioUnit =
      Number(det.precioUnitario ?? det.precio_unitario ?? prod.precio ?? 0) || 0;
    const subtotal =
      det.subtotal !== undefined && det.subtotal !== null
        ? Number(det.subtotal) || 0
        : cantidad * precioUnit;

    if (!mapaProductos[idProd]) {
      mapaProductos[idProd] = {
        id: idProd,
        nombre: nombreProd,
        cantidadVendida: 0,
        ingresosTotales: 0,
      };
    }

    mapaProductos[idProd].cantidadVendida += cantidad;
    mapaProductos[idProd].ingresosTotales += subtotal;
  });

  const productosMasVendidos = Object.values(mapaProductos).sort(
    (a, b) => b.cantidadVendida - a.cantidadVendida
  );

  const totalUnidadesVendidas = productosMasVendidos.reduce(
    (acc, p) => acc + p.cantidadVendida,
    0
  );

  return (
    <div className={styles.adminLayout}>
      <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
        <AdminSidebar vistaActiva="reportes" />

        <main className={styles.mainContent}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className={styles.mainTitle}>📊 Reporte y Estadísticas de Ventas</h2>
            <button className="btn btn-outline-dark btn-sm" onClick={() => window.print()}>
              🖨️ Exportar Reporte
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {cargando ? (
            <p className="text-muted">Cargando estadísticas de ventas...</p>
          ) : (
            <>
              {/* Tarjetas de Métricas Principales */}
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className={styles.cardMetric}>
                    <span className={styles.cardMetricTitle}>Ganancias / Ventas Totales</span>
                    <p className={`text-success ${styles.cardMetricValue}`}>
                      ${totalVentas.toLocaleString("cl-CL")}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={styles.cardMetric}>
                    <span className={styles.cardMetricTitle}>Total de Boletas Emitidas</span>
                    <p className={styles.cardMetricValue}>
                      {totalBoletas} {totalBoletas === 1 ? "Boleta" : "Boletas"}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={styles.cardMetric}>
                    <span className={styles.cardMetricTitle}>Unidades Vendidas</span>
                    <p className={styles.cardMetricValue}>{totalUnidadesVendidas} un.</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={styles.cardMetric}>
                    <span className={styles.cardMetricTitle}>Ticket Promedio</span>
                    <p className={styles.cardMetricValue}>
                      ${promedioVenta.toLocaleString("cl-CL")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabla de Rendimiento por Producto */}
              <div className="mt-4">
                <h4 className={`mb-3 ${styles.mainTitle}`} style={{ fontSize: "1.2rem" }}>
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
                      {productosMasVendidos.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-4">
                            Aún no hay ventas registradas para mostrar.
                          </td>
                        </tr>
                      ) : (
                        productosMasVendidos.map((prod) => (
                          <tr key={prod.id}>
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}