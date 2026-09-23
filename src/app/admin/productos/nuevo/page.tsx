"use client";

import ProtegerAdmin from "@/components/ProtegerAdmin";
import NavAdmin from "@/components/NavAdmin";
import FormularioProducto from "@/components/FormularioProducto";

export default function NuevoProducto() {
  return (
    <ProtegerAdmin>
      <NavAdmin />
      <main className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="font-display text-3xl text-tinta">Nuevo producto</h1>
        <FormularioProducto />
      </main>
    </ProtegerAdmin>
  );
}
