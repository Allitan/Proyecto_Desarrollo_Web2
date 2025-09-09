'use client'
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "./Providers/authProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [esAdoptante, setEsAdoptante] = useState(false);
  const [esDueño, setEsDueño] = useState(false);
  const { login, registro } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await login(email, password);
    if (exito) {
      router.push('/dashboard');
    } else {
      alert('Email o contraseña incorrectos');
    }
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    const datosRegistro = {
      nombre,
      email,
      contraseña: password,
      esAdoptante,
      esDueño
    };
    const exito = await registro(datosRegistro);
    if (exito) {
      alert('Registro exitoso. ¡Ahora inicia sesión!');
      setIsLoginView(true);
    } else {
      alert('Error en el registro.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-header text-center">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button className={`nav-link ${isLoginView ? 'active' : ''}`} onClick={() => setIsLoginView(true)}>Iniciar Sesión</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${!isLoginView ? 'active' : ''}`} onClick={() => setIsLoginView(false)}>Registrarse</button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {isLoginView ? (
            <form onSubmit={handleLogin}>
              <h2>Iniciar Sesión</h2>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
          ) : (
            <form onSubmit={handleRegistro}>
              <h2>Registrarse</h2>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={esAdoptante} onChange={(e) => setEsAdoptante(e.target.checked)} />
                  <label className="form-check-label">Soy Adoptante</label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={esDueño} onChange={(e) => setEsDueño(e.target.checked)} />
                  <label className="form-check-label">Soy Dueño</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
