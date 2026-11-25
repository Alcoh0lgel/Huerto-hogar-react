import { request } from "./client";

export const obtenerUsuarios = () => request("/usuarios");
export const buscarUsuario = (id) => request(`/usuarios/${id}`);
export const agregarUsuario = (usuario) => request("/usuarios", "POST", usuario);
export const actualizarUsuario = (id, usuario) => request(`/usuarios/${id}`, "PUT", usuario);
export const eliminarUsuario = (id) => request(`/usuarios/${id}`, "DELETE");

// Nuevas funciones para el perfil del usuario logueado
export const getPerfilUsuario = () => request("/usuarios/perfil");
export const actualizarPerfilUsuario = (datos) => request("/usuarios/perfil", "PUT", datos);
