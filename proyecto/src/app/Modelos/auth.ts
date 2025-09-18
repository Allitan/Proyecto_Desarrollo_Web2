import { Key } from "readline"

export interface Usuario {
    id_usuario: number
    nombre: string
    email: string
    esAdoptante: boolean
    esDueño: boolean
}

export interface Plantilla {
    children: React.ReactNode
}

export interface Mascota {
  id: Key | null | undefined
  id_mascota: number;
  nombre: string;
  especie: string;
  raza: string | null;
  edad: number | null;
  descripcion: string | null;
  foto: string;
  estado: 'disponible' | 'pendiente' | 'adoptado';
  dueñoId: number;
}