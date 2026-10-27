import React, { useContext } from 'react';
import NavigationBarIn from '../../../components/navbar/navbarIn';
import { CartContext } from '../../../context/cartContext';
import styles from './producto_in.module.css';
import AppFooter from '../../../components/footer/footer'

const productosEstrellas = [
  {
    id: 1,
    nombre: "Manzana Fuji",
    imagen: "/img/manzana.png",
    precio: 1200,
    stock: 150,
    descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido."
  },
  {
    id: 2,
    nombre: "Naranjas Valencia",
    imagen: "/img/naranja.png",
    precio: 1000,
    stock: 200,
    descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad."
  },
  {
    id: 3,
    nombre: "Plátanos Cavendish",
    imagen: "/img/platano.png",
    precio: 800,
    stock: 250,
    descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada."
  },
  {
    id: 4,
    nombre: "Zanahorias Orgánicas",
    imagen: "/img/zanahoria.png",
    precio: 900,
    stock: 100,
    descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable."
  },
  {
    id: 5,
    nombre: "Espinacas Frescas",
    imagen: "/img/espinaca.png",
    precio: 700,
    stock: 80,
    descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional."
  },
  {
    id: 6,
    nombre: "Pimientos Tricolores",
    imagen: "/img/pimenton.png",
    precio: 1500,
    stock: 120,
    descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta."
  }
];

function Producto() {
  const { agregarAlCarrito } = useContext(CartContext);

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

          <div className="row g-4">
            {productosEstrellas.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className={styles.cardProducto}>
                  <div className="row g-0 h-100">
                    
                    {/* Imagen a la izquierda */}
                    <div className="col-4 p-2">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        className={styles.imagenProducto} 
                      />
                    </div>

                    {/* Contenido a la derecha */}
                    <div className="col-8">
                      <div className={styles.detallesProducto}>
                        <div>
                          <h5 className={styles.tituloProducto}>
                            {item.nombre}
                          </h5>
                          <p className={styles.precioProducto}>
                            $ {item.precio} x Kg
                          </p>
                          <p className={styles.descripcionProducto}>
                            {item.descripcion}
                          </p>
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

      <AppFooter/>
    </>
  );
}

export default Producto;