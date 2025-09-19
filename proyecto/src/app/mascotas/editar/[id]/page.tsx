"use client";

export default function EditarMascotaPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Editar Mascota</h1>
      <p>Estás editando la mascota con ID: {id}</p>

      <form className="mt-4">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
