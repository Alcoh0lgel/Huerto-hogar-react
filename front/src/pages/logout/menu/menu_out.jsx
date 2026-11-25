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
        <section className="container mt-3">
          <div className={styles.tarjetaPresentacion}>
            <div className="row align-items-center g-4">
              <div className="col-12 col-md-5 text-center">
                <img
                  src="/img/verduras.jpg"
                  className={styles.imagenPortada}
                  alt="Verduras Huerto Hogar"
                />
              </div>

              <div className="col-12 col-md-7">
                <h3 className={styles.tituloSeccion}>Tienda Huerto Hogar</h3>
                <p className={styles.textoPresentacion}>
                  HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los
                  productos del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de
                  experiencia, operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como
                  Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra
                  misión es conectar a las familias chilenas con el campo, promoviendo un estilo de vida saludable
                  y sostenible.
                </p>
                <div>
                  <span className={styles.lema}>🌱 Del campo al hogar 🏠</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Productos Estrella */}
        <section id="productosEstrella" className="container my-2">
          <h2 className={styles.tituloEstrella}>Nuestros Productos Estrella 🌟</h2>

          <div className="row g-3 justify-content-center">
            {productosEstrellas.map((prod) => (
              <div key={prod.idProducto || prod.id} className="col-12 col-sm-6 col-md-4 col-lg-2">
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