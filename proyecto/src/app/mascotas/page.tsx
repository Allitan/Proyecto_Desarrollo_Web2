'use client'
import React, { useState, useEffect} from "react"
import { Mascota } from "../Modelos/auth"
import { useAuth } from "../Providers/authProvider"
import { useRouter } from "next/navigation"

export default function MascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchMascotas() {
      if (!token) {
        router.push('/');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/mascota', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las mascotas.');
        }

        const data = await response.json();
        setMascotas(data);
      } catch (err) {
        setError('No se pudo cargar la lista de mascotas.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    }

    fetchMascotas();
  }, [token, router]);

  if (cargando) {
    return <div className="text-center mt-5">Cargando mascotas...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Mascotas Disponibles</h1>
      <div className="row">
        {mascotas.map((mascota) => (
          <div key={mascota.id_mascota} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={mascota.foto} className="card-img-top" alt={`Foto de ${mascota.nombre}`} style={{ height: '250px', objectFit: 'cover' }}/>
              <div className="card-body">
                <h5 className="card-title">{mascota.nombre}</h5>
                <p className="card-text">
                  <strong>Raza:</strong> {mascota.raza} <br/>
                  <strong>Edad:</strong> {mascota.edad} años <br/>
                  <strong>Tipo:</strong> {mascota.tipo}
                </p>
                <p className="card-text">{mascota.descripcion}</p>
                <button className="btn btn-primary">Adoptar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}