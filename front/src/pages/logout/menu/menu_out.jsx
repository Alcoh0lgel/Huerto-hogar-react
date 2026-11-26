import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../../components/navbar/navbarout';
import AppFooter from '../../../components/footer/footer';
import { obtenerProductos } from '../../../api/productoApi';
import styles from './menu_out.module.css';

export const Menu = () => {
  const navigate = useNavigate();
  const [productosEstrellas, setProductosEstrellas] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        const disponibles = data.filter((p) => p.stock > 0).slice(0, 6);
        setProductosEstrellas(disponibles);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleIrAProducto = () => {
    navigate('/producto');
  };

  return (
    <>
      <NavigationBar />

      <main className={styles.contenidoPrincipal}>
        {/* Portada de Presentación en 2 Columnas */}
        <section className="container mt-4 mb-4">
          <div className={styles.tarjetaPresentacion}>
            <div className="row g-0 align-items-stretch">
              
              {/* Mitad Izquierda: Imagen*/}
              <div className="col-12 col-lg-6">
                <img
                  src="/img/huertohogar2.jpg"
                  alt="Verduras Huerto Hogar"
                  className={styles.imagenPortada}
                />
              </div>

              {/* Mitad Derecha: Contenido */}
              <div className={`col-12 col-lg-6 ${styles.contenidoTarjeta}`}>
                <span className={styles.badgeLema}>
                  🌱 Del campo al hogar 🏠
                </span>

                <h2 className={styles.tituloSeccion}>
                  Tienda Huerto Hogar
                </h2>

                <p className={styles.textoPresentacion}>
                  HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los
                  productos del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de
                  experiencia, operamos en más de 9 puntos a lo largo del país —incluyendo Santiago, Viña del Mar,
                  Valparaíso, Concepción, Villarrica y Puerto Montt—, conectando a las familias chilenas con una
                  alimentación saludable y sostenible.
                </p>

                <div className={styles.pieTarjeta}>
                  <span>🌿 100% Fresco y Natural</span>
                  <span>📍 +9 Puntos en Chile</span>
                  <span>🚚 Directo a tu puerta</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Sección Productos Estrella */}
        <section id="productosEstrella" className="container my-2">
          <h2 className={styles.tituloEstrella}>Nuestros Productos Estrella 🌟</h2>

          <div className="row g-3 justify-content-center">
            {productosEstrellas.map((prod, index) => (
              <div key={prod.idProducto || prod.idProducto|| prod.id ||index} className="col-12 col-sm-6 col-md-4 col-lg-2">
                <div className={styles.cardProducto}>
                  <div>
                    <h6 className={styles.tituloProducto}>{prod.nombre}</h6>
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className={styles.imagenProducto}
                    />
                    <p className={styles.precioProducto}>$ {prod.precio} x Kg</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className={styles.btnProducto}
                      onClick={handleIrAProducto}
                    >
                      Ir a producto
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
};

export default Menu;