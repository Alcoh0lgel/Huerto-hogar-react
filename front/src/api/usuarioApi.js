import { request } from "./client";

export const obtenerUsuarios = () => request("/usuarios");
export const buscarUsuario = (id) => request(`/usuarios/${id}`);
export const agregarUsuario = (usuario) => request("/usuarios", "POST", usuario);
export const actualizarUsuario = (id, usuario) => request(`/usuarios/${id}`, "PUT", usuario);
export const eliminarUsuario = (id) => request(`/usuarios/${id}`, "DELETE");