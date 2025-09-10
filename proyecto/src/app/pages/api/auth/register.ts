import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../../lib/db'

type User = {
  id_usuario: string
  nombre: string
  email: string
  telefono: string
  direccion: string
  esAdoptante: boolean
  esDueño: boolean
  createdAt: string
}

type RegisterRequest = {
  nombre: string
  email: string
  contraseña: string
  esAdoptante: boolean
  esDueno: boolean
  telefono?: string
  direccion?: string
}

type ApiResponse = {
  success: boolean
  message: string
  user?: User
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método no permitido'
    })
  }

  const { nombre, email, contraseña, esAdoptante, esDueno, telefono, direccion }: RegisterRequest = req.body

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({
      success: false,
      message: 'Nombre, email y contraseña son requeridos'
    })
  }

  const client = await pool.connect()
  try {
    // Verificar si el email ya existe
    const existingUser = await client.query(
      'SELECT id_usuario FROM usuarios WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      })
    }

    // Crear nuevo usuario
    const result = await client.query(
      `INSERT INTO usuarios (nombre, email, contraseña, telefono, direccion, esAdoptante, esDueño)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id_usuario, nombre, email, telefono, direccion, esAdoptante, esDueño, createdAt`,
      [nombre, email, contraseña, telefono || '', direccion || '', esAdoptante, esDueno]
    )

    const newUser = result.rows[0]

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: newUser
    })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  } finally {
    client.release()
  }
}
