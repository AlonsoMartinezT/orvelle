"use client";

import { useState } from "react";
import Link from "next/link";
import type { Producto } from "@/lib/tipos";
import { useCarrito } from "@/lib/carrito";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

export default function TarjetaProducto({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);
  const enOferta = producto.precio_oferta != null && producto.precio_oferta < producto.precio;
  const agotado = producto.stock <= 0;

  const agregarRapido = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (agotado) return;
    agregar(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <Link
      href={`/tienda/producto/?slug=${producto.slug}`}
      className="group block overflow-hidden rounded-3xl border-2 border-transparent bg-white shadow-sm transition hover:-translate-y-1.5 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/15"
    >
      <div className="relative aspect-square overflow-hidden bg-crema">
        <div className="foto-fundida absolute inset-0">
          {producto.imagen_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-tinta/30">Orvelle</div>
          )}
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {enOferta && (
            <span className="rounded-full bg-coral px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              Oferta
            </span>
          )}
          {producto.destacado && (
            <span className="rounded-full bg-turquesa px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              ★ Top
            </span>
          )}
        </div>

        {!agotado && (
          <button
            onClick={agregarRapido}
            aria-label={`Agregar ${producto.nombre} al carrito`}
            className={`absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold shadow-lg transition
              md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
              ${agregado ? "bg-turquesa text-white" : "bg-white text-coral hover:bg-coral hover:text-white"}`}
          >
            {agregado ? "✓" : "+"}
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="font-display text-lg text-tinta">{producto.nombre}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-bold text-coral">{dinero(producto.precio_oferta ?? producto.precio)}</span>
          {enOferta && <span className="text-sm text-tinta/40 line-through">{dinero(producto.precio)}</span>}
        </div>
        {agotado && <p className="mt-1 text-xs font-medium text-tinta/50">Agotado</p>}
      </div>
    </Link>
  );
}
