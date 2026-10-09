import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../../components/navbar/navbaraccederadmin';

export default function LoginAdmin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            if (onLoginSuccess) onLoginSuccess();
            navigate('/admin/panel');
        }
    };

    const handleAccederClick = () => {
        // Redirige al panel de administración al hacer clic en el botón
        navigate('/admin/panel');
    };

    return (
        <>
            <NavigationBar />
            <div className="bg-light d-flex flex-column min-vh-100">
                <main className="container d-flex flex-grow-1 align-items-center justify-content-center py-4">
                    <div className="card p-4 shadow-sm border-0" style={{ maxWidth: "380px", width: "100%" }}>
                        <div className="text-center mb-3">
                            <img src="/img/HuertoHogar.png" alt="Huerto Hogar" height="60" className="mb-2" />
                            <h4 className="fw-bold m-0">Inicio de Sesión Administrador</h4>
                        </div>

                        <form onSubmit={handleSubmit} className="text-start">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label small mb-1">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control" 
                                    placeholder="name@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label small mb-1">Contraseña</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="form-control" 
                                    placeholder="*********" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="acceder">
                                <div className="btn-envio d-grid mb-2">
                                    <button 
                                        type="button" 
                                        className="btn btn-success"
                                        onClick={handleAccederClick}
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