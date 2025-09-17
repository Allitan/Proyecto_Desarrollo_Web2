'use client'
import React, {useState, useEffect, useRef} from "react"
import { AuthContext } from "../Context/authContext"
import { NuevaSolicitudData, Plantilla, RespuestaSolicitudData, Usuario } from "../Modelos/auth"
import { io, Socket } from "socket.io-client";

export default function AuthProvider({ children }: Plantilla) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [socket, setSocket] = useState<Socket | null>(null);

    // Efecto 1: Cargar token de localStorage al iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            verificarUsuario(storedToken);
        } else {
            setCargando(false);
        }
    }, []);

    // Efecto 2: Conectar/desconectar Socket.io cuando el usuario o el token cambian
    useEffect(() => {
        if (usuario && usuario.id_usuario && token) {
            // Desconectar el socket anterior si existe
            if (socket) {
                socket.disconnect();
            }

            const newSocket = io('http://localhost:5000', {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSocket(newSocket);
            
            newSocket.on('connect', () => {
                console.log('Conectado a Socket.IO');
                newSocket.emit('join_room', usuario.id_usuario);
            });
            
            newSocket.on('nueva_solicitud', (data: NuevaSolicitudData) => {
                alert(data.mensaje);
                console.log('Nueva solicitud:', data.solicitud);
            });
            
            newSocket.on('respuesta_solicitud', (data: RespuestaSolicitudData) => {
                alert(data.mensaje);
                console.log('Respuesta a solicitud:', data);
            });
            
            newSocket.on('disconnect', () => {
                console.log('Desconectado de Socket.IO');
            });

            // Función de limpieza para desconectar el socket al desmontar el componente
            return () => {
                if (newSocket) {
                    newSocket.disconnect();
                }
            };
        }
    }, [usuario, token]);

    const verificarUsuario = async (t: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/verificar', {
                headers: { 'Authorization': `Bearer ${t}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUsuario(data.data);
            } else {
                localStorage.removeItem('token');
                setToken(null);
                setUsuario(null);
            }
        } catch (error) {
            console.error('Error al verificar el token:', error);
            localStorage.removeItem('token');
            setToken(null);
            setUsuario(null);
        } finally {
            setCargando(false);
        }
    };

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
                setToken(data.token);
                setUsuario(data.data);
                localStorage.setItem('token', data.token);
                console.log('Inicio de sesión exitoso:', data);
                return true;
            } else {
                console.error('Error en el login:', data.mensaje);
                return false;
            }
        } catch (error) {
            console.error('Error de red:', error);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setUsuario(null);
        localStorage.removeItem('token');
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
        console.log('Sesión cerrada');
    };

    interface RegistroDatos {
        nombre: string;
        email: string;
        contraseña: string;
        esAdoptante: boolean;
        esDueño: boolean;
    }

    const registro = async (datos: RegistroDatos): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
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
        <AuthContext.Provider value={{ usuario, token, login, logout, registro, cargando, socket }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return React.useContext(AuthContext);
}