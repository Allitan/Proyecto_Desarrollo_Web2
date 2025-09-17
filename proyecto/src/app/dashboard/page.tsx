'use client'
import { useEffect, useState } from "react";
import { useAuth } from "../Providers/authProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NuevaSolicitudData, Mascota, Solicitud } from "../Modelos/auth";

export default function DashboardPage() {
    const { usuario, token, cargando, socket } = useAuth();
    const router = useRouter();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (cargando) return;
        if (!usuario) {
            router.push('/');
            return;
        }

        if (usuario.esDueño && token) {
            fetchSolicitudes();
        } 
        
        if (usuario.esAdoptante && token) {
            fetchMascotasDisponibles();
        }
    }, [cargando, usuario, token, router]);

    // **NUEVO** Hook para escuchar las notificaciones en tiempo real
    useEffect(() => {
        if (socket && usuario?.esDueño) {
            const handleNuevaSolicitud = (data: NuevaSolicitudData) => {
                alert(data.mensaje); // Muestra la alerta de la notificación
                // Añade la nueva solicitud a la lista sin recargar
                setSolicitudes(prev => [data.solicitud, ...prev]);
            };
            socket.on('nueva_solicitud', handleNuevaSolicitud);
            return () => {
                socket.off('nueva_solicitud', handleNuevaSolicitud);
            };
        }
    }, [socket, usuario]);

    const fetchSolicitudes = async () => {
        // ... (Tu código para obtener solicitudes)
    };

    const fetchMascotasDisponibles = async () => {
        // ... (Tu código para obtener mascotas)
    };

    if (cargando) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    if (usuario?.esDueño) {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Mascotas en Adopción</h1>
                {/* ... Tu código para mostrar mascotas y el botón para añadir nuevas */}
            </div>
        );
    }

    if (usuario?.esAdoptante) {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Mascotas Disponibles para Adopción</h1>
                {/* ... Tu código para mostrar mascotas disponibles y el botón para solicitar adopción */}
            </div>
        );
    }

    return null;
}