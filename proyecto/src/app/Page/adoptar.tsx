"use client"
import { useState, useEffect, Key } from 'react'
import Navigation from '../components/Navigation'
import MascotaCard from '../components/MascotaCard'
import FiltroMascotas from '../components/FiltroMascotas'
import styles from '../styles/Adoptar.module.css'

type Pet = {
  id: Key | null | undefined
  id_mascota: string
  nombre: string
  especie: string
  raza: string
  edad: number
  tamaño: string
  genero: string
  descripcion: string
  foto: string
  vacunado: boolean
  esterilizado: boolean
  ubicacion: string
  dueño_id: string
  estado: 'disponible' | 'pendiente' | 'adoptado'
}

export default function Adoptar() {
  const [pets, setPets] = useState<Pet[]>([])
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    species: '',
    size: '',
    age: '',
    location: ''
  })

  useEffect(() => {
    fetchPets()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [pets, filters])

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets')
      const data = await response.json()
      if (data.success) {
        setPets(data.pets.filter((pet: Pet) => pet.estado === 'disponible'))
      }
    } catch (error) {
      console.error('Error al cargar mascotas:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = pets

    if (filters.species) {
      filtered = filtered.filter(pet => pet.especie === filters.species)
    }
    if (filters.size) {
      filtered = filtered.filter(pet => pet.tamaño === filters.size)
    }
    if (filters.age) {
      const ageRange = filters.age.split('-')
      if (ageRange.length === 2) {
        const min = parseInt(ageRange[0])
        const max = parseInt(ageRange[1])
        filtered = filtered.filter(pet => pet.edad >= min && pet.edad <= max)
      }
    }
    if (filters.location) {
      filtered = filtered.filter(pet => 
        pet.ubicacion.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    setFilteredPets(filtered)
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.loading}>Cargando mascotas...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>Mascotas en Adopción</h1>
        
        <div className={styles.content}>
          <FiltroMascotas filters={filters} setFilters={setFilters} />
          
          <div className={styles.petsGrid}>
            {filteredPets.length > 0 ? (
              filteredPets.map(pet => (
                <MascotaCard
                  key={pet.id}
                  pet={{
                    id: pet.id,
                    id_mascota: pet.id_mascota,
                    nombre: pet.nombre,
                    especie: pet.especie,
                    raza: pet.raza,
                    edad: pet.edad,
                    tamaño: pet.tamaño,
                    genero: pet.genero,
                    descripcion: pet.descripcion,
                    foto: pet.foto,
                    vacunado: pet.vacunado,
                    esterilizado: pet.esterilizado,
                    ubicacion: pet.ubicacion,
                    dueño_id: pet.dueño_id,
                    estado: pet.estado,
                    neutered: pet.esterilizado,
                    // Map Spanish property names to English as expected by MascotaCard's Pet type
                    photo: pet.foto,
                    location: pet.ubicacion,
                    size: pet.tamaño,
                    age: pet.edad,
                    // Add missing English properties
                    breed: pet.raza,
                    vaccinated: pet.vacunado,
                    name: pet.nombre,
                  }}
                />
              ))
            ) : (
              <div className={styles.noPets}>
                No se encontraron mascotas con los filtros seleccionados
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
