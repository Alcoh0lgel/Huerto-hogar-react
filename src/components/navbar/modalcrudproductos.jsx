import React from 'react';

export default function ProductoModal({ show, onClose, onSubmit, formData, onChange, editandoId }) {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" id="modalProducto" tabIndex="-1" aria-labelledby="modalProductoLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalProductoLabel">
                            {editandoId !== null ? "Editar Producto" : "Nuevo producto"}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>

                    <form id="formProducto" onSubmit={onSubmit}>
                        <div className="modal-body text-start">
                            <div className="mb-3">
                                <label htmlFor="prodId" className="form-label">ID</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="prodId" 
                                    name="id"
                                    value={formData.id}
                                    onChange={onChange}
                                    disabled={editandoId !== null}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prodNombre" className="form-label">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="prodNombre" 
                                    name="nombre"
                                    maxLength="100" 
                                    value={formData.nombre}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prodImagen" className="form-label">Enlace de Imagen</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="prodImagen"
                                    name="imagen"
                                    placeholder="../img" 
                                    value={formData.imagen}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prodPrecio" className="form-label">Precio($)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="prodPrecio" 
                                    name="precio"
                                    min="0" 
                                    value={formData.precio}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prodStock" className="form-label">Stock</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="prodStock" 
                                    name="stock"
                                    min="0" 
                                    step="1" 
                                    value={formData.stock}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prodDescripcion" className="form-label">Descripcion</label>
                                <textarea 
                                    className="form-control" 
                                    id="prodDescripcion" 
                                    name="descripcion"
                                    rows="2"
                                    value={formData.descripcion}
                                    onChange={onChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}