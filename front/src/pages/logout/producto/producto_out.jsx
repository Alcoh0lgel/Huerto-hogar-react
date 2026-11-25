import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavigationBar from '../../../components/navbar/navbarout';
import { CartContext } from '../../../context/cartContext';
import Footer from '../../../components/footer/footer';
import styles from './producto_out.module.css';
import { obtenerProductos } from '../../../api/productoApi';

const CATEGORIAS = [
  { id: 'TODAS', nombre: 'Todos' },
  { id: '1', nombre: 'Frutas Frescas' },
  { id: '2', nombre: 'Productos Lácteos' },
  { id: '3', nombre: 'Verduras Orgánicas' },
  { id: '4', nombre: 'Productos Orgánicos' },
];

function Producto() {
  const { agregarAlCarrito } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);

  const categoriaActiva = searchParams.get('categoria') || 'TODAS';

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((err) => console.error('Error:', err));
  }, []);

  const productosFiltrados =
    categoriaActiva === 'TODAS'
      ? productos
      : productos.filter((p) => String(p.categoria?.idCategoria) === categoriaActiva);

  return (
    <>
      <NavigationBar />

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
                    src="/img/verduras.jpg"
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
            {productosFiltrados.map((item) => (
              <div key={item.idProducto || item.id} className="col-12 col-md-6 col-lg-4">
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
                          <p className={styles.descripcionProducto}>{item.descripcion}</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={styles.btnCarrito}
                            onClick={() => agregarAlCarrito(item)}
                          >
                            Añadir al Carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Producto;