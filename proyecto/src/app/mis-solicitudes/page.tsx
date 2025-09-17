'use client'
import React, { useState, useEffect } from "react";
import { useAuth } from "../Providers/authProvider";
import { useRouter } from "next/navigation";
import { Mascota, RespuestaSolicitudData } from "../Modelos/auth";

interface Solicitud {
    id: number;
    adoptanteId: number;
    mascotaId: number;
    estado: 'pendiente' | 'aceptada' | 'rechazada';
    createdAt: string;
    mascota: Mascota;
}

export default function MisSolicitudesPage() {
    const { usuario, token, cargando, socket } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargandoSolicitudes, setCargandoSolicitudes] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!cargando && (!usuario || !usuario.esAdoptante)) {
            alert('No tienes permiso para ver esta página.');
            router.push('/dashboard');
            return;
        }
        if (usuario && usuario.esAdoptante && token) {
            fetchMisSolicitudes();
        }
    }, [cargando, usuario, token, router]);

    // **NUEVO** Hook para escuchar las respuestas
    useEffect(() => {
        if (socket && usuario?.esAdoptante) {
            const handleRespuesta = (data: RespuestaSolicitudData) => {
                alert(data.mensaje); // Muestra la alerta de la respuesta
                // Actualiza el estado de la solicitud en la lista
                setSolicitudes(prev => 
                    prev.map(sol => 
                        sol.id === data.solicitudId ? { ...sol, estado: data.estado } : sol
                    )
                );
            };
            socket.on('respuesta_solicitud', handleRespuesta);
            return () => {
                socket.off('respuesta_solicitud', handleRespuesta);
            };
        }
    }, [socket, usuario]);

    const fetchMisSolicitudes = async () => {
        // ... (Tu código para obtener solicitudes)
    };

    if (cargando || cargandoSolicitudes) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Mis Solicitudes de Adopción</h1>
            {/* ... Tu código para mostrar las solicitudes */}
        </div>
    );
}