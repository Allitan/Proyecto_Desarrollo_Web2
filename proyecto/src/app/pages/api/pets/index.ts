import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../../lib/db'

type Pet = {
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
  createdAt: string
}

type CreatePetRequest = {
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
}

type ApiResponse = {
  success: boolean
  message: string
  pets?: Pet[]
  pet?: Pet
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return res.status(405).json({
        success: false,
        message: 'Método no permitido'
      })
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { especie, tamaño, ubicacion } = req.query

  const client = await pool.connect()
  try {
    let query = 'SELECT * FROM mascotas WHERE estado = $1'
    const params: any[] = ['disponible']

    if (especie && typeof especie === 'string') {
      params.push(especie)
      query += ` AND especie = $${params.length}`
    }

    if (tamaño && typeof tamaño === 'string') {
      params.push(tamaño)
      query += ` AND tamaño = $${params.length}`
    }

    if (ubicacion && typeof ubicacion === 'string') {
      params.push(`%${ubicacion}%`)
      query += ` AND ubicacion ILIKE $${params.length}`
    }

    query += ' ORDER BY createdAt DESC'

    const result = await client.query(query, params)

    res.status(200).json({
      success: true,
      message: 'Mascotas obtenidas exitosamente',
      pets: result.rows
    })
  } catch (error) {
    console.error('Error fetching pets:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  } finally {
    client.release()
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const petData: CreatePetRequest = req.body

  if (!petData.nombre || !petData.especie || !petData.ubicacion) {
    return res.status(400).json({
      success: false,
      message: 'Nombre, especie y ubicación son requeridos'
    })
  }

  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO mascotas (
        nombre, especie, raza, edad, tamaño, genero, descripcion, foto, 
        vacunado, esterilizado, ubicacion, dueño_id, estado
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        petData.nombre,
        petData.especie,
        petData.raza,
        petData.edad,
        petData.tamaño,
        petData.genero,
        petData.descripcion,
        petData.foto,
        petData.vacunado,
        petData.esterilizado,
        petData.ubicacion,
        1, // En una aplicación real, esto vendría del usuario autenticado
        'disponible'
      ]
    )

    const newPet = result.rows[0]

    res.status(201).json({
      success: true,
      message: 'Mascota publicada exitosamente',
      pet: newPet
    })
  } catch (error) {
    console.error('Error creating pet:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  } finally {
    client.release()
  }
}
