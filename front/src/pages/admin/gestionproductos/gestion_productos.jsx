import React, { useState, useEffect } from 'react';
import styles from './gestion_productos.module.css';
import AdminSidebar from '../../../components/sidebar/sidebaradmin';
import ProductoModal from '../../../components/modal/modalcrudproductos';

const productosEstrellaIniciales = [
    {
        "id": 1,
        "nombre": "Manzana Fuji",
        "imagen": "../img/manzana.png",
        "precio": 1200,
        "stock": 150,
        "descripcion": "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres."
    },
    {
        "id": 2,
        "nombre": "Naranjas Valencia",
        "imagen": "../img/naranja.png",
        "precio": 1000,
        "stock": 200,
        "descripcion": "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes."
    },
    {
        "id": 3,
        "nombre": "Plátanos Cavendish",
        "imagen": "../img/platano.png",
        "precio": 800,
        "stock": 250,
        "descripcion": "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético."
    },
    {
        "id": 4,
        "nombre": "Zanahorias Orgánicas",
        "imagen": "../img/zanahoria.png",
        "precio": 900,
        "stock": 100,
        "descripcion": "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins."
    },
    {
        "id": 5,
        "nombre": "Espinacas Frescas",
        "imagen": "../img/espinaca.png",
        "precio": 700,
        "stock": 80,
        "descripcion": "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes."
    },
    {
        "id": 6,
        "nombre": "Pimientos Tricolores",
        "imagen": "../img/pimenton.png",
        "precio": 1500,
        "stock": 120,
        "descripcion": "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos."
    }
];

// Función de validación adaptada al estilo solicitado
const validarProducto = (datos, productosExistentes, editandoId) => {
    const errores = {};

    const idStr = String(datos.id).trim();
    const idNum = parseInt(datos.id);
    if (idStr === '') {
        errores.id = 'El ID es obligatorio.';
    } else if (isNaN(idNum) || idNum <= 0) {
        errores.id = 'El ID debe ser un número mayor a 0.';
    } else if (editandoId === null && productosExistentes.some(p => p.id === idNum)) {
        errores.id = 'El ID ya existe. Ingrese un ID único.';
    }

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

    return errores;
};

export default function GestionProductos() {
    const [productos, setProductos] = useState(() => {
        let guardados = localStorage.getItem("productosEstrellas");
        if (guardados) {
            try {
                let parsed = JSON.parse(guardados);
                if (parsed && parsed.length > 0) return parsed;
            } catch (e) {
                console.error(e);
            }
        }
        localStorage.setItem("productosEstrellas", JSON.stringify(productosEstrellaIniciales));
        return productosEstrellaIniciales;
    });

    const [showModal, setShowModal] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        imagen: '',
        precio: '',
        stock: '',
        descripcion: ''
    });

    const [errores, setErrores] = useState({});
    const [alerta, setAlerta] = useState({
        mostrar: false,
        variant: 'success',
        msg: '',
    });

    useEffect(() => {
        localStorage.setItem("productosEstrellas", JSON.stringify(productos));
    }, [productos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const abrirModalNuevoProducto = () => {
        setEditandoId(null);
        setFormData({ id: '', nombre: '', imagen: '', precio: '', stock: '', descripcion: '' });
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
            imagen: producto.imagen,
            precio: producto.precio,
            stock: producto.stock,
            descripcion: producto.descripcion || ''
        });
        setErrores({});
        setAlerta({ mostrar: false, variant: 'success', msg: '' });
        setShowModal(true);
    };

    const eliminarProducto = (id) => {
        if (window.confirm(`¿Seguro que deseas eliminar el producto ${id}?`)) {
            let productosActualizados = productos.filter(p => p.id !== id);
            setProductos(productosActualizados);
        }
    };

    const guardarProducto = (gp) => {
        gp.preventDefault();
        const nuevosErrores = validarProducto(formData, productos, editandoId);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            setAlerta({
                mostrar: true,
                variant: 'danger',
                msg: 'Revisa los campos marcados antes de guardar.',
            });
            return;
        }

        const idNum = parseInt(formData.id);
        const precioNum = parseFloat(formData.precio);
        const stockNum = parseInt(formData.stock);

        let nuevosProductos = [...productos];
        if (editandoId !== null) {
            nuevosProductos = nuevosProductos.map(p => {
                if (p.id === parseInt(editandoId)) {
                    return { 
                        id: p.id, 
                        nombre: formData.nombre.trim(), 
                        imagen: formData.imagen.trim(), 
                        precio: precioNum, 
                        stock: stockNum, 
                        descripcion: formData.descripcion.trim() 
                    };
                }
                return p;
            });
        } else {
            nuevosProductos.push({
                id: idNum, 
                nombre: formData.nombre.trim(), 
                imagen: formData.imagen.trim(), 
                precio: precioNum, 
                stock: stockNum, 
                descripcion: formData.descripcion.trim()
            });
        }

        setProductos(nuevosProductos);
        setAlerta({
            mostrar: true,
            variant: 'success',
            msg: '¡Producto guardado con éxito! 🌿',
        });

        setTimeout(() => {
            setShowModal(false);
            setAlerta((prev) => ({ ...prev, mostrar: false }));
        }, 1500);
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

                    <div className="table-responsive mb-5">
                        <table className={`table table-striped align-middle ${styles.tableCustom}`}>
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio ($)</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosNormales.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-3">
                                            No hay productos con stock normal. Todos se encuentran en nivel crítico.
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
                                            <td>{producto.precio.toLocaleString("cl-CL")}</td>
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