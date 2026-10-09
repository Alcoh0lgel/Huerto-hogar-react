import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/navbar/sidebaradmin';
import ProductoModal from '../../../components/navbar/modalcrudproductos';


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

export default function MenuAdmin() {
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

    useEffect(() => {
        localStorage.setItem("productosEstrellas", JSON.stringify(productos));
    }, [productos]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const abrirModalNuevoProducto = () => {
        setEditandoId(null);
        setFormData({ id: '', nombre: '', imagen: '', precio: '', stock: '', descripcion: '' });
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
            if (nuevosProductos.some(p => p.id === idNum)) {
                alert("El Id ya existe. Ingrese un ID unico");
                return;
            }
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
        setShowModal(false);
    };

    return (
        <div>
            <div className="d-flex flex-column flex-md-row min-vh-100">
                {/* Componente Sidebar independiente */}
                <AdminSidebar />

                <main className="flex-grow-1 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Gestión de Productos</h2>
                        <button className="btn btn-success" id="btnAgregarProducto" onClick={abrirModalNuevoProducto}>
                            + Agregar Producto
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped align-middle">
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

                            <tbody id="tablaProductosAdmin">
                                {productos.map(producto => (
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
                                            <span className={`badge ${producto.stock <= 10 ? 'bg-danger' : 'bg-success'}`}>
                                                {producto.stock} un.
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editarProducto(producto.id)}>Editar</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

      

            {/* Componente Modal independiente */}
            <ProductoModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={guardarProducto}
                formData={formData}
                onChange={handleChange}
                editandoId={editandoId}
            />
        </div>
    );
}