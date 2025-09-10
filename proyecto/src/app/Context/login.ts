import { createContext, useContext } from 'react'

export interface User {
  id_usuario: string
  nombre: string
  email: string
  telefono: string
  direccion: string
  esAdoptante: boolean
  esDueño: boolean
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  registro: (nombre: string, email: string, password: string, esAdoptante: boolean, esDueno: boolean) => Promise<boolean>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
