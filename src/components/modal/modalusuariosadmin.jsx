import React from 'react';
import RegionesComunas from '../../data/regiones';
import App_alert from "../../components/alerts/alertas";

export default function UsuarioModal({ show, onClose, onSubmit, formData, onChange, editandoRun, errores, alerta, cerrarAlert }) {
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
                            {/* Alerta general dentro del modal */}
                            <div className="mb-3">
                                <App_alert 
                                    mostrarAlert={alerta.mostrar} 
                                    cerrarAlert={cerrarAlert} 
                                    variant={alerta.variant} 
                                    msgAlert={alerta.msg} 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">RUN (sin puntos ni guion)</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errores.run ? 'is-invalid' : ''}`} 
                                    name="run"
                                    maxLength={9}
                                    value={formData.run}
                                    onChange={onChange}
                                    disabled={editandoRun !== null}
                                />
                                {errores.run && <div className="invalid-feedback">{errores.run}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Nombres</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} 
                                    name="nombre"
                                    maxLength={50}
                                    value={formData.nombre}
                                    onChange={onChange}
                                />
                                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errores.apellido ? 'is-invalid' : ''}`} 
                                    name="apellido"
                                    maxLength={50}
                                    value={formData.apellido}
                                    onChange={onChange}
                                />
                                {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    className={`form-control ${errores.correo ? 'is-invalid' : ''}`} 
                                    name="correo"
                                    maxLength={100}
                                    value={formData.correo}
                                    onChange={onChange}
                                />
                                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    className={`form-control ${errores.password ? 'is-invalid' : ''}`} 
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                />
                                {errores.password && <div className="invalid-feedback">{errores.password}</div>}
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
                                        className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                                        name="region"
                                        value={formData.region}
                                        onChange={onChange}
                                    >
                                        <option value="" disabled>Selecciona</option>
                                        {RegionesComunas.map((item) => (
                                            <option key={item.region} value={item.region}>{item.region}</option>
                                        ))}
                                    </select>
                                    {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Comuna</label>
                                    <select
                                        className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                                        name="comuna"
                                        value={formData.comuna}
                                        onChange={onChange}
                                    >
                                        <option value="" disabled>Selecciona</option>
                                        {comunas.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errores.direccion ? 'is-invalid' : ''}`} 
                                    name="direccion"
                                    maxLength={200}
                                    value={formData.direccion}
                                    onChange={onChange}
                                />
                                {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
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