import { createContext } from "react";
import { Usuario } from '../Modelos/auth';

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (email: string, contrasena: string) => Promise<boolean>;
  logout: () => void;
  registro: (datos: any) => Promise<boolean>;
  cargando: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  usuario: null,
  token: null,
  login: async () => false,
  logout: () => {},
  registro: async () => false,
  cargando: true
});
