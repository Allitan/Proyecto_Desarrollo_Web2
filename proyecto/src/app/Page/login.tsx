"use client"
import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import styles from '../styles/Auth.module.css'
import router from 'next/router'

export default function Login() {
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

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user))
                router.push('/')
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
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