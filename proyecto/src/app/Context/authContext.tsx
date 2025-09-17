import { createContext } from "react";
import { Usuario } from "../Modelos/auth";
import { Socket } from "socket.io-client";

export const AuthContext = createContext({
    usuario: null as Usuario | null,
    token: null as string | null,
    login: async (email: string, contrasena: string) => false,
    logout: () => {},
    registro: async (datos: any) => false,
    cargando: true,
    socket: null as Socket | null
});