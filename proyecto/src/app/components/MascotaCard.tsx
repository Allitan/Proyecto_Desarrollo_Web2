import { ReactNode, useState } from 'react'
import styles from '../styles/MascotaCard.module.css'

type Pet = {
  photo: string
  location: ReactNode
  size: ReactNode
  age: ReactNode
  breed: ReactNode
  vaccinated: any
  name: ReactNode
  id: React.Key | null | undefined
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
  neutered?: boolean
}

type Props = {
  pet: Pet
}

export default function MascotaCard({ pet }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdoptionRequest = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mascota_id: pet.id_mascota,
          mensaje: message
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert('Solicitud de adopción enviada exitosamente')
        setShowModal(false)
        setMessage('')
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Error al enviar solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img 
            src={pet.photo || '/placeholder-pet.jpg'} 
            alt={typeof pet.name === 'string' ? pet.name : (pet.nombre || 'Mascota')}
            className={styles.image}
          />
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.name}>{pet.name}</h3>
          <p className={styles.info}>
            {pet.especie} • {pet.breed} • {pet.age} año{pet.age !== 1 ? 's' : ''}
          </p>
          <p className={styles.info}>
            {pet.size} • {pet.genero}
          </p>
          <p className={styles.location}>📍 {pet.location}</p>
          
          <div className={styles.badges}>
            {pet.vaccinated && (
              <span className={styles.badge}>✅ Vacunado</span>
            )}
            {pet.neutered && (
              <span className={styles.badge}>✅ Esterilizado</span>
            )}
          </div>
          
          <p className={styles.description}>
            {pet.descripcion.length > 100 
              ? `${pet.descripcion.substring(0, 100)}...` 
              : pet.descripcion
            }
          </p>
          
          <button 
            onClick={() => setShowModal(true)}
            className={styles.adoptButton}
          >
            Solicitar Adopción
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Solicitar Adopción de {pet.name}</h3>
            <p>Escribe un mensaje explicando por qué quieres adoptar a {pet.name}:</p>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={styles.textarea}
              placeholder="Cuéntanos sobre ti, tu experiencia con mascotas, y por qué crees que serías un buen hogar para esta mascota..."
              required
            />
            
            <div className={styles.modalButtons}>
              <button 
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button 
                onClick={handleAdoptionRequest}
                disabled={loading || !message.trim()}
                className={styles.confirmButton}
              >
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
