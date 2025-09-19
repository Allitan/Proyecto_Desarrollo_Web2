'use client'
import React from "react";
import { useAuth } from "../Providers/authProvider";
import { useRouter } from "next/navigation";
import SolicitudesRecibidas from "../Componentes/SolicitudesRecibidas"
import MisSolicitudes from "../Componentes/MisSolicitudes"
import Link from "next/link";

export default function DashboardPage() {
    const { usuario, cargando } = useAuth();
    const router = useRouter();

    if (cargando){
        return <div>Cargando...</div>
    }
    if (!usuario) {
        router.push('/')
        return null;
    }
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bienvenido, {usuario.nombre}</h2>
            <p>Tu rol es: {usuario.esAdoptante ? 'Adoptante' : ''} {usuario.esDueño ? 'Dueño' : ''}</p>
            
            {usuario.esDueño && (
                <>
                    <Link href="/mascotas/mascotaDueno">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ver mis mascotas registradas
                        </button>
                    </Link>
                    <SolicitudesRecibidas />
                </>
            )}
            
            {usuario.esAdoptante && (
                <MisSolicitudes />
            )}
        </div>
    );
}