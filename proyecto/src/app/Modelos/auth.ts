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
  id_mascota: number;
  nombre: string;
  edad: number;
  tipo: string;
  raza: string;
  descripcion: string;
  foto: string;
  disponible: boolean;
  id_dueno: number;
}