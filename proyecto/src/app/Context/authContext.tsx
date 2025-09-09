import { createContext } from "react";
import { Usuario } from "../Modelos/auth";

export const AuthContext = createContext({
    usuario: null,
    token: null,
    login: async () => false,
    logout: () => {},
    registro: async () => false,
    cargando: true
});