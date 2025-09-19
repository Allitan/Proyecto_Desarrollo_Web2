'use client'
import React, { useState, useEffect } from "react";
import { useAuth } from "../Providers/authProvider";
import { useRouter } from "next/navigation";
import { Solicitud } from "../Modelos/auth";

export default function DashboardPage() {
    const { usuario, cargando, token } = useAuth();
    const router = useRouter();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargandoSolicitudes, setCargandoSolicitudes] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cargando && !usuario) {
            router.push('/');
            return;
        }

        const fetchSolicitudes = async () => {
            if (!token || (!usuario?.esDueño && !usuario?.esAdoptante)) {
                setCargandoSolicitudes(false);
                return;
            }

            try {
                let endpoint = '';
                if (usuario.esDueño) {
                    endpoint = 'solicitudes/duenio';
                } else if (usuario.esAdoptante) {
                    endpoint = 'solicitudes/mis-solicitudes';
                }

                const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener las solicitudes.');
                }

                const data = await response.json();
                setSolicitudes(data);
            } catch (err) {
                setError('No se pudieron cargar las solicitudes.');
                console.error(err);
            } finally {
                setCargandoSolicitudes(false);
            }
        };

        fetchSolicitudes();
    }, [cargando, usuario, token, router]);

    const handleRespuestaSolicitud = async (solicitudId: number, estado: 'aceptada' | 'rechazada') => {
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:5000/api/solicitudes/${solicitudId}/respuesta`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estado }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Solicitud ${estado} con éxito.`);
                // Actualizar la lista de solicitudes después de la respuesta
                setSolicitudes(solicitudes.map(sol => sol.id === solicitudId ? { ...sol, estado } : sol));
            } else {
                alert(`Error al procesar la solicitud: ${data.mensaje}`);
            }
        } catch (error) {
            console.error('Error de red al responder a la solicitud:', error);
            alert('Ocurrió un error al conectar con el servidor.');
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!usuario) {
        return null;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bienvenido, {usuario.nombre}</h2>
            <p>Tu rol es: {usuario.esAdoptante ? 'Adoptante' : ''} {usuario.esDueño ? 'Dueño' : ''}</p>

            {cargandoSolicitudes ? (
                <div className="text-center">Cargando solicitudes...</div>
            ) : (
                <>
                    {usuario.esDueño && (
                        <div className="mt-5">
                            <h3>Solicitudes Recibidas</h3>
                            {solicitudes.length > 0 ? (
                                <div className="list-group">
                                    {solicitudes.map(solicitud => (
                                        <div key={solicitud.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-1">Solicitud para {solicitud.mascota?.nombre}</h5>
                                                <p className="mb-1">Enviada por: {solicitud.adoptante?.nombre}</p>
                                                <span className={`badge ${solicitud.estado === 'pendiente' ? 'bg-warning' : solicitud.estado === 'aceptada' ? 'bg-success' : 'bg-danger'}`}>
                                                    {solicitud.estado}
                                                </span>
                                            </div>
                                            {solicitud.estado === 'pendiente' && (
                                                <div>
                                                    <button onClick={() => handleRespuestaSolicitud(solicitud.id, 'aceptada')} className="btn btn-success me-2">Aceptar</button>
                                                    <button onClick={() => handleRespuestaSolicitud(solicitud.id, 'rechazada')} className="btn btn-danger">Rechazar</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">No tienes solicitudes pendientes.</p>
                            )}
                        </div>
                    )}

                    {usuario.esAdoptante && (
                        <div className="mt-5">
                            <h3>Mis Solicitudes de Adopción</h3>
                            {solicitudes.length > 0 ? (
                                <div className="list-group">
                                    {solicitudes.map(solicitud => (
                                        <div key={solicitud.id} className="list-group-item">
                                            <h5>Para: {solicitud.mascota?.nombre}</h5>
                                            <p>Estado:
                                                <span className={`badge ${solicitud.estado === 'pendiente' ? 'bg-warning' : solicitud.estado === 'aceptada' ? 'bg-success' : 'bg-danger'}`}>
                                                    {solicitud.estado}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">No has enviado ninguna solicitud de adopción.</p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}