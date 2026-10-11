import NavigationBarIn from '../../../components/navbar/navbarIn';
import { useContext } from 'react';
import { CartContext } from '../../../context/cartContext';

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

      <main className="contenido-principal">
        <section className="container my-4">
          <div className="contenedor-presentacion">
            
            <div className="tarjeta-presentacion rounded-4 tarjeta-izquierda">
              <div className="producto-presentacion">
                <img src="/img/verduras.jpg" className="rounded-5" alt="verduras" />
              </div>
              <div className="texto-presentacion">
                <h3>Frescura Real: Del Campo a tu Mesa</h3>
                <p>
                  En Huerto Hogar seleccionamos verduras de la más alta calidad, cosechadas en su punto óptimo de
                  maduración. Sin largos períodos de almacenamiento ni intermediarios, garantizamos el sabor crujiente
                  y los nutrientes intactos que solo la tierra chilena puede ofrecer.
                </p>
                <span className="lema">🌱 Del campo al hogar 🏠</span>
              </div>
            </div>

            <div className="tarjeta-presentacion rounded-4 tarjeta-derecha">
              <div className="producto-presentacion">
                <img src="/img/verduras.jpg" className="rounded-5" alt="verduras" />
              </div>
              <div className="texto-presentacion">
                <h3>Tu Cosecha del Día a un Clic</h3>
                <p>
                  Llevar alimentos saludables a tu cocina nunca fue tan sencillo. Contamos con una selección fresca de
                  temporada lista para acompañar tus comidas de la semana. Explora nuestro catálogo a continuación,
                  elige tus productos favoritos y recibe el campo en la puerta de tu hogar.
                </p>
                <span className="lema">🌱 Del campo al hogar 🏠</span>
              </div>
            </div>

          </div>
        </section>

        <section id="productosVenta" className="container mt-1 py-4">

          <h2 className="text-center mb-4">Nuestros Productos</h2>

          <div className="contenedor-cards row g-4">
            {productosEstrellas.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm p-4">
                  <div className="row g-2 h-100">
                    
                    {/*Imagen*/}
                    <div className="col-4 h-100">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        className="imgprod img-fluid rounded" 
                        style={{ height: '100%', objectFit: 'cover' }} 
                      />
                    </div>

                    {/* Columna de Detalles y Botón*/}
                    <div className="col-8">
                      <div className="card-body p-0 d-flex flex-column h-100">
                        <h5 className="titulo-producto card-title fs-6 fw-bold mt-0 mb-1">
                          {item.nombre}
                        </h5>
                        <p className="precio-producto card-text text-success fw-bold mb-1">
                          $ {item.precio} x Kg
                        </p>
                        <p className="descripcion-producto card-text small mb-2">
                          {item.descripcion}
                        </p>
                        <div className="mt-auto">
                          <button 
                            className="btn btn-success btn-sm w-100"
                            onClick={() => agregarAlCarrito(item)}>
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
    </>
  );
}

export default Producto;