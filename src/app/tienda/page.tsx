"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Categoria, Producto } from "@/lib/tipos";
import TarjetaProducto from "@/components/TarjetaProducto";

function Catalogo() {
  const params = useSearchParams();
  const categoriaInicial = params.get("categoria") ?? "todas";

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("categorias").select("*").order("orden"),
      supabase.from("productos").select("*").eq("activo", true).order("creado_en", { ascending: false }),
    ]).then(([cat, prod]) => {
      setCategorias(cat.data ?? []);
      setProductos(prod.data ?? []);
      setCargando(false);
    });
  }, []);

  const categoriaIdPorSlug = useMemo(
    () => Object.fromEntries(categorias.map((c) => [c.slug, c.id])),
    [categorias],
  );

  const filtrados = productos.filter((p) => {
    const pasaCategoria = categoria === "todas" || p.categoria_id === categoriaIdPorSlug[categoria];
    const pasaBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return pasaCategoria && pasaBusqueda;
  });

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-4xl text-tinta">Tienda</h1>
      <p className="mt-2 text-tinta/60">{productos.length} productos · skincare, cabello, maquillaje y fragancias</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoria("todas")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${categoria === "todas" ? "bg-coral text-white" : "border border-linea bg-white text-tinta/70 hover:border-coral"}`}
          >
            Todas
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoria(c.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${categoria === c.slug ? "bg-coral text-white" : "border border-linea bg-white text-tinta/70 hover:border-coral"}`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar producto…"
          className="campo max-w-xs"
        />
      </div>

      {cargando ? (
        <p className="mt-12 text-tinta/50">Cargando catálogo…</p>
      ) : filtrados.length === 0 ? (
        <p className="mt-12 text-tinta/50">No encontramos productos con ese filtro.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {filtrados.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function Tienda() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-6xl px-5 py-12 text-tinta/50">Cargando…</main>}>
      <Catalogo />
    </Suspense>
  );
}
