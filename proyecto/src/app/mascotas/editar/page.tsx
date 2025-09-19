'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/Providers/authProvider';
import { Mascota } from '@/app/Modelos/auth';

export default function EditarMascotaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idMascota = searchParams.get('id');
    const { usuario, token, cargando } = useAuth();
    const [mascota, setMascota] = useState<Mascota | null>(null);
    const [datosFormulario, setDatosFormulario] = useState<Partial<Mascota>>({});
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (cargando) return;
        if (!usuario || !usuario.esDueño) {
            router.push('/dashboard');
            return;
        }

        const fetchMascota = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/mascota/${idMascota}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMascota(data);
                    setDatosFormulario(data);
                } else {
                    setError('Mascota no encontrada o error de servidor.');
                }
            } catch (err) {
                setError('Error de conexión con el servidor.');
            }
        };

        if (idMascota && token) {
            fetchMascota();
        }
    }, [idMascota, token, usuario, cargando, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDatosFormulario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        try {
            const res = await fetch(`http://localhost:5000/api/mascota/${idMascota}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datosFormulario)
            });

            if (res.ok) {
                setMensaje('¡Mascota actualizada con éxito!');
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                const errorData = await res.json();
                setError(errorData.mensaje || 'Error al actualizar la mascota.');
            }
        } catch (err) {
            setError('Error de conexión con el servidor. Inténtalo de nuevo más tarde.');
        }
    };

    if (cargando || !mascota) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: 'var(--color-azul)' }}>
                Editar Mascota
            </h1>
            <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={datosFormulario.nombre || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="especie" className="form-label">Especie</label>
                    <input
                        type="text"
                        className="form-control"
                        id="especie"
                        name="especie"
                        value={datosFormulario.especie || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="raza" className="form-label">Raza</label>
                    <input
                        type="text"
                        className="form-control"
                        id="raza"
                        name="raza"
                        value={datosFormulario.raza || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad (años)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        name="edad"
                        value={datosFormulario.edad || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="foto" className="form-label">URL de la Foto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="foto"
                        name="foto"
                        value={datosFormulario.foto || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={datosFormulario.descripcion || ''}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </div>
                <button type="submit" className="btn text-white w-100" style={{ backgroundColor: 'var(--color-verde)' }}>
                    Actualizar Mascota
                </button>
            </form>
            {mensaje && (
                <div className="alert alert-success mt-4 text-center">
                    {mensaje}
                </div>
            )}
            {error && (
                <div className="alert alert-danger mt-4 text-center">
                    {error}
                </div>
            )}
        </div>
    );
}