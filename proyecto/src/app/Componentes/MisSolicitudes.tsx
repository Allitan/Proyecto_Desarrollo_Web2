'use client';

import React, { useState, useEffect } from 'react'
import { useAuth } from '../Providers/authProvider';
import { Solicitud } from '../Modelos/auth'

export default function MisSolicitudes() {
    const { usuario, token, cargando: authCargando } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMisSolicitudes = async () => {
            if (!token || !usuario?.esAdoptante) {
                setCargando(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/solicitudes/mis-solicitudes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener sus solicitudes.');
                }

                const data = await response.json();
                setSolicitudes(data);
            } catch (err) {
                setError('No se pudieron cargar sus solicitudes.');
                console.error(err);
            } finally {
                setCargando(false);
            }
        };

        if (!authCargando && usuario?.esAdoptante) {
            fetchMisSolicitudes();
        }

    }, [token, usuario, authCargando]);

    if (cargando) {
        return <div className="text-center">Cargando mis solicitudes...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
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
                <p className="text-muted">No has enviado ninguna solicitud de adopción</p>
            )}
        </div>
    );
}