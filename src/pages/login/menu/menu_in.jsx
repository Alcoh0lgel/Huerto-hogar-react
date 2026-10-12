import { useNavigate } from 'react-router-dom';
import styles from './menu_in.module.css';
import NavigationBarIn from '../../../components/navbar/navbarIn';
import AppFooter from '../../../components/footer/footer'

const productosEstrellas = [
  {
    id: 1,
    nombre: "Manzana Fuji",
    imagen: "/img/manzana.png",
    precio: 1200,
    stock: 150,
    descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule..."
  },
  {
    id: 2,
    nombre: "Naranjas Valencia",
    imagen: "/img/naranja.png",
    precio: 1000,
    stock: 200,
    descripcion: "Jugosas y ricas en vitamina C..."
  },
  {
    id: 3,
    nombre: "Plátanos Cavendish",
    imagen: "/img/platano.png",
    precio: 800,
    stock: 250,
    descripcion: "Plátanos maduros y dulces..."
  },
  {
    id: 4,
    nombre: "Zanahorias Orgánicas",
    imagen: "/img/zanahoria.png",
    precio: 900,
    stock: 100,
    descripcion: "Zanahorias crujientes cultivadas sin pesticidas..."
  },
  {
    id: 5,
    nombre: "Espinacas Frescas",
    imagen: "/img/espinaca.png",
    precio: 700,
    stock: 80,
    descripcion: "Espinacas frescas y nutritivas..."
  },
  {
    id: 6,
    nombre: "Pimientos Tricolores",
    imagen: "/img/pimenton.png",
    precio: 1500,
    stock: 120,
    descripcion: "Pimientos rojos, amarillos y verdes..."
  }
];

export const Menu = () => {
  const navigate = useNavigate();

  const handleIrAProducto = (producto) => {
    navigate('/login/producto'); 
  };

  return (
    <>
      <NavigationBarIn />

      <main className={styles.contenidoPrincipal}>
        
        {/* Portada de Presentación en 2 Columnas */}
        <section className="container">
          <div className={styles.tarjetaPresentacion}>
            <div className="row align-items-center g-4">
              
              {/* Columna Izquierda: Imagen */}
              <div className="col-12 col-md-5 text-center">
                <img 
                  src="/img/verduras.jpg" 
                  className={styles.imagenPortada}
                  alt="Verduras Huerto Hogar"
                />
              </div>

              {/* Columna Derecha: Texto de la Tienda */}
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
              <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-2">
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
                      onClick={() => handleIrAProducto(prod)}
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
    <AppFooter/>
    </>
  );
};

export default Menu;