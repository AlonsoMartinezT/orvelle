"use client";

import Link from "next/link";
import { useCarrito } from "@/lib/carrito";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

export default function Carrito() {
  const { items, total, actualizarCantidad, quitar } = useCarrito();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="font-display text-3xl text-tinta">Tu carrito está vacío</h1>
        <Link href="/tienda/" className="mt-6 inline-block rounded-full bg-coral px-7 py-3 font-semibold text-white">
          Ir a la tienda
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-3xl text-tinta">Tu carrito</h1>

      <ul className="mt-8 divide-y divide-linea">
        {items.map((i) => (
          <li key={i.producto_id} className="flex items-center gap-4 py-5">
            <div className="foto-fundida h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-crema">
              {i.imagen_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={i.imagen_url} alt={i.nombre} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-tinta">{i.nombre}</p>
              <p className="text-sm text-tinta/50">{dinero(i.precio)}</p>
            </div>
            <div className="flex items-center rounded-full border border-linea">
              <button onClick={() => actualizarCantidad(i.producto_id, i.cantidad - 1)} className="px-3 py-1.5" aria-label="Restar">−</button>
              <span className="w-6 text-center text-sm">{i.cantidad}</span>
              <button onClick={() => actualizarCantidad(i.producto_id, i.cantidad + 1)} className="px-3 py-1.5" aria-label="Sumar">+</button>
            </div>
            <p className="w-20 text-right font-semibold">{dinero(i.precio * i.cantidad)}</p>
            <button onClick={() => quitar(i.producto_id)} className="text-tinta/40 hover:text-coral" aria-label={`Quitar ${i.nombre}`}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-linea pt-6">
        <span className="font-display text-2xl">Total</span>
        <span className="font-display text-2xl text-coral">{dinero(total)}</span>
      </div>

      <Link
        href="/checkout/"
        className="mt-8 block rounded-full bg-coral py-3.5 text-center font-semibold text-white transition hover:brightness-105"
      >
        Continuar al pago
      </Link>
    </main>
  );
}
