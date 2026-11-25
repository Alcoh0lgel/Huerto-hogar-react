import { request } from "./client";

export const obtenerProductos = () => request("/producto");
export const obtenerProductoPorId = (id) => request(`/producto/${id}`);
export const crearProducto = (producto) => request("/producto", "POST", producto);
export const actualizarProducto = (id, producto) => request(`/producto/${id}`, "PUT", producto);
export const eliminarProductoApi = (id) => request(`/producto/${id}`, "DELETE");
export const obtenerCategorias = () => request("/categoria");