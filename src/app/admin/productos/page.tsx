"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtegerAdmin from "@/components/ProtegerAdmin";
import NavAdmin from "@/components/NavAdmin";
import type { Producto } from "@/lib/tipos";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargar = () => {
    supabase
      .from("productos")
      .select("*")
      .order("creado_en", { ascending: false })
      .then(({ data }) => {
        setProductos(data ?? []);
        setCargando(false);
      });
  };

  useEffect(cargar, []);

  const alternar = async (id: string, campo: "activo" | "destacado", valor: boolean) => {
    await supabase.from("productos").update({ [campo]: !valor }).eq("id", id);
    cargar();
  };

  const borrar = async (id: string, nombre: string) => {
    if (!confirm(`¿Borrar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from("productos").delete().eq("id", id);
    cargar();
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-tinta">Productos</h1>
        <Link href="/admin/productos/nuevo/" className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white">
          + Nuevo producto
        </Link>
      </div>

      {cargando ? (
        <p className="mt-8 text-tinta/50">Cargando…</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-linea bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-linea text-tinta/50">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Activo</th>
                <th className="px-4 py-3">Destacado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-b border-linea last:border-0">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-crema">
                      {p.imagen_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imagen_url} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    {p.nombre}
                  </td>
                  <td className="px-4 py-3">{dinero(p.precio_oferta ?? p.precio)}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => alternar(p.id, "activo", p.activo)} className={p.activo ? "text-turquesa" : "text-tinta/30"}>
                      {p.activo ? "Sí" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => alternar(p.id, "destacado", p.destacado)} className={p.destacado ? "text-coral" : "text-tinta/30"}>
                      {p.destacado ? "Sí" : "No"}
                    </button>
                  </td>
                  <td className="space-x-3 px-4 py-3 text-right">
                    <Link href={`/admin/productos/editar/?id=${p.id}`} className="font-semibold text-turquesa hover:underline">
                      Editar
                    </Link>
                    <button onClick={() => borrar(p.id, p.nombre)} className="font-semibold text-red-500 hover:underline">
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function PaginaProductosAdmin() {
  return (
    <ProtegerAdmin>
      <NavAdmin />
      <ListaProductos />
    </ProtegerAdmin>
  );
}
