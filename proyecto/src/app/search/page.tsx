"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

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
