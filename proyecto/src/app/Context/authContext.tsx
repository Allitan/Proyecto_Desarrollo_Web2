import { createContext } from "react";

// Modelo de Usuario
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  esAdoptante: boolean;
  esDueno: boolean;
}

// Tipo del AuthContext
interface AuthContextType {
  usuario: Usuario | null;
  token: string | null; // ahora puede ser string o null
  login: (_email: string, _password: string) => Promise<boolean>;
  logout: () => void;
  registro: (_datosRegistro: {
    nombre: string;
    email: string;
    contraseña: string;
    esAdoptante: boolean;
    esDueno: boolean;
  }) => Promise<boolean>;
  cargando: boolean;
}

// Contexto inicial
export const AuthContext = createContext<AuthContextType>({
  usuario: null,
  token: null,
  login: async () => false,
  logout: () => {},
  registro: async () => false,
  cargando: false,
});
