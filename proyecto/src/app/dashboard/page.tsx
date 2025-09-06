'use client'
import React from "react"
import { useAuth } from "../Providers/authProvider"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const { usuario, cargando } = useAuth();
    const router = useRouter();

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!usuario) {
        router.push('/');
        return null;
    }

    return (
        <div className="container mt-5">
            <h2>Bienvenido, {usuario.nombre}</h2>
<<<<<<< Updated upstream
            <p>Has iniciado sesión exitosamente</p>
            <p>Tu rol es: {usuario.esAdoptante ? 'Adoptante' : ''} {usuario.esDueño ? 'Dueño' : ''}</p>
=======
            <p>Has iniciado sesión exitosamente.</p>
            <p>Tu rol es: {usuario.esAdoptante ? 'Adoptante' : ''} {usuario.esDueno ? 'Dueño' : ''}</p>
>>>>>>> Stashed changes
        </div>
    );
}