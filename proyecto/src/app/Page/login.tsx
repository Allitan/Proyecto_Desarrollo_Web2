"use client"
import { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Auth.module.css'
import router from 'next/router'
import { useAuth } from '../Context/login'

export default function Login() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const success = await login(formData.email, formData.password)

        if (success) {
            router.push('/')
        } else {
            setError('Credenciales inválidas')
        }

        setLoading(false)
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          {loading && (
            <div className={styles.info}>
              Cargando...
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className={styles.switchText}>
            ¿No tienes cuenta? 
            <Link href="/register" className={styles.link}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}