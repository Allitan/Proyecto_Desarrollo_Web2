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
  especie: string;
  raza: string | null;
  edad: number | null;
  descripcion: string | null;
  foto: string;
  estado: 'disponible' | 'pendiente' | 'adoptado';
  dueñoId: number;
}

export interface Solicitud {
  id: number;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  mascotaId: number;
  adoptanteId: number;
  createdAt: string;
  updatedAt: string;
  mascota?: {
    id_mascota: number;
    nombre: string;
    foto: string;
    especie: string;
    raza: string;
  };
  adoptante?: {
    id_usuario: number;
    nombre: string;
  };
}