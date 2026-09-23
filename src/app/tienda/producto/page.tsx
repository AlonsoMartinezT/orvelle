"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCarrito } from "@/lib/carrito";
import type { Producto } from "@/lib/tipos";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

function FichaProducto() {
  const slug = useSearchParams().get("slug");
  const { agregar } = useCarrito();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("productos")
      .select("*")
      .eq("slug", slug)
      .eq("activo", true)
      .maybeSingle()
      .then(({ data }) => {
        setProducto(data);
        setCargando(false);
      });
  }, [slug]);

  if (cargando) return <main className="mx-auto max-w-6xl px-5 py-16 text-tinta/50">Cargando…</main>;

  if (!producto) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-16 text-center">
        <p className="text-tinta/60">No encontramos ese producto.</p>
        <Link href="/tienda/" className="mt-4 inline-block font-semibold text-coral hover:underline">Volver a la tienda</Link>
      </main>
    );
  }

  const enOferta = producto.precio_oferta != null && producto.precio_oferta < producto.precio;

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="foto-fundida aspect-square overflow-hidden rounded-3xl bg-crema">
          {producto.imagen_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={producto.imagen_url} alt={producto.nombre} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-tinta/30">Orvelle</div>
          )}
        </div>

        <div>
          <h1 className="font-display text-4xl text-tinta">{producto.nombre}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-coral">{dinero(producto.precio_oferta ?? producto.precio)}</span>
            {enOferta && <span className="text-lg text-tinta/40 line-through">{dinero(producto.precio)}</span>}
          </div>
          <p className="mt-5 leading-relaxed text-tinta/70">{producto.descripcion}</p>

          {producto.stock > 0 ? (
            <>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center rounded-full border border-linea">
                  <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} className="px-4 py-2" aria-label="Restar">−</button>
                  <span className="w-8 text-center">{cantidad}</span>
                  <button onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))} className="px-4 py-2" aria-label="Sumar">+</button>
                </div>
                <span className="text-sm text-tinta/50">{producto.stock} disponibles</span>
              </div>

              <button
                onClick={() => {
                  agregar(producto, cantidad);
                  setAgregado(true);
                  setTimeout(() => setAgregado(false), 2000);
                }}
                className="mt-6 w-full rounded-full bg-coral py-3.5 font-semibold text-white transition hover:brightness-105 md:w-auto md:px-10"
              >
                {agregado ? "Agregado ✓" : "Agregar al carrito"}
              </button>
            </>
          ) : (
            <p className="mt-8 font-medium text-tinta/50">Agotado por el momento.</p>
          )}

          <Link href="/tienda/" className="mt-8 block text-sm font-semibold text-turquesa hover:underline">
            ← Seguir viendo la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ProductoPagina() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-6xl px-5 py-16 text-tinta/50">Cargando…</main>}>
      <FichaProducto />
    </Suspense>
  );
}
