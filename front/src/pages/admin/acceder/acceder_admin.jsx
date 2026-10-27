import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../../components/navbar/navbaraccederadmin';
import styles from './acceder_admin.module.css';

const DOMINIOS_PERMITIDOS = ['admin.cl', 'huerthogar.cl'];

const validar = (datos) => {
  const errores = {};

  const correo = datos.correo.trim();
  const partesCorreo = correo.split('@');
  const dominio = partesCorreo.length > 1 ? partesCorreo[1] : '';

  if (correo === '') {
    errores.correo = 'El correo es obligatorio.';
  } else if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    errores.correo = 'Solo se permiten correos @admin.cl, @huerthogar.cl';
  }

  const password = datos.password.trim();
  if (password === '') {
    errores.password = 'La contraseña es obligatoria.';
  } else if (password.length < 4 || password.length > 10) {
    errores.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
  }

  return errores;
};

export default function LoginAdmin({ onLoginSuccess }) {
    const [datos, setDatos] = useState({
        correo: '',
        password: ''
    });
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos({
            ...datos,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevosErrores = validar(datos);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) return;

        if (onLoginSuccess) onLoginSuccess();
        navigate('/admin/panel');
    };

    return (
        <>
            <NavigationBar />
            <div className={styles.loginContainer}>
                <main className={styles.loginMain}>
                    <div className={styles.loginCard}>
                        <div className="text-center mb-3">
                            <img src="/img/HuertoHogar.png" alt="Huerto Hogar" height="60" className="mb-2" />
                            <h4 className={`fw-bold m-0 ${styles.loginTitle}`}>Inicio de Sesión Administrador</h4>
                        </div>

                        <form onSubmit={handleSubmit} className="text-start">
                            <div className="mb-3">
                                <label htmlFor="correo" className={`form-label small mb-1 ${styles.formLabel}`}>Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    id="correo" 
                                    name="correo"
                                    className={`form-control ${styles.formControl}`} 
                                    placeholder="name@example.com" 
                                    value={datos.correo}
                                    onChange={handleChange}
                                />
                                {errores.correo && <div className="text-danger small mt-1">{errores.correo}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className={`form-label small mb-1 ${styles.formLabel}`}>Contraseña</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    className={`form-control ${styles.formControl}`} 
                                    placeholder="*********" 
                                    value={datos.password}
                                    onChange={handleChange}
                                />
                                {errores.password && <div className="text-danger small mt-1">{errores.password}</div>}
                            </div>

                            <div className="acceder">
                                <div className="btn-envio d-grid mb-2">
                                    <button 
                                        type="submit" 
                                        className={`btn ${styles.btnSuccess}`}
                                    >
                                        Acceder
                                    </button>
                                </div>
                                <a href="#recuperar" onClick={(e) => e.preventDefault()}>Recuperar contraseña</a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}