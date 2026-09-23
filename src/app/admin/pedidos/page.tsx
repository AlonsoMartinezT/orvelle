"use client";

import { Fragment, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtegerAdmin from "@/components/ProtegerAdmin";
import NavAdmin from "@/components/NavAdmin";
import type { Pedido } from "@/lib/tipos";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

const ESTADOS = [
  { valor: "recibido", etiqueta: "Recibido" },
  { valor: "confirmado", etiqueta: "Confirmado" },
  { valor: "preparando", etiqueta: "Preparando" },
  { valor: "enviado", etiqueta: "Enviado" },
  { valor: "entregado", etiqueta: "Entregado" },
  { valor: "cancelado", etiqueta: "Cancelado" },
] as const;

const colorEstado: Record<string, string> = {
  recibido: "bg-tinta/10 text-tinta",
  confirmado: "bg-turquesa/15 text-turquesa",
  preparando: "bg-turquesa/15 text-turquesa",
  enviado: "bg-turquesa/15 text-turquesa",
  entregado: "bg-emerald-100 text-emerald-700",
  cancelado: "bg-red-100 text-red-600",
};

function ListaPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [expandido, setExpandido] = useState<string | null>(null);

  const cargar = () => {
    supabase
      .from("pedidos")
      .select("*")
      .order("creado_en", { ascending: false })
      .then(({ data }) => {
        setPedidos((data as Pedido[]) ?? []);
        setCargando(false);
      });
  };

  useEffect(cargar, []);

  const cambiarEstado = async (id: string, estado: string) => {
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
    await supabase.from("pedidos").update({ estado }).eq("id", id);
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="font-display text-3xl text-tinta">Pedidos</h1>
      <p className="mt-1 text-tinta/60">Marca cada pedido conforme avanza — confirmado, preparando, enviado, entregado o cancelado.</p>

      {cargando ? (
        <p className="mt-8 text-tinta/50">Cargando…</p>
      ) : pedidos.length === 0 ? (
        <p className="mt-8 text-tinta/50">Todavía no hay pedidos.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-linea bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-linea text-tinta/50">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <Fragment key={p.id}>
                  <tr className="border-b border-linea last:border-0 align-top">
                    <td className="px-4 py-3">{p.cliente_nombre}</td>
                    <td className="px-4 py-3">
                      <a href={`https://wa.me/52${p.cliente_telefono.replace(/\D/g, "")}`} target="_blank" rel="noopener" className="text-turquesa hover:underline">
                        {p.cliente_telefono}
                      </a>
                    </td>
                    <td className="px-4 py-3 font-semibold">{dinero(p.total)}</td>
                    <td className="px-4 py-3 text-tinta/50">{new Date(p.creado_en).toLocaleString("es-MX")}</td>
                    <td className="px-4 py-3">
                      <select
                        value={p.estado}
                        onChange={(e) => cambiarEstado(p.id, e.target.value)}
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold capitalize ${colorEstado[p.estado] ?? "bg-tinta/10 text-tinta"}`}
                      >
                        {ESTADOS.map((op) => (
                          <option key={op.valor} value={op.valor}>
                            {op.etiqueta}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setExpandido(expandido === p.id ? null : p.id)}
                        className="font-semibold text-turquesa hover:underline"
                      >
                        {expandido === p.id ? "Ocultar" : "Ver detalle"}
                      </button>
                    </td>
                  </tr>
                  {expandido === p.id && (
                    <tr className="border-b border-linea bg-crema/40">
                      <td colSpan={6} className="px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-tinta/50">Artículos</p>
                        <ul className="mt-2 space-y-1">
                          {p.items.map((i, idx) => (
                            <li key={idx} className="flex justify-between text-sm">
                              <span>{i.cantidad} × {i.nombre}</span>
                              <span>{dinero(i.precio * i.cantidad)}</span>
                            </li>
                          ))}
                        </ul>
                        {p.cliente_email && <p className="mt-3 text-sm text-tinta/70">Correo: {p.cliente_email}</p>}
                        {p.notas && <p className="mt-1 text-sm text-tinta/70">Notas: {p.notas}</p>}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function PaginaPedidosAdmin() {
  return (
    <ProtegerAdmin>
      <NavAdmin />
      <ListaPedidos />
    </ProtegerAdmin>
  );
}
