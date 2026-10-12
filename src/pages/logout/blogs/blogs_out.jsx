import React from 'react';
import NavigationBar from '../../../components/navbar/navbarout';
import AppFooter from '../../../components/footer/footer';
import styles from './blogs_out.module.css';

function Blogs() {
  return (
    <>
      <NavigationBar />
      <main className={`${styles.contenidoPrincipal} py-4`}>
        <section id="noticias" className="container d-flex flex-column align-items-center mt-3">
          <h2 className={`mb-4 ${styles.tituloSeccion}`}>Noticias Importantes</h2>

          {/* Primera Noticia */}
          <div className={`card mb-4 ${styles.cardNoticia}`} style={{ maxWidth: '900px' }}>
            <div className="row g-0 flex-row-reverse align-items-center p-2">
              <div className="col-md-4">
                <img 
                  src="/img/huerto_casa.jpg" 
                  className={`img-fluid ${styles.imagenNoticia}`} 
                  alt="Huerto casa" 
                />
              </div>
              <div className="col-md-8">
                <div className="card-body p-3">
                  <h5 className={`card-title ${styles.tituloCard}`}>Dato Curioso</h5>
                  <p className={`card-text ${styles.textoCard}`}>
                    Cuenta la "leyenda" que el nombre surgió porque el fundador, cansado de
                    que sus tomates se aplastaran en el refrigerador del súper, empezó vendiendo
                    verduras desde el patio de su propia casa a los vecinos del barrio; de ahí lo de "huerto"
                    su huerto real y "hogar" porque literalmente operaba desde su casa.
                    La primera "bodega" de la empresa habría sido el garage familiar, y el primer "sistema
                    de delivery" era su propia bicicleta con un carrito improvisado atrás.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda Noticia */}
          <div className={`card mb-4 ${styles.cardNoticia}`} style={{ maxWidth: '900px' }}>
            <div className="row g-0 flex-row-reverse align-items-center p-2">
              <div className="col-md-4">
                <img 
                  src="/img/huerto_casa.jpg" 
                  className={`img-fluid ${styles.imagenNoticia}`} 
                  alt="Huerto casa" 
                />
              </div>
              <div className="col-md-8">
                <div className="card-body p-3">
                  <h5 className={`card-title ${styles.tituloCard}`}>Dato Curioso</h5>
                  <p className={`card-text ${styles.textoCard}`}>
                    Cuenta la "leyenda" que el nombre surgió porque el fundador, cansado de
                    que sus tomates se aplastaran en el refrigerador del súper, empezó vendiendo
                    verduras desde el patio de su propia casa a los vecinos del barrio; de ahí lo de "huerto"
                    su huerto real y "hogar" porque literalmente operaba desde su casa.
                    La primera "bodega" de la empresa habría sido el garage familiar, y el primer "sistema
                    de delivery" era su propia bicicleta con un carrito improvisado atrás.
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

export default Blogs;