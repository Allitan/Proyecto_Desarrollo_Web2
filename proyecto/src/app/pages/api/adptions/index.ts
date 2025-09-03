
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../../lib/db'

type AdoptionRequest = {
  id_solicitud: string
  mascota_id: string
  adoptante_id: string
  mensaje: string
  estado: 'pendiente' | 'aceptada' | 'rechazada'
  createdAt: string
}

type CreateAdoptionRequest = {
  mascota_id: string
  mensaje: string
}

type ApiResponse = {
  success: boolean
  message: string
  adoptionRequest?: AdoptionRequest
  adoptionRequests?: AdoptionRequest[]
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
  const { ownerId, adopterId } = req.query

  const client = await pool.connect()
  try {
    let query = `
      SELECT sa.*, m.nombre as mascota_nombre, u.nombre as adoptante_nombre
      FROM solicitudesAdopcion sa
      JOIN mascotas m ON sa.mascota_id = m.id_mascota
      JOIN usuarios u ON sa.adoptante_id = u.id_usuario
    `
    const params: any[] = []

    if (ownerId && typeof ownerId === 'string') {
      params.push(ownerId)
      query += ` WHERE m.dueño_id = $${params.length}`
    }

    if (adopterId && typeof adopterId === 'string') {
      if (params.length > 0) {
        params.push(adopterId)
        query += ` AND sa.adoptante_id = $${params.length}`
      } else {
        params.push(adopterId)
        query += ` WHERE sa.adoptante_id = $${params.length}`
      }
    }

    query += ' ORDER BY sa.createdAt DESC'

    const result = await client.query(query, params)

    res.status(200).json({
      success: true,
      message: 'Solicitudes obtenidas exitosamente',
      adoptionRequests: result.rows
    })
  } catch (error) {
    console.error('Error fetching adoption requests:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  } finally {
    client.release()
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { mascota_id, mensaje }: CreateAdoptionRequest = req.body

  if (!mascota_id || !mensaje) {
    return res.status(400).json({
      success: false,
      message: 'ID de mascota y mensaje son requeridos'
    })
  }

  const client = await pool.connect()
  try {
    // Verificar que la mascota existe y está disponible
    const petCheck = await client.query(
      'SELECT estado FROM mascotas WHERE id_mascota = $1',
      [mascota_id]
    )

    if (petCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      })
    }

    if (petCheck.rows[0].estado !== 'disponible') {
      return res.status(400).json({
        success: false,
        message: 'Esta mascota ya no está disponible para adopción'
      })
    }

    // Crear nueva solicitud
    const result = await client.query(
      `INSERT INTO solicitudesAdopcion (mascota_id, adoptante_id, mensaje, estado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [mascota_id, 1, mensaje, 'pendiente'] // adoptante_id = 1 como ejemplo
    )

    const newRequest = result.rows[0]

    res.status(201).json({
      success: true,
      message: 'Solicitud de adopción enviada exitosamente',
      adoptionRequest: newRequest
    })
  } catch (error) {
    console.error('Error creating adoption request:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  } finally {
    client.release()
  }
}
