"use client"
import styles from '../styles/Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
         <a href="/" className={styles.logo}>Entidad de Relacion</a>
        <div className={styles.links}>
          <a href="/adoptar" className={styles.link}>Adoptar</a>
          <a href="/login" className={styles.link}>Iniciar Sesión</a>
          <a href="/register" className={styles.link}>Registrarse</a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation