import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminSidebar({ vistaActiva }) {
    return (
        <aside className="bg-light border-end p-3" style={{ width: "250px", flexShrink: 0 }}>
            {/* Redirige al perfil al hacer clic en HH Admin */}
            <Link to="/admin/panel" className="d-flex align-items-center gap-2 mb-4 text-decoration-none">
                <img src="../img/admin.png" alt="Adm" style={{ width: "50px" }} />
                <span className="fw-bold text-dark">HH Admin</span>
            </Link>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    {/* Link directo hacia la ruta del panel de productos usando as={Link} o directamente <Link> */}
                    <Link 
                        to="/admin/productos" 
                        className={`nav-link w-100 text-start border ${vistaActiva === 'productos' ? 'active border-primary shadow-sm' : 'border-transparent'}`}
                        style={{ fontWeight: vistaActiva === 'productos' ? '600' : '500', textDecoration: 'none' }}
                    >
                        📦 Productos
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link 
                        to="/admin/boletas" 
                        state={{ seccion: 'boletas' }} // Opcional: si prefieres manejarlo por estado de ruta
                        className={`nav-link w-100 text-start border ${vistaActiva === 'boletas' ? 'active border-primary shadow-sm' : 'border-transparent'}`}
                        style={{ fontWeight: vistaActiva === 'boletas' ? '600' : '500', textDecoration: 'none' }}
                    >
                        🧾 Boletas de Compra
                    </Link>
                </li>
            </ul>
            <hr />
            <Link to="/" className="btn btn-outline-danger w-100 btn-sm">Salir</Link>
        </aside>
    );
}