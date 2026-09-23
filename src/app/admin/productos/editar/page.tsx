"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProtegerAdmin from "@/components/ProtegerAdmin";
import NavAdmin from "@/components/NavAdmin";
import FormularioProducto from "@/components/FormularioProducto";

function Contenido() {
  const id = useSearchParams().get("id");
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="font-display text-3xl text-tinta">Editar producto</h1>
      {id ? <FormularioProducto productoId={id} /> : <p className="mt-6 text-tinta/50">Falta el id del producto.</p>}
    </main>
  );
}

export default function EditarProducto() {
  return (
    <ProtegerAdmin>
      <NavAdmin />
      <Suspense fallback={<p className="p-10 text-tinta/50">Cargando…</p>}>
        <Contenido />
      </Suspense>
    </ProtegerAdmin>
  );
}
