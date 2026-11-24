import React, { useState, useEffect } from 'react';
import styles from './gestion_usuarios.module.css';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import UsuarioModal from '../../../components/modal/modalusuariosadmin';
import { registro } from '../../../api/authApi';
import { obtenerUsuarios, actualizarUsuario, eliminarUsuario as eliminarUsuarioApi } from '../../../api/usuarioApi';

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'admin.cl', 'huerthogar.cl'];

const validarUsuario = (data, usuariosExistentes, editandoId) => {
    const runTrim = data.run.trim().toUpperCase();

    if (!runTrim || runTrim.length < 7 || runTrim.length > 9) {
        return "El RUN debe tener entre 7 y 9 caracteres (sin puntos ni guion).";
    }

    if (editandoId === null && usuariosExistentes.some(u => u.run === runTrim)) {
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
        return "Solo se permiten correos @admin.cl, @huerthogar.cl, @duoc.cl, @profesor.duoc.cl y @gmail.com";
    }

    const password = data.password ? data.password.trim() : '';
    if (editandoId === null && (!password || password.length < 4 || password.length > 10)) {
        return "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (!data.direccion || data.direccion.trim().length < 5) {
        return "La dirección debe tener al menos 5 caracteres.";
    }

    return null; 
};

export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editandoId, setEditandoId] = useState(null); // Usamos id_usuario de la BD
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

    const [errores, setErrores] = useState({});
    const [alerta, setAlerta] = useState({
        mostrar: false,
        variant: 'success',
        msg: '',
    });

    const cerrarAlert = () => setAlerta((prev) => ({ ...prev, mostrar: false }));

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error("Error al cargar usuarios desde el backend:", error);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'region') {
            setFormData({ ...formData, region: value, comuna: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const abrirModalNuevo = () => {
        setEditandoId(null);
        setFormData({ run: '', nombre: '', apellido: '', correo: '', password: '', telefono: '', region: '', comuna: '', direccion: '' });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const editarUsuario = (usuario) => {
        setEditandoId(usuario.id_usuario);
        setFormData({
            run: usuario.run || '',
            nombre: usuario.nombre || '',
            apellido: usuario.apellido || '',
            correo: usuario.correo || '',
            password: '', 
            telefono: usuario.telefono || '',
            region: '',
            comuna: '',
            direccion: usuario.direccion || ''
        });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const eliminarUsuario = async (id_usuario, run) => {
        if (window.confirm(`¿Seguro que deseas eliminar al usuario con RUN ${run}?`)) {
            try {
                await eliminarUsuarioApi(id_usuario);
                cargarUsuarios();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        }
    };

    const guardarUsuario = async (e) => {
        e.preventDefault();

        const error = validarUsuario(formData, usuarios, editandoId);
        if (error) {
            setAlerta({
                mostrar: true,
                variant: 'danger',
                msg: error,
            });
            return;
        }

        const direccionCompleta = formData.comuna && formData.region
            ? `${formData.direccion.trim()}, ${formData.comuna}, ${formData.region}`
            : formData.direccion.trim();

        const payload = {
            run: formData.run.trim().toUpperCase(),
            nombre: formData.nombre.trim(),
            apellido: formData.apellido.trim(),
            correo: formData.correo.trim(),
            password: formData.password.trim(),
            telefono: formData.telefono.trim(),
            direccion: direccionCompleta, 
        };

        try {
            if (editandoId !== null) {
                await actualizarUsuario(editandoId, payload);
            } else {
                await registro(payload);
            }

            await cargarUsuarios();

            setAlerta({
                mostrar: true,
                variant: 'success',
                msg: '¡Usuario guardado en la base de datos con éxito! 🌿',
            });

            setTimeout(() => {
                setShowModal(false);
                setAlerta((prev) => ({ ...prev, mostrar: false }));
            }, 1500);
        } catch (err) {
            setAlerta({
                mostrar: true,
                variant: 'danger',
                msg: err.status === 409 ? 'Ese correo ya está registrado.' : 'Error al guardar el usuario en el servidor.',
            });
        }
    };

    return (
        <div className={styles.adminLayout}>
            <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
                <AdminSidebar vistaActiva="usuarios" />

                <main className={styles.mainContent}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.mainTitle}>Gestión de Usuarios</h2>
                        <button className={`btn ${styles.btnPrimaryCustom}`} onClick={abrirModalNuevo}>
                            + Agregar Usuario / Admin
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                            <thead className="table-dark">
                                <tr>
                                    <th>RUN</th>
                                    <th>Nombre Completo</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                            No hay usuarios registrados en la base de datos.
                                        </td>
                                    </tr>
                                ) : (
                                    usuarios.map((u) => (
                                        <tr key={u.id_usuario}>
                                            <td className="fw-bold">{u.run}</td>
                                            <td>{u.nombre} {u.apellido}</td>
                                            <td>{u.correo}</td>
                                            <td>
                                                <span className={`badge ${u.rol === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                                                    {u.rol}
                                                </span>
                                            </td>
                                            <td>{u.telefono || 'N/A'}</td>
                                            <td>{u.direccion}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editarUsuario(u)}>Editar</button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarUsuario(u.id_usuario, u.run)}>Eliminar</button>
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
                editandoRun={editandoId}
                errores={errores}
                alerta={alerta}
                cerrarAlert={cerrarAlert}
            /> 
        </div>
    );
}