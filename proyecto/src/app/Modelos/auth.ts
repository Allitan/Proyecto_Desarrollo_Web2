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