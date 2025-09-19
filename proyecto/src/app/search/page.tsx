"use client"; // esto es obligatorio para usar useSearchParams
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams(); // obtiene los parámetros de la URL
  const query = searchParams.get("query"); // aquí guardamos el valor de ?query=

  console.log("query:", query); // verifica en la consola

  return (
    <div className="container">
      <h1>Resultados de búsqueda</h1>
      {query ? (
        <p>Buscaste: <strong>{query}</strong></p>
      ) : (
        <p>No se ingresó ningún término de búsqueda.</p>
      )}
    </div>
  );
}

