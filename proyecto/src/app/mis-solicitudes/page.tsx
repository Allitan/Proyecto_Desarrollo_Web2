'use client'
import React, { useState, useEffect, useCallback } from "react";
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

    const fetchMisSolicitudes = useCallback(async () => {
        if (!token || !usuario?.esAdoptante) {
            setCargandoSolicitudes(false);
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/solicitud/mis-solicitudes', {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.mensaje || 'Error al obtener tus solicitudes.');
                return;
            }
            const data = await res.json();
            setSolicitudes(data);
        } catch (err) {
            console.error('Error de red o del servidor:', err);
            setError('Error de conexión con el servidor. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setCargandoSolicitudes(true);
        }
    }, [token, usuario]);

    useEffect(() => {
        if (!cargando && (!usuario || !usuario.esAdoptante)) {
            alert('No tienes permiso para ver esta página.');
            router.push('/dashboard');
            return;
        }

        if (!cargando && usuario && usuario.esAdoptante && token) {
            fetchMisSolicitudes();
        }
    }, [cargando, usuario, token, router, fetchMisSolicitudes]);

    useEffect(() => {
        if (socket && usuario?.esAdoptante) {
            const handleRespuesta = (data: RespuestaSolicitudData) => {
                alert(data.mensaje);
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

    if (cargando || cargandoSolicitudes) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: 'var(--color-azul)' }}>
                Mis Solicitudes de Adopción
            </h1>
            <div className="row">
                {solicitudes.length > 0 ? (
                    solicitudes.map((solicitud) => (
                        <div key={solicitud.id} className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm" style={{ border: '1px solid var(--color-gris-suave)' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{solicitud.mascota?.nombre}</h5>
                                    <p className="card-text">
                                        **Estado:**
                                        <span className="fw-bold" style={{
                                            color: solicitud.estado === 'pendiente' 
                                                ? 'var(--color-amarillo)' 
                                                : solicitud.estado === 'aceptada' 
                                                    ? 'var(--color-verde)' 
                                                    : 'var(--color-naranja)' 
                                            }}>
                                                {solicitud.estado.toUpperCase()}
                                            </span>
                                        </p>
                                    <p className="card-text">**Fecha de Solicitud:** {new Date(solicitud.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <div className="alert alert-info mt-5" style={{ backgroundColor: 'var(--color-azul)', color: 'white' }}>
                            Aún no has enviado ninguna solicitud.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}