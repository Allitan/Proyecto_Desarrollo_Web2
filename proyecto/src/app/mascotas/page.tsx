'use client'
import React, { useState, useEffect, ReactNode} from "react"
import { useAuth } from "../Providers/authProvider"
import { useRouter } from "next/navigation"
import  styles from "./page.module.css"; // o el nombre correcto

interface Mascota {
  raza: ReactNode;
  descripcion: ReactNode;
  edad: ReactNode;
  especie: ReactNode;
  id_mascota: number;
  nombre: string;
  foto: string;
}
export default function MascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([
    {
      id_mascota: 1, nombre: "Firulais", foto: "/images/firulais.jpg",
      raza: undefined,
      descripcion: undefined,
      edad: undefined,
      especie: undefined
    },
    {
      id_mascota: 2, nombre: "Michi", foto: "/images/michi.jpg",
      raza: undefined,
      descripcion: undefined,
      edad: undefined,
      especie: undefined
    },
  ]);

  const [query, setQuery] = useState("");
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [] = useState<any[]>([]); 
  const { token } = useAuth();


  // Función que elimina (puedes renombrarla a onDelete si prefieres)
  const onDelete = (id: number) => {
    console.log("Eliminando mascota con id:", id);
    setMascotas((prev) => prev.filter((m) => m.id_mascota !== id));
  };

  // Ejemplo de handler para Adoptar
  const onAdopt = (id: number) => {
    console.log("Adoptando mascota con id:", id);
    alert(`Has adoptado la mascota con id ${id}`);
    // Aquí podrías hacer un fetch a tu API para registrar la adopción
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

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
  function onEdit(id: number) {
   router.push(`/mascotas/editar/${id}`);
  }


  return (  
    <div className="container mt-5">
      <h1 className="text-center mb-4">Mascotas Disponibles</h1>
       <form onSubmit={handleSubmit} className="d-flex col-12 col-sm-3 offset-md-9 mb-4">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
        </form>
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
                  <strong>Especie:</strong> {mascota.especie}
                </p>
                <p className="card-text">{mascota.descripcion}</p>
                <button 
                className="col-12 col-mt-3 mb-3 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"  
                onClick={() => onEdit(mascota.id_mascota)} 
                >
                  Editar
                </button>
                <button className="col-12 col-mt-3 md-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"  onClick={() => onDelete(mascota.id_mascota)} >
                  Eliminar
                </button>
                {/* Botón Adoptar con handler */}
                <button
                  className="col-12 col-mt-3  mt-3 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                  onClick={() => onAdopt(mascota.id_mascota)}
                >
                  Adoptar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
}
