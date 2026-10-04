import React from 'react';

function NosotrosIn() {
  return (
    <main className="contenido-principal py-4">
      <section id="contenido-nosotros" className="container">
        
        <h2 className="titulo-primero text-center mb-4">Quiénes Somos</h2>
        
        <div className="card mb-4 card-izquierda mx-auto" style={{ maxWidth: '900px' }}>
          <div className="row g-0 flex-row-reverse align-items-center">
            <div className="col-md-4">
              <img 
                src="/img/huerto_casa.jpg" 
                className="img-fluid rounded-start" 
                alt="Huerto casa" 
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dato Curioso</h5>
                <p className="card-text">
                  Cuenta la "leyenda" que el nombre surgió porque el fundador, cansado de que sus tomates se
                  aplastaran en el refrigerador del súper, empezó vendiendo verduras desde el patio de su propia casa a los
                  vecinos del barrio; de ahí lo de "huerto" (su huerto real) y "hogar" porque literalmente operaba desde su casa.
                  La primera "bodega" de la empresa habría sido el garage familiar, y el primer "sistema de delivery" era su
                  propia bicicleta con un carrito improvisado atrás.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="titulo-segundo text-center my-4">¿Por qué elegirnos?</h2>

        <div className="card mb-4 card-derecha mx-auto" style={{ maxWidth: '900px' }}>
          <div className="row g-0 flex-row-reverse align-items-center">
            <div className="col-md-4">
              <img 
                src="/img/huerto_noso.jpg" 
                className="img-fluid rounded-start" 
                alt="Huerto nosotros" 
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Nuestra Pasión</h5>
                <p className="card-text">
                  Cuenta la "leyenda" que el nombre surgió porque el fundador, cansado de que sus tomates se
                  aplastaran en el refrigerador del súper, empezó vendiendo verduras desde el patio de su propia casa a los
                  vecinos del barrio; de ahí lo de "huerto" (su huerto real) y "hogar" porque literalmente operaba desde su casa.
                  La primera "bodega" de la empresa habría sido el garage familiar, y el primer "sistema de delivery" era su
                  propia bicicleta con un carrito improvisado atrás.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}

export default NosotrosIn;