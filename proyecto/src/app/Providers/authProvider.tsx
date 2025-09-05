'use client'
import React, {useState, useEffect} from "react"
import { AuthContext } from "../Context/authContext"
import { Plantilla } from "../Modelos/auth"
import { Usuario } from "../Modelos/Usuario";



export default function AuthProvider({ children }: Plantilla) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
   


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        setCargando(false);
    }, []);


     const login = async (email: string, contrasena: string): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contraseña: contrasena }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token)
                setUsuario(data.data)
                localStorage.setItem('token', data.token)
                console.log('Inicio de sesión exitoso:', data)
                return true;
            } else {
                console.error('Error en el login:', data.mensaje)
                return false;
            }
        } catch (error) {
            console.error('Error de red:', error)
            return false
        }
    };

    const logout = () => {
        setToken(null);
        setUsuario(null);
        localStorage.removeItem('token');
        console.log('Sesión cerrada');
    };

    const registro = async (_datos: any): Promise<boolean> => {
        try {  

            const response = await fetch('http://localhost:5000/api/usuarios/registro',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registro exitoso:', data);
                return true;
            } else {
                console.error('Error en el registro:', data.mensaje);
                return false;
            }
        } catch (error) {
            console.error('Error de red:', error);
            return false;
        }
    };

    return (
      <AuthContext.Provider value={{ usuario, token, login, logout, registro, cargando }}>
        {children}
      </AuthContext.Provider>

    );
}

export const useAuth = () => {
    return React.useContext(AuthContext);
}    