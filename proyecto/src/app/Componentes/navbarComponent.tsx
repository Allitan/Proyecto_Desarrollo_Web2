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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/dashboard">ADOPTANDO</Link>
                
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/mascotas">Mascotas</Link>
                        </li>
                        {usuario.esDueño && (
                            <li className="nav-item">
                                <Link className="nav-link" href="/mascotas/agregar">Agregar Mascota</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                
            </div>
        </nav>
    );
}