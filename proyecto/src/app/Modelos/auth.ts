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
    adoptanteId: number;
    mascotaId: number;
    estado: 'pendiente' | 'aceptada' | 'rechazada';
    createdAt: string;
}

export interface NuevaSolicitudData {
    adoptanteId: any
    mensaje: string;
    solicitud: Solicitud;
    mascota: Mascota;
}

export interface RespuestaSolicitudData {
    solicitudId: number
    mensaje: string;
    estado: 'aceptada' | 'rechazada';
    mascota: Mascota;
    dueño: Usuario;
}