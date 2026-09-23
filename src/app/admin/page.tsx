"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtegerAdmin from "@/components/ProtegerAdmin";
import NavAdmin from "@/components/NavAdmin";
import type { Pedido } from "@/lib/tipos";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState<number | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    supabase
      .from("productos")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setTotalProductos(count ?? 0));

    supabase
      .from("pedidos")
      .select("*")
      .order("creado_en", { ascending: false })
      .limit(10)
      .then(({ data }) => setPedidos((data as Pedido[]) ?? []));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="font-display text-3xl text-tinta">Panel de Orvelle</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-linea bg-white p-6">
          <p className="text-sm text-tinta/50">Productos en catálogo</p>
          <p className="mt-1 font-display text-4xl text-coral">{totalProductos ?? "…"}</p>
          <Link href="/admin/productos/" className="mt-3 inline-block text-sm font-semibold text-turquesa hover:underline">
            Administrar productos →
          </Link>
        </div>
        <div className="rounded-2xl border border-linea bg-white p-6">
          <p className="text-sm text-tinta/50">Pedidos recientes</p>
          <p className="mt-1 font-display text-4xl text-turquesa">{pedidos.length}</p>
        </div>
      </div>

      <h2 className="mt-10 font-display text-xl text-tinta">Últimos pedidos</h2>
      {pedidos.length === 0 ? (
        <p className="mt-3 text-tinta/50">Todavía no hay pedidos.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-linea bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-linea text-tinta/50">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className="border-b border-linea last:border-0">
                  <td className="px-4 py-3">{p.cliente_nombre}</td>
                  <td className="px-4 py-3">{p.cliente_telefono}</td>
                  <td className="px-4 py-3 font-semibold">{dinero(p.total)}</td>
                  <td className="px-4 py-3 capitalize">{p.estado}</td>
                  <td className="px-4 py-3 text-tinta/50">{new Date(p.creado_en).toLocaleString("es-MX")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function PaginaAdmin() {
  return (
    <ProtegerAdmin>
      <NavAdmin />
      <Dashboard />
    </ProtegerAdmin>
  );
}
