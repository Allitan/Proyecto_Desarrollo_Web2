import { createContext } from "react";

export const AuthContext = createContext({
    usuario: null,
    token: null,
    login: async (_email: string, _password: string) => false,
    logout: () => {},
    registro: async (_datosRegistro: { nombre: string; email: string; contraseña: string; esAdoptante: boolean; esDueno: boolean; }) => false,
    cargando: true
});