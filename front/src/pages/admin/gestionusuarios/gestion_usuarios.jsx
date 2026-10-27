import React, { useState, useEffect } from 'react';
import styles from './gestion_usuarios.module.css';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import UsuarioModal from '../../../components/modal/modalusuariosadmin';
import App_alert from "../../../components/alerts/alertas";

const KEY_STORAGE = 'clave_storage';
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

const usuariosAleatoriosIniciales = [
    {
        run: "182223334",
        nombre: "Valentina",
        apellido: "Rojas Soto",
        correo: "valentina.rojas@duoc.cl",
        password: "password123",
        telefono: "+56987654321",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "Av. Suecia 456"
    },
    {
        run: "174445556",
        nombre: "Matías",
        apellido: "Herrera Valenzuela",
        correo: "matias.herrera@gmail.com",
        password: "password123",
        telefono: "+56971234567",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Calle San Martín 789"
    },
    {
        run: "196667778",
        nombre: "Camila",
        apellido: "Pérez Alarcón",
        correo: "camila.perez@profesor.duoc.cl",
        password: "password123",
        telefono: "+56965432109",
        region: "Región del Biobío",
        comuna: "Concepción",
        direccion: "Barrio Universitario 123"
    },
    {
        run: "16888999K",
        nombre: "Felipe",
        apellido: "Gatica Muñoz",
        correo: "felipe.gatica@gmail.com",
        password: "password123",
        telefono: "+56954321098",
        region: "Región de la Araucanía",
        comuna: "Temuco",
        direccion: "Avenida Alemania 990"
    },
    {
        run: "201112223",
        nombre: "Sofía",
        apellido: "Navarro Contreras",
        correo: "sofia.navarro@duoc.cl",
        password: "password123",
        telefono: "+56943210987",
        region: "Región de Coquimbo",
        comuna: "La Serena",
        direccion: "Avenida del Mar 4500"
    }
];

const validarUsuario = (data, usuariosExistentes, editandoRun) => {
    const runTrim = data.run.trim().toUpperCase();

    if (!runTrim || runTrim.length < 8 || runTrim.length > 9) {
        return "El RUN debe tener entre 8 y 9 caracteres (sin puntos ni guion).";
    }

    if (editandoRun === null && usuariosExistentes.some(u => u.run === runTrim)) {
        return "Ya existe un usuario registrado con este RUN.";
    }

    if (!data.nombre || data.nombre.trim().length < 2) {
        return "El nombre es obligatorio.";
    }

    if (!data.apellido || data.apellido.trim().length < 2) {
        return "El apellido es obligatorio.";
    }

    const correo = data.correo.trim();
    const partesCorreo = correo.split('@');
    const dominio = partesCorreo.length > 1 ? partesCorreo[1] : '';

    if (!correo) {
        return "El correo electrónico es obligatorio.";
    } else if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
        return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com";
    }

    const password = data.password.trim();
    if (!password) {
        return "La contraseña es obligatoria.";
    } else if (password.length < 4 || password.length > 10) {
        return "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (!data.region || !data.comuna) {
        return "Debes seleccionar una Región y una Comuna.";
    }

    if (!data.direccion || data.direccion.trim().length < 5) {
        return "La dirección debe tener al menos 5 caracteres.";
    }

    return null; 
};

export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState(() => {
        let guardados = localStorage.getItem(KEY_STORAGE);
        if (guardados) {
            try {
                let parsed = JSON.parse(guardados);
                if (parsed && parsed.length > 0) return parsed;
            } catch (e) {
                console.error(e);
            }
        }
        localStorage.setItem(KEY_STORAGE, JSON.stringify(usuariosAleatoriosIniciales));
        return usuariosAleatoriosIniciales;
    });

    const [showModal, setShowModal] = useState(false);
    const [editandoRun, setEditandoRun] = useState(null);
    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        telefono: '',
        region: '',
        comuna: '',
        direccion: ''
    });

    // Estados necesarios para el manejo dentro del modal
    const [errores, setErrores] = useState({});
    const [alerta, setAlerta] = useState({
        mostrar: false,
        variant: 'success',
        msg: '',
    });

    const cerrarAlert = () => setAlerta((prev) => ({ ...prev, mostrar: false }));

    useEffect(() => {
        localStorage.setItem(KEY_STORAGE, JSON.stringify(usuarios));
    }, [usuarios]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'region') {
            setFormData({ ...formData, region: value, comuna: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const abrirModalNuevo = () => {
        setEditandoRun(null);
        setFormData({ run: '', nombre: '', apellido: '', correo: '', password: '', telefono: '', region: '', comuna: '', direccion: '' });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const editarUsuario = (run) => {
        const usuario = usuarios.find(u => u.run === run);
        if (!usuario) return;

        setEditandoRun(usuario.run);
        setFormData({ ...usuario });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const eliminarUsuario = (run) => {
        if (window.confirm(`¿Seguro que deseas eliminar al usuario con RUN ${run}?`)) {
            const actualizados = usuarios.filter(u => u.run !== run);
            setUsuarios(actualizados);
        }
    };

    const guardarUsuario = (e) => {
        e.preventDefault();

        const error = validarUsuario(formData, usuarios, editandoRun);
        if (error) {
            setAlerta({
                mostrar: true,
                variant: 'danger',
                msg: error,
            });
            return;
        }

        const runTrim = formData.run.trim().toUpperCase();

        let nuevosUsuarios = [...usuarios];
        if (editandoRun !== null) {
            nuevosUsuarios = nuevosUsuarios.map(u => u.run === editandoRun ? { ...formData, run: runTrim } : u);
        } else {
            nuevosUsuarios.push({ ...formData, run: runTrim });
        }

        setUsuarios(nuevosUsuarios);
        setAlerta({
            mostrar: true,
            variant: 'success',
            msg: '¡Usuario guardado con éxito! 🌿',
        });

        setTimeout(() => {
            setShowModal(false);
            setAlerta((prev) => ({ ...prev, mostrar: false }));
        }, 2000);
    };

    return (
        <div className={styles.adminLayout}>
            <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
                <AdminSidebar vistaActiva="usuarios" />

                <main className={styles.mainContent}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.mainTitle}>Gestión de Usuarios</h2>
                        <button className={`btn ${styles.btnPrimaryCustom}`} onClick={abrirModalNuevo}>
                            + Agregar Usuario
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                            <thead className="table-dark">
                                <tr>
                                    <th>RUN</th>
                                    <th>Nombre Completo</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Comuna / Región</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-3">
                                            No hay usuarios registrados en el sistema.
                                        </td>
                                    </tr>
                                ) : (
                                    usuarios.map((u) => (
                                        <tr key={u.run}>
                                            <td className="fw-bold">{u.run}</td>
                                            <td>{u.nombre} {u.apellido}</td>
                                            <td>{u.correo}</td>
                                            <td>{u.telefono || 'N/A'}</td>
                                            <td>{u.comuna}, {u.region}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editarUsuario(u.run)}>Editar</button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarUsuario(u.run)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <UsuarioModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={guardarUsuario}
                formData={formData}
                onChange={handleChange}
                editandoRun={editandoRun}
                errores={errores}
                alerta={alerta}
                cerrarAlert={cerrarAlert}
            /> 
        </div>
    );
}