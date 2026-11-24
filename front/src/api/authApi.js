import { request } from "./client";

export const login = (correo, password) => request("/auth/login", "POST", { correo, password });
export const registro = (usuario) => request("/auth/registro", "POST", usuario);