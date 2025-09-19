'use client'
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../Providers/authProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NuevaSolicitudData, Mascota, Solicitud } from "../Modelos/auth";
import Link from "next/link";

export default function DashboardPage() {
    const { usuario, token, cargando, socket } = useAuth();
    const router = useRouter();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [error, setError] = useState('');

    const fetchMascotasDueño = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch('http://localhost:5000/api/mascotas/disponibles', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.mensaje || 'Error al obtener tus mascotas.');
                return;
            }
            const data = await res.json();
            setMascotas(data);
        } catch (err) {
            console.error('Error de red o del servidor:', err);
            setError('Error de conexión con el servidor. Por favor, inténtalo de nuevo más tarde.');
        }
    }, [token]);

    const fetchMascotasDisponibles = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch('http://localhost:5000/api/mascotas/disponibles', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.mensaje || 'Error al obtener las mascotas disponibles.');
                return;
            }
            const data = await res.json();
            setMascotas(data);
        } catch (err) {
            console.error('Error de red o del servidor:', err);
            setError('Error de conexión con el servidor. Por favor, inténtalo de nuevo más tarde.');
        }
    }, [token]);

    const handleEliminarMascota = async (id_mascota: number) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/mascota/${id_mascota}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert('Mascota eliminada con éxito.');
                setMascotas(mascotas.filter(mascota => mascota.id_mascota !== id_mascota));
            } else {
                const errorData = await res.json();
                alert(errorData.mensaje || 'Error al eliminar la mascota.');
            }
        } catch (err) {
            console.error('Error de red o del servidor:', err);
            alert('Error de conexión. Intenta de nuevo más tarde.');
        }
    };
    
    const handleEditarMascota = (id_mascota: number) => {
        router.push(`/mascotas/editar?id=${id_mascota}`);
    };

    useEffect(() => {
        if (cargando) return;
        if (!usuario) {
            router.push('/');
            return;
        }

        if (usuario.esDueño) {
            fetchMascotasDueño();
        } else if (usuario.esAdoptante) {
            fetchMascotasDisponibles();
        }
    }, [cargando, usuario, token, router, fetchMascotasDueño, fetchMascotasDisponibles]);

    useEffect(() => {
        if (socket && usuario?.esDueño) {
            const handleNuevaSolicitud = (data: NuevaSolicitudData) => {
                alert(data.mensaje);
                setSolicitudes(prev => [data.solicitud, ...prev]);
            };
            socket.on('nueva_solicitud', handleNuevaSolicitud);
            return () => {
                socket.off('nueva_solicitud', handleNuevaSolicitud);
            };
        }
    }, [socket, usuario]);

    if (cargando) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    if (usuario?.esDueño) {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4" style={{ color: 'var(--color-azul)' }}>
                    Mascotas en Adopción
                </h1>
                <div className="text-end mb-3">
                    <Link href="/mascotas/agregar" className="btn text-white" style={{ backgroundColor: 'var(--color-verde)' }}>
                        + Agregar Mascota
                    </Link>
                </div>
                {mascotas.length === 0 ? (
                    <div className="text-center mt-5">
                        <div className="alert alert-info" style={{ backgroundColor: 'var(--color-azul)', color: 'white' }}>
                            Aún no has agregado ninguna mascota para adopción.
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {mascotas.map((mascota) => (
                            <div key={mascota.id_mascota} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm" style={{ border: '1px solid var(--color-gris-suave)' }}>
                                    <img src={mascota.foto} alt={`Foto de ${mascota.nombre}`} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{mascota.nombre}</h5>
                                        <p className="card-text">
                                            <strong>Raza:</strong> {mascota.raza} <br />
                                            <strong>Edad:</strong> {mascota.edad} años <br />
                                            <strong>Especie:</strong> {mascota.especie}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <button 
                                                className="btn btn-warning"
                                                onClick={() => handleEditarMascota(mascota.id_mascota)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => handleEliminarMascota(mascota.id_mascota)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (usuario?.esAdoptante) {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4" style={{ color: 'var(--color-azul)' }}>
                    Mascotas Disponibles para Adopción
                </h1>
                {mascotas.length === 0 ? (
                    <div className="text-center mt-5">
                        <div className="alert alert-info" style={{ backgroundColor: 'var(--color-azul)', color: 'white' }}>
                            En este momento no hay mascotas disponibles. Vuelve más tarde.
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {mascotas.map((mascota) => (
                            <div key={mascota.id_mascota} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm" style={{ border: '1px solid var(--color-gris-suave)' }}>
                                    <img src={mascota.foto} alt={`Foto de ${mascota.nombre}`} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{mascota.nombre}</h5>
                                        <p className="card-text">
                                            **Especie:** {mascota.especie}
                                            <br />
                                            **Raza:** {mascota.raza}
                                        </p>
                                        <button className="btn w-100 mt-2" style={{ backgroundColor: 'var(--color-verde)', color: 'white' }}>
                                            Adoptar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return null;
}