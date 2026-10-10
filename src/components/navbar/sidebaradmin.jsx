import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {
    return (
        <aside className="bg-light border-end p-3" style={{ width: "250px", flexShrink: 0 }}>
            <div className="d-flex align-items-center gap-2 mb-4">
                <img src="../img/admin.png" alt="Adm" style={{ width: "50px" }} />
                <span className="fw-bold">HH Admin</span>
            </div>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <a href="#" className="nav-link active" id="menuProductos"> Productos</a>
                </li>
            </ul>
            <hr />
            <Link to="/" className="btn btn-outline-danger w-100 btn-sm">Salir</Link>
        </aside>
    );
}