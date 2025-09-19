'use client';

import React, { useState, useEffect } from 'react'
import { useAuth } from '../Providers/authProvider'
import { Solicitud } from '../Modelos/auth'

export default function SolicitudesRecibidas() {
    const { usuario,token } =useAuth()
    const [solicitudes, setSolicitudes]=useState<Solicitud[]>([])
    const [cargando, setCargando] =useState(true)
    const [error, setError] =useState<string | null>(null)

    const fetchSolicitudes = async () =>{
        if (!token || !usuario?.esDueño) {
            setCargando(false);
            return;
        }

        try {
            const response =await fetch(`http://localhost:5000/api/solicitudes/duenio`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok){
                throw new Error('Error al obtener las solicitudes')
            }

            const data=await response.json();
            setSolicitudes(data);
        } catch (err) {
            setError('No se pudieron cargar las solicitudes.');
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    const handleRespuestaSolicitud= async (solicitudId: number, estado: 'aceptada' | 'rechazada') => {
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

            const data = await response.json()
            if (response.ok) {
                alert(`Solicitud ${estado} con éxito.`);
                fetchSolicitudes();
            } else {
                alert(`Error al procesar la solicitud: ${data.mensaje}`);
            }
        } catch (error) {
            console.error('Error de red al responder a la solicitud:', error);
            alert('Ocurrió un error al conectar con el servidor');
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, [token, usuario]);

    if (cargando) {
        return <div className="text-center">Cargando solicitudes...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
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
                <p className="text-muted">No tienes solicitudes pendientes</p>
            )}
        </div>
    );
}