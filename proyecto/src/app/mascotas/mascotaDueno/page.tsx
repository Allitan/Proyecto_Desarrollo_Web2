'use client';

import React, { useState, useEffect } from "react";
import { Mascota } from "@/app/Modelos/auth";
import { useAuth } from "@/app/Providers/authProvider";

const MascotaDuenoPage: React.FC = () => {
    const { token, usuario } = useAuth();
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [cargando, setCargando] = useState(true);

    const fetchMascotas = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/mascota/duenio", {
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await response.json();
            setMascotas(data);
        } catch (error) {
            console.error("Error al cargar mascotas:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (token && usuario?.esDueño) fetchMascotas();
    }, [token, usuario]);


    if (cargando) return <p>Cargando mascotas...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Mis Mascotas en Adopción</h2>
            {mascotas.length === 0 ? (
                <p>No tienes mascotas registradas</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {mascotas.map((mascota) => (
                        <div key={mascota.id_mascota} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '250px' }}>
                            <h3>{mascota.nombre}</h3>
                            <p><strong>Especie:</strong> {mascota.especie}</p>
                            <p><strong>Raza:</strong> {mascota.raza}</p>
                            <p><strong>Edad:</strong> {mascota.edad}</p>
                            <p><strong>Estado:</strong> {mascota.estado}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MascotaDuenoPage;
