import React from 'react';
import RegionesComunas from '../../data/regiones';

export default function UsuarioModal({ show, onClose, onSubmit, formData, onChange, editandoRun }) {
    if (!show) return null;

    const regionElegida = RegionesComunas.find((r) => r.region === formData.region);
    const comunas = regionElegida ? regionElegida.comunas : [];

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">
                            {editandoRun !== null ? "Editar Usuario" : "Nuevo Usuario"}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="modal-body text-start">
                            <div className="mb-3">
                                <label className="form-label">RUN (sin puntos ni guion)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="run"
                                    maxLength={9}
                                    value={formData.run}
                                    onChange={onChange}
                                    disabled={editandoRun !== null}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombres</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="nombre"
                                    maxLength={50}
                                    value={formData.nombre}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="apellido"
                                    maxLength={100}
                                    value={formData.apellido}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="correo"
                                    maxLength={100}
                                    value={formData.correo}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Región</label>
                                    <select
                                        className="form-select"
                                        name="region"
                                        value={formData.region}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="" disabled>Selecciona</option>
                                        {RegionesComunas.map((item) => (
                                            <option key={item.region} value={item.region}>{item.region}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Comuna</label>
                                    <select
                                        className="form-select"
                                        name="comuna"
                                        value={formData.comuna}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="" disabled>Selecciona</option>
                                        {comunas.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="direccion"
                                    maxLength={300}
                                    value={formData.direccion}
                                    onChange={onChange}
                                    required 
                                />
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