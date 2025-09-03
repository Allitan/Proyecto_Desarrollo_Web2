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

type LoginRequest = {
  email: string
  contraseña: string
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

  const { email, contraseña }: LoginRequest = req.body

  if (!email || !contraseña) {
    return res.status(400).json({
      success: false,
      message: 'Email y contraseña son requeridos'
    })
  }

  const client = await pool.connect()
  try {
    const result = await client.query(
      `SELECT id_usuario, nombre, email, telefono, direccion, esAdoptante, esDueño, createdAt
       FROM usuarios WHERE email = $1 AND contraseña = $2`,
      [email, contraseña]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      })
    }

    const user = result.rows[0]

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  } finally {
    client.release()
  }
}
