import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export const MenuIn = () => {
  const navigate = useNavigate();

  const handleIrAProducto = (producto) => {
    navigate('/producto'); 
  };

  return (
    <main className="contenido-principal">
      
      {/* Portada de Presentación */}
      <section className="container my-4">
        <div className="contenedor-presentacion portada">
          <div className="tarjeta-presentacion rounded-4 tarjeta-centro">
            <div className="portada">
              <img src="/img/verduras.jpg" className="rounded-4" alt="Verduras Huerto Hogar" />
            </div>
            <div className="texto-presentacion">
              <h3>Tienda Huerto Hogar</h3>
              <p>
                HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los
                productos del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de
                experiencia, operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como
                Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra
                misión es conectar a las familias chilenas con el campo, promoviendo un estilo de vida saludable
                y sostenible.
              </p>
              <span className="lema">🌱 Del campo al hogar 🏠</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Productos Estrella */}
      <section id="productosEstrella" className="container mt-1 py-4">
        <h2 className="text-center mb-4">Nuestros Productos Estrella 🌟</h2>

        <div className="contenedor-cards row g-3">
          {productosEstrellas.map((prod) => (
            <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="card h-100 d-flex flex-column text-center p-2">
                <h5 className="titulo-producto">{prod.nombre}</h5>
                <img src={prod.imagen} alt={prod.nombre} className="imagen-producto" />
                <p className="precio-producto mt-auto mb-2">$ {prod.precio} x Kg</p>
                <div className="contenedor-boton">
                  <button 
                    className="btn btn-outline-success"
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
  );
};

export default MenuIn;