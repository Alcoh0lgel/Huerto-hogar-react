import React from 'react';
import AppFooter from '../../../components/footer/footer';
import styles from './blogs_in.module.css';
import NavigationBarIn from '../../../components/navbar/navbarIn';

function Blogs() {
  return (
    <>
      <NavigationBarIn />
      <main className={`${styles.contenidoPrincipal} py-4`}>
              <section id="noticias" className="container d-flex flex-column align-items-center mt-3">
                <h2 className={`mb-4 ${styles.tituloSeccion}`}>Información Que Podría Interesarte 🤗</h2>
      
                {/* Primera Noticia */}
                <div className={`card mb-4 ${styles.cardNoticia}`} style={{ maxWidth: '900px' }}>
                  <div className="row g-0 flex-row-reverse align-items-center p-2">
                    <div className="col-md-4">
                      <img 
                        src="/img/tomates.jpg" 
                        className={`img-fluid ${styles.imagenNoticia}`} 
                        alt="Huerto casa" 
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-3">
                        <h5 className={`card-title ${styles.tituloCard}`}>El Secreto de los Tomates Felices</h5>
                        <p className={`card-text ${styles.textoCard}`}>
                          ¿Sabías que guardar los tomates en el refrigerador es el peor enemigo de su sabor? 
                          El frío detiene su maduración natural y hace que su textura se vuelva harinosa. 
                          En Huerto Hogar los cosechamos justo antes de salir a reparto para que lleguen firmes 
                          y jugosos a tu mesa; déjalos en un frutero fresco fuera del refri y notarás la
                          diferencia desde el primer corte.
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
                        src="/img/lechuga.jpg" 
                        className={`img-fluid ${styles.imagenNoticia}`} 
                        alt="Huerto casa" 
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-3">
                        <h5 className={`card-title ${styles.tituloCard}`}>Menos Kilómetros, Más Nutrientes</h5>
                        <p className={`card-text ${styles.textoCard}`}>
                          Una lechuga convencional puede pasar hasta una semana viajando en camiones y bodegas 
                          antes de llegar a tu ensaladera, perdiendo gran parte de sus vitaminas en el camino. 
                          Al trabajar directo con agricultores del Valle del Maule y O'Higgins, acortamos esa 
                          cadena a menos de 24 horas: tú recibes alimentos recién cortados de la tierra y 
                          nuestros campesinos reciben un pago justo sin intermediarios.
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