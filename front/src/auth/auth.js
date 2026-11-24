const KEY = "token_huerto";
const ROL_KEY = "rol_huerto";

export const getToken = () => localStorage.getItem(KEY);
export const guardarToken = (token) => localStorage.setItem(KEY, token);

export const getRol = () => localStorage.getItem(ROL_KEY);
export const guardarRol = (rol) => localStorage.setItem(ROL_KEY, rol);

export const cerrarSesion = () => {
  localStorage.removeItem(KEY);
  localStorage.removeItem(ROL_KEY);
};

export const estaLogueado = () => getToken() !== null;