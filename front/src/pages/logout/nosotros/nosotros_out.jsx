import React from 'react';
import NavigationBar from '../../../components/navbar/navbarout';
import AppFooter from '../../../components/footer/footer';
import styles from './nosotros_out.module.css';

function Nosotros() {
  return (
    <>
      <NavigationBar />

      <main className={styles.contenidoPrincipal}>
        <section id="contenido-nosotros" className="container mt-3">
          
          <div className={styles.contenedorNosotros}>
            
            {/* Sección 1: Quiénes Somos */}
            <h2 className={styles.tituloSeccion}>Quiénes Somos</h2>

            <div className={`${styles.cardNosotros} ${styles.cardIzquierda}`}>
              <div className="row g-4 align-items-center flex-row-reverse">
                <div className="col-12 col-md-5">
                  <img 
                    src="/img/huerto_casa.jpg" 
                    className={styles.imagenNosotros} 
                    alt="Huerto casa" 
                  />
                </div>
                <div className="col-12 col-md-7">
                  <h5 className={styles.cardTitulo}>Dato Curioso</h5>
                  <p className={styles.cardTexto}>
                    Cuenta la "leyenda" que el nombre surgió porque el fundador, cansado de que sus tomates se
                    aplastaran en el refrigerador del súper, empezó vendiendo verduras desde el patio de su propia casa a los
                    vecinos del barrio; de ahí lo de "huerto" (su huerto real) y "hogar" porque literalmente operaba desde su casa.
                    La primera "bodega" de la empresa habría sido el garage familiar, y el primer "sistema de delivery" era su
                    propia bicicleta con un carrito improvisado atrás.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección 2: ¿Por qué elegirnos? */}
            <h2 className={styles.tituloSeccionSecundario}>¿Por qué elegirnos?</h2>

            <div className={`${styles.cardNosotros} ${styles.cardDerecha}`}>
              <div className="row g-4 align-items-center flex-row-reverse">
                <div className="col-12 col-md-5">
                  <img 
                    src="/img/huerto_noso.jpg" 
                    className={styles.imagenNosotros} 
                    alt="Huerto nosotros" 
                  />
                </div>
                <div className="col-12 col-md-7">
                  <h5 className={styles.cardTitulo}>Nuestra Pasión</h5>
                  <p className={styles.cardTexto}>
                    Seleccionamos únicamente hortalizas y frutas cultivadas bajo procesos limpios y sostenibles.
                    Creemos firmemente que una alimentación natural transforma la vida de las personas. Por ello,
                    trabajamos codo a codo con agricultores locales para llevar directo a tu hogar la frescura, el sabor original
                    y la más alta calidad en cada entrega.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </section>
      </main>

      <AppFooter />
    </>
  );
}

export default Nosotros;