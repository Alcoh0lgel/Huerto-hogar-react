import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavigationBarIn from '../../../components/navbar/navbarIn';
import { CartContext } from '../../../context/cartContext';
import styles from './producto_in.module.css';
import AppFooter from '../../../components/footer/footer';
import { obtenerProductos } from '../../../api/productoApi';

const CATEGORIAS = [
  { id: 'TODAS', nombre: 'Todos' },
  { id: '1', nombre: 'Frutas Frescas' },
  { id: '2', nombre: 'Productos Lácteos' },
  { id: '3', nombre: 'Verduras Orgánicas' },
  { id: '4', nombre: 'Frutos Secos' },
];

function Producto() {
  const { carrito, agregarAlCarrito } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [alertaStock, setAlertaStock] = useState('');
  const [cantidades, setCantidades] = useState({});

  const categoriaActiva = searchParams.get('categoria') || 'TODAS';

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((err) => console.error('Error:', err));
  }, []);

  const obtenerIdProducto = (prod) => prod?.id_producto || prod?.idProducto || prod?.id;

  const contarEnCarrito = (idProd) =>
    carrito.filter((item) => Number(obtenerIdProducto(item)) === Number(idProd)).length;

  const getValorInput = (idProd) => {
    if (cantidades[idProd] !== undefined) return cantidades[idProd];
    return 1;
  };

  const getCantidadNumerica = (idProd, maxDisponible) => {
    const raw = getValorInput(idProd);
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed < 1) return 1;
    if (maxDisponible > 0) return Math.min(parsed, maxDisponible);
    return parsed;
  };

  const cambiarCantidadBotones = (idProd, nuevaCantidad, maxDisponible) => {
    if (maxDisponible <= 0) return;
    const valorAjustado = Math.max(1, Math.min(nuevaCantidad, maxDisponible));
    setCantidades((prev) => ({
      ...prev,
      [idProd]: valorAjustado,
    }));
  };

  const handleInputTeclado = (idProd, valor) => {
    // Permite vacío temporalmente mientras el usuario escribe o borra con el teclado
    if (valor === '') {
      setCantidades((prev) => ({ ...prev, [idProd]: '' }));
      return;
    }

    // Solo dígitos enteros positivos
    if (/^\d+$/.test(valor)) {
      setCantidades((prev) => ({ ...prev, [idProd]: valor }));
    }
  };

  const normalizarAlSalir = (idProd, maxDisponible) => {
    if (maxDisponible <= 0) return;
    const normalizada = getCantidadNumerica(idProd, maxDisponible);
    setCantidades((prev) => ({ ...prev, [idProd]: normalizada }));
  };

  const handleAgregar = (item) => {
    const idProd = obtenerIdProducto(item);
    const stockDisp = Number(item.stock ?? 0);
    const enCarrito = contarEnCarrito(idProd);
    const restante = Math.max(0, stockDisp - enCarrito);
    const cantidadAAgregar = getCantidadNumerica(idProd, restante);

    if (stockDisp <= 0) {
      setAlertaStock(`No hay stock disponible para "${item.nombre}".`);
      return;
    }

    if (restante <= 0 || enCarrito + cantidadAAgregar > stockDisp) {
      setAlertaStock(
        `Stock insuficiente para "${item.nombre}": ya tienes ${enCarrito} en el carrito, intentas agregar ${cantidadAAgregar} y solo hay ${stockDisp} disponibles.`
      );
      return;
    }

    setAlertaStock('');
    for (let i = 0; i < cantidadAAgregar; i++) {
      agregarAlCarrito(item);
    }

    setCantidades((prev) => ({ ...prev, [idProd]: 1 }));
  };

  const productosFiltrados =
    categoriaActiva === 'TODAS'
      ? productos
      : productos.filter((p) => String(p.categoria?.idCategoria) === categoriaActiva);

  return (
    <>
      <NavigationBarIn />

      <main className={styles.contenidoPrincipal}>
        {/* Sección de Presentación Escalonada */}
        <section className="container my-3 mt-3">
          <div className={styles.contenedorPresentacion}>
            {/* Tarjeta Izquierda */}
            <div className={`${styles.tarjetaPresentacion} ${styles.tarjetaIzquierda}`}>
              <div className="row align-items-center g-3">
                <div className="col-12 col-md-4 text-center">
                  <img
                    src="/img/verduras.jpg"
                    className={styles.imagenPresentacion}
                    alt="Frescura Real"
                  />
                </div>
                <div className="col-12 col-md-8">
                  <h3 className={styles.tituloPresentacion}>
                    Frescura Real: Del Campo a tu Mesa
                  </h3>
                  <p className={styles.textoPresentacion}>
                    En Huerto Hogar seleccionamos verduras de la más alta calidad, cosechadas en su punto óptimo de
                    maduración. Sin largos períodos de almacenamiento ni intermediarios, garantizamos el sabor crujiente
                    y los nutrientes intactos que solo la tierra chilena puede ofrecer.
                  </p>
                  <span className={styles.lema}>🌱 Del campo al hogar 🏠</span>
                </div>
              </div>
            </div>

            {/* Tarjeta Derecha */}
            <div className={`${styles.tarjetaPresentacion} ${styles.tarjetaDerecha}`}>
              <div className="row align-items-center g-3">
                <div className="col-12 col-md-4 text-center">
                  <img
                    src="/img/verduras2.jpg"
                    className={styles.imagenPresentacion}
                    alt="Tu Cosecha del Día"
                  />
                </div>
                <div className="col-12 col-md-8">
                  <h3 className={styles.tituloPresentacion}>
                    Tu Cosecha del Día a un Clic
                  </h3>
                  <p className={styles.textoPresentacion}>
                    Llevar alimentos saludables a tu cocina nunca fue tan sencillo. Contamos con una selección fresca de
                    temporada lista para acompañar tus comidas de la semana. Explora nuestro catálogo a continuación,
                    elige tus productos favoritos y recibe el campo en la puerta de tu hogar.
                  </p>
                  <span className={styles.lema}>🌱 Del campo al hogar 🏠</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listado de Productos */}
        <section id="productosVenta" className="container my-4">
          <h2 className={styles.tituloSeccion}>Nuestros Productos</h2>

          {alertaStock && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {alertaStock}
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={() => setAlertaStock('')}
              />
            </div>
          )}

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`btn btn-sm ${categoriaActiva === cat.id ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setSearchParams(cat.id === 'TODAS' ? {} : { categoria: cat.id })}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {productosFiltrados.map((item) => {
              const idProd = obtenerIdProducto(item);
              const stockDisp = Number(item.stock ?? 0);
              const enCarrito = contarEnCarrito(idProd);
              const restante = Math.max(0, stockDisp - enCarrito);
              const sinStock = stockDisp <= 0 || restante <= 0;
              const valorInput = sinStock ? 0 : getValorInput(idProd);
              const cantidadActual = getCantidadNumerica(idProd, restante);

              return (
                <div key={idProd} className="col-12 col-md-6 col-lg-4">
                  <div className={styles.cardProducto}>
                    <div className="row g-0 h-100">
                      <div className="col-4 p-2">
                        <img src={item.imagen} alt={item.nombre} className={styles.imagenProducto} />
                      </div>
                      <div className="col-8">
                        <div className={styles.detallesProducto}>
                          <div>
                            <span className="badge bg-light text-success border border-success mb-1">
                              {item.categoria?.nombreCategoria || 'Sin categoría'}
                            </span>
                            <h5 className={styles.tituloProducto}>{item.nombre}</h5>
                            <p className={styles.precioProducto}>$ {item.precio} x Kg</p>
                            <p className="small text-muted mb-1">
                              Stock disponible: <strong>{stockDisp}</strong>
                            </p>
                            <p className={styles.descripcionProducto}>{item.descripcion}</p>
                          </div>

                          <div className="d-flex align-items-stretch gap-2 mt-2">
                            <div className="input-group" style={{ width: '118px', flexShrink: 0 }}>
                              <button
                                type="button"
                                className="btn btn-outline-secondary px-2 fw-bold"
                                disabled={sinStock || cantidadActual <= 1}
                                onClick={() => cambiarCantidadBotones(idProd, cantidadActual - 1, restante)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                className="form-control bg-white text-center px-1 fw-bold"
                                value={valorInput}
                                disabled={sinStock}
                                onChange={(e) => handleInputTeclado(idProd, e.target.value)}
                                onBlur={() => normalizarAlSalir(idProd, restante)}
                              />
                              <button
                                type="button"
                                className="btn btn-outline-success px-2 fw-bold"
                                disabled={sinStock || cantidadActual >= restante}
                                onClick={() => cambiarCantidadBotones(idProd, cantidadActual + 1, restante)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              className={`${styles.btnCarrito} flex-grow-1 m-0`}
                              disabled={sinStock}
                              onClick={() => handleAgregar(item)}
                            >
                              {stockDisp <= 0
                                ? 'Sin Stock'
                                : sinStock
                                ? 'Máximo en carrito'
                                : 'Añadir'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}

export default Producto;