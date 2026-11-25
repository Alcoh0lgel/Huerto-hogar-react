import { request } from "./client";

export const getMisBoletas = () => request("/boleta/mis-boletas");
export const getDetallesBoleta = (idBoleta) => request(`/detalleBoleta/boleta/${idBoleta}`);
export const crearBoleta = (boleta) => request("/boleta", "POST", boleta);
export const crearDetalleBoleta = (detalle) => request("/detalleBoleta", "POST", detalle);