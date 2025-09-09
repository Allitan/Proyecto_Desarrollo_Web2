'use client'
import React, { useState } from 'react'
import { useAuth } from '@/app/Providers/authProvider'
import { useRouter } from 'next/navigation'




export default function page() {
    const { token, usuario } =useAuth();
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [especie, setEspecie]= useState('');
    const [raza, setRaza] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [foto, setFoto] = useState('')

    const handleAgregarMascota = async (e: React.FormEvent)=> {
        e.preventDefault()

        if(!token || !usuario || !usuario.esDueño){
            alert('No tienes permiso para agregar mascotas');
            router.push('/dashboard')
            return;
        }

        const nuevaMascota = {
            nombre,
            especie,
            raza,
            edad: parseInt(edad),
            descripcion,
            foto,
            estado: 'disponible',
        }

        try{
            const response = await fetch('http://localhost:5000/api/mascota',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevaMascota),
            })

            if(response.ok){
                alert('Mascota agregada con exito')
                router.push('/mascotas')
            }else{
                const data = await response.json();
                alert(`Error al agregar la mascota: ${data.mensaje}`)
            }
        }catch(error){
            console.error('Error de red ', error);
            alert(`ocurrio un error al conectar con el servidor`)
        }
    }
  return (
      <div className="container mt-5">
          <h1 className="text-center mb-4">Agregar Nueva Mascota</h1>
          <div className="card mx-auto" style={{ maxWidth: '600px' }}>
              <div className="card-body">
                  <form onSubmit={handleAgregarMascota}>
                      <div className="mb-3">
                          <label className="form-label">Nombre</label>
                          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Edad</label>
                          <input type="number" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Especie (Perro, Gato, etc.)</label>
                          <input type="text" className="form-control" value={especie} onChange={(e) => setEspecie(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Raza</label>
                          <input type="text" className="form-control" value={raza} onChange={(e) => setRaza(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Descripción</label>
                          <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">URL de la Foto</label>
                          <input type="url" className="form-control" value={foto} onChange={(e) => setFoto(e.target.value)} required />
                      </div>
                      <button type="submit" className="btn btn-primary">Agregar Mascota</button>
                  </form>
              </div>
          </div>
      </div>
  )
}
