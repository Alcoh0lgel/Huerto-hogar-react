import React, { useState, useEffect } from 'react';
import styles from './gestion_productos.module.css';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import ProductoModal from '../../../components/modal/modalcrudproductos';
import {obtenerProductos,crearProducto,actualizarProducto,eliminarProductoApi} from '../../../api/productoApi';

const validarProducto = (datos) => {
    const errores = {};

    const nombre = datos.nombre.trim();
    if (nombre === '') {
        errores.nombre = 'El nombre es obligatorio.';
    } else if (nombre.length > 100) {
        errores.nombre = 'Máximo 100 caracteres.';
    }

    const precioNum = parseFloat(datos.precio);
    if (datos.precio === '' || isNaN(precioNum) || precioNum < 0) {
        errores.precio = 'El precio debe ser válido y no negativo.';
    }

    const stockNum = parseInt(datos.stock);
    if (datos.stock === '' || isNaN(stockNum) || stockNum < 0) {
        errores.stock = 'El stock debe ser un número entero no negativo.';
    }

    const descripcion = datos.descripcion.trim();
    if (descripcion === '') {
        errores.descripcion = 'La descripción es obligatoria.';
    } else if (descripcion.length > 500) {
        errores.descripcion = 'La descripción no debe superar los 500 caracteres.';
    }

    if (!datos.idCategoria) {
        errores.idCategoria = 'Debe seleccionar una categoría.';
    }

    return errores;
};

export default function GestionProductos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        imagen: '',
        precio: '',
        stock: '',
        descripcion: '',
        idCategoria: '1'
    });

    const [errores, setErrores] = useState({});
    const [alerta, setAlerta] = useState({
        mostrar: false,
        variant: 'success',
        msg: '',
    });

    const cargarProductosDesdeBackend = async () => {
        try {
            setCargando(true);
            const data = await obtenerProductos();
            const normalizados = data.map(p => ({
                ...p,
                id: p.id || p.idProducto || p.id_producto
            }));
            setProductos(normalizados);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarProductosDesdeBackend();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const abrirModalNuevoProducto = () => {
        setEditandoId(null);
        setFormData({
            id: '',
            nombre: '',
            imagen: '',
            precio: '',
            stock: '',
            descripcion: '',
            idCategoria: '1'
        });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const editarProducto = (id) => {
        const producto = productos.find(p => p.id === parseInt(id));
        if (!producto) return;

        setEditandoId(producto.id);
        setFormData({
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen || '',
            precio: producto.precio,
            stock: producto.stock,
            descripcion: producto.descripcion || '',
            idCategoria: String(producto.categoria?.idCategoria || '1')
        });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm(`¿Seguro que deseas eliminar el producto #${id}?`)) return;
        try {
            await eliminarProductoApi(id);
            await cargarProductosDesdeBackend();
        } catch (error) {
            alert('Error al eliminar producto. Verifica que tengas sesión de ADMIN.');
            console.error(error);
        }
    };

    const guardarProducto = async (gp) => {
        gp.preventDefault();
        const nuevosErrores = validarProducto(formData);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            setAlerta({
                mostrar: true,
                variant: 'danger',
                msg: 'Revisa los campos marcados antes de guardar.',
            });
            return;
        }

        const payload = {
            nombre: formData.nombre.trim(),
            imagen: formData.imagen.trim(),
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock),
            descripcion: formData.descripcion.trim(),
            categoria: {
                idCategoria: parseInt(formData.idCategoria)
            }
        };

        try {
            if (editandoId !== null) {
                await actualizarProducto(editandoId, payload);
            } else {
                await crearProducto(payload);
            }

            await cargarProductosDesdeBackend();
            setAlerta({
                mostrar: true,
                variant: 'success',
                msg: '¡Producto guardado en la base de datos! 🌿',
            });

            setTimeout(() => {
                setShowModal(false);
                setAlerta((prev) => ({ ...prev, mostrar: false }));
            }, 1200);
        } catch (error) {
            console.error('Error al guardar producto:', error);
            setAlerta({
                mostrar: true,
                variant: 'danger',
                msg: 'Error al guardar en el servidor. Verifica tu sesión de ADMIN.',
            });
        }
    };

    const productosNormales = productos.filter(p => p.stock > 50);
    const productosCriticos = productos.filter(p => p.stock <= 50);

    return (
        <div className={styles.adminLayout}>
            <div className="d-flex flex-column flex-md-row flex-grow-1 w-100">
                <AdminSidebar vistaActiva="productos" />

                <main className={styles.mainContent}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.mainTitle}>Gestión de Productos</h2>
                        <button className={`btn ${styles.btnPrimaryCustom}`} id="btnAgregarProducto" onClick={abrirModalNuevoProducto}>
                            + Agregar Producto
                        </button>
                    </div>

                    {cargando ? (
                        <p className="text-muted">Cargando productos desde la base de datos...</p>
                    ) : (
                        <>
                            <div className="table-responsive mb-5">
                                <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Categoría</th>
                                            <th>Precio ($)</th>
                                            <th>Stock</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productosNormales.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center text-muted py-3">
                                                    No hay productos con stock normal.
                                                </td>
                                            </tr>
                                        ) : (
                                            productosNormales.map(producto => (
                                                <tr key={producto.id}>
                                                    <td className="fw-bold">{producto.id}</td>
                                                    <td>
                                                        <img 
                                                            src={producto.imagen} 
                                                            alt={producto.nombre} 
                                                            style={{ width: "30px", height: "30px", objectFit: "cover", borderRadius: "4px" }} 
                                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/45?text=img'; }}
                                                        />
                                                    </td>
                                                    <td>{producto.nombre}</td>
                                                    <td>
                                                        <span className="badge bg-light text-dark border">
                                                            {producto.categoria?.nombreCategoria || 'Sin categoría'}
                                                        </span>
                                                    </td>
                                                    <td>{Number(producto.precio).toLocaleString("es-CL")}</td>
                                                    <td>
                                                        <span className="badge bg-success">{producto.stock} un.</span>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editarProducto(producto.id)}>Editar</button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Productos críticos */}
                            <div className="mt-4">
                                <h3 className={`mb-3 ${styles.mainTitle}`} style={{ fontSize: '1.25rem' }}>
                                    ⚠️ Productos en Stock Crítico (≤ 50 unidades)
                                </h3>
                                {productosCriticos.length === 0 ? (
                                    <p className="text-muted">No hay productos en estado crítico de stock.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Categoría</th>
                                                    <th>Stock Actual</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productosCriticos.map(producto => (
                                                    <tr key={producto.id}>
                                                        <td className="fw-bold">{producto.id}</td>
                                                        <td>
                                                            <img 
                                                                src={producto.imagen} 
                                                                alt={producto.nombre} 
                                                                style={{ width: "30px", height: "30px", objectFit: "cover", borderRadius: "4px" }} 
                                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/45?text=img'; }}
                                                            />
                                                        </td>
                                                        <td>{producto.nombre}</td>
                                                        <td>
                                                            <span className="badge bg-light text-dark border">
                                                                {producto.categoria?.nombreCategoria || 'Sin categoría'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-danger">{producto.stock} un.</span>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editarProducto(producto.id)}>Gestionar Stock</button>
                                                            <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>

            <ProductoModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={guardarProducto}
                formData={formData}
                onChange={handleChange}
                editandoId={editandoId}
                errores={errores}
                alerta={alerta}
            />
        </div>
    );
}