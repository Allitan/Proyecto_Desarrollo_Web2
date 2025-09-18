'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "../Providers/authProvider";
import { useRouter } from "next/navigation";
import { NuevaSolicitudData } from "../Modelos/auth";
import Image from "next/image";

interface Solicitud {
    id_solicitud: number;
    estado: string;
    adoptante: {
        id_usuario: number;
        nombre: string;
    };
    mascota: {
        id_mascota: number;
        nombre: string;
        foto: string;
        estado: string;
    };
}

export default function SolicitudesRecibidasPage() {
    const { usuario, token, cargando, socket } = useAuth();
    const router = useRouter();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!cargando && (!usuario || !usuario.esDueño)) {
            router.push('/dashboard');
            return;
        }
        if (usuario && usuario.esDueño && token) {
            fetchSolicitudes();
        }
    }, [cargando, usuario, token, router]);

    // **NUEVO:** Escucha de notificaciones en tiempo real
    useEffect(() => {
        if (socket && usuario?.esDueño) {
            const handleNuevaSolicitud = (data: NuevaSolicitudData) => {
                const nuevaSolicitudConAdoptante = {
                    ...data.solicitud,
                    adoptante: {
                        id_usuario: data.adoptanteId,
                        nombre: 'Adoptante' // Ajustar si tienes el nombre del adoptante en la notificación
                    },
                    mascota: data.mascota
                };
                setSolicitudes(prev => [nuevaSolicitudConAdoptante, ...prev]);
            };

            socket.on('nueva_solicitud', handleNuevaSolicitud);
            return () => {
                socket.off('nueva_solicitud', handleNuevaSolicitud);
            };
        }
    }, [socket, usuario]);

    const fetchSolicitudes = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/solicitud/duenio', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.mensaje || 'Error al obtener las solicitudes');
                return;
            }
            const data = await res.json();
            setSolicitudes(data);
        } catch (err) {
            console.error('Error de red o del servidor:', err);
            setError('Error de conexión con el servidor. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const handleRespuesta = async (solicitudId: number, estado: 'aceptada' | 'rechazada') => {
        if (!token) return;
        try {
            const res = await fetch(`http://localhost:5000/api/solicitud/${solicitudId}/respuesta`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estado })
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.mensaje || `Error al ${estado === 'aceptada' ? 'aceptar' : 'rechazar'} la solicitud.`);
                return;
            }

            setSolicitudes(prev => 
                prev.map(sol => 
                    sol.id_solicitud === solicitudId ? { ...sol, estado } : sol
                )
            );
            alert(`Solicitud ${estado} exitosamente.`);

        } catch (err) {
            console.error(err);
            alert('Error al conectar con el servidor.');
        }
    };

    if (cargando) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">Error: {error}</div>;
    }

    if (solicitudes.length === 0) {
        return <div className="text-center mt-5">No has recibido solicitudes para tus mascotas.</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Solicitudes Recibidas</h1>
            <div className="row">
                {solicitudes.map((solicitud: Solicitud) => (
                    <div key={solicitud.id_solicitud} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Solicitud de: {solicitud.adoptante?.nombre}</h5>
                                <p className="card-text">Para: {solicitud.mascota.nombre}</p>
                                <p className={`card-text fw-bold ${solicitud.estado === 'pendiente' ? 'text-warning' : solicitud.estado === 'aceptada' ? 'text-success' : 'text-danger'}`}>
                                    Estado: {solicitud.estado}
                                </p>
                                {solicitud.estado === 'pendiente' && (
                                    <div className="d-flex justify-content-between mt-3">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleRespuesta(solicitud.id_solicitud, 'aceptada')}
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRespuesta(solicitud.id_solicitud, 'rechazada')}
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}