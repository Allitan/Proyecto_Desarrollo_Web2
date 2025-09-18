import { createContext } from "react";

export const AuthContext = createContext({
    usuario: null,
    token: null,
    login: async () => false,
    logout: () => {},
    registro: async () => false,
    cargando: true
}); 