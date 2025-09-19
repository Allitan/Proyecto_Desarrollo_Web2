'use client'
import React from "react"
import Link from "next/link"
import { useAuth } from "../Providers/authProvider"
import { useRouter } from "next/navigation"

export default function NavbarComponent() {
    const { usuario, logout, cargando } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (cargando) {
        return null;
    }

    if (!usuario) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: 'var(--color-azul)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand text-white" href="/dashboard">ADOPTANDO</Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link text-white" href="/mascotas">Mascotas</Link>
                    </li>
                    {usuario.esDueño && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" href="/mascotas/agregar">Agregar Mascota</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" href="/solicitudes-recibidas">Solicitudes Recibidas</Link>
                            </li>
                        </>
                    )}
                    {usuario.esAdoptante && (
                        <li className="nav-item">
                            <Link className="nav-link text-white" href="/mis-solicitudes">Mis Solicitudes</Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <button className="nav-link btn btn-link text-white" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}