import React from 'react';
import NavigationBarIn from '../../../components/navbar/navbarIn';

function BlogsIn() {
  return (
    <>
    <NavigationBarIn/>
    <main className="contenido-principal py-4">
      <section id="noticias" className="container d-flex flex-column align-items-center">
        <h2 className="mb-4">Noticias Importantes</h2>

        <div className="card mb-4" style={{ maxWidth: '900px' }}>
          <div className="row g-0 flex-row-reverse align-items-center">
            <div className="col-md-4">
              <img 
                src="/img/huerto_casa.jpg" 
                className="img-fluid rounded-end" 
                alt="Huerto casa" 
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dato Curioso</h5>
                <p className="card-text">
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

        <div className="card mb-4" style={{ maxWidth: '900px' }}>
          <div className="row g-0 flex-row-reverse align-items-center">
            <div className="col-md-4">
              <img 
                src="/img/huerto_casa.jpg" 
                className="img-fluid rounded-end" 
                alt="Huerto casa" 
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dato Curioso</h5>
                <p className="card-text">
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
    </>
  );
}

export default BlogsIn;