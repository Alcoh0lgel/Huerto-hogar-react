import React from 'react';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import styles from './menu_admin.module.css';

export default function AdminPerfil() {
    // Datos simulados del administrador
    const adminData = {
        nombre: "Administrador Principal",
        email: "admin@huertohogar.cl",
        rol: "Super Administrador",
        telefono: "+56 9 1234 5678",
        fechaIngreso: "01 de Enero, 2026",
        nivelAcceso: "Nivel 1 (Control Total)"
    };

    return (
        <div className={styles.perfilLayout}>
            {/* Sidebar con acceso a perfil, productos y boletas */}
            <AdminSidebar vistaActiva="" setVistaActiva={() => {}} />

            <main className={styles.mainContent}>
                <h2 className={styles.mainTitle}>👤 Perfil del Administrador</h2>

                <div className={styles.cardPerfil}>
                    <div className="text-center mb-4">
                        <img src="../img/admin.png" alt="Avatar Admin" className={styles.avatarAdmin} />
                        <h4 className="fw-bold m-0">{adminData.nombre}</h4>
                        <span className="badge bg-success mt-2">{adminData.rol}</span>
                    </div>

                    <hr className="my-4" />

                    <div className="row g-3">
                        <div className="col-sm-6">
                            <span className={styles.infoLabel}>Correo Electrónico:</span>
                            <p className={styles.infoValue}>{adminData.email}</p>
                        </div>
                        <div className="col-sm-6">
                            <span className={styles.infoLabel}>Teléfono de Contacto:</span>
                            <p className={styles.infoValue}>{adminData.telefono}</p>
                        </div>
                        <div className="col-sm-6">
                            <span className={styles.infoLabel}>Fecha de Ingreso:</span>
                            <p className={styles.infoValue}>{adminData.fechaIngreso}</p>
                        </div>
                        <div className="col-sm-6">
                            <span className={styles.infoLabel}>Nivel de Acceso:</span>
                            <p className={styles.infoValue}>{adminData.nivelAcceso}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}