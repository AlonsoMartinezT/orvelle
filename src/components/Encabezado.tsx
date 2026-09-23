"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "@/lib/carrito";

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/tienda/", texto: "Tienda" },
  { href: "/contacto/", texto: "Contacto" },
];

export default function Encabezado() {
  const { cantidadTotal } = useCarrito();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-hueso/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-2xl tracking-tight text-tinta">
          Orvelle
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {ENLACES.map((e) => (
            <Link key={e.href} href={e.href} className="text-sm font-medium text-tinta/80 transition hover:text-coral">
              {e.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/carrito/"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-linea bg-white transition hover:border-coral"
            aria-label={`Carrito, ${cantidadTotal} artículos`}
          >
            🛍️
            {cantidadTotal > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-xs font-semibold text-white">
                {cantidadTotal}
              </span>
            )}
          </Link>
          <button
            onClick={() => setAbierto(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-linea bg-white md:hidden"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </div>

      {abierto && (
        <dialog
          open
          className="fixed inset-0 z-50 h-dvh w-dvw max-w-none bg-hueso p-6"
          onClick={(e) => e.target === e.currentTarget && setAbierto(false)}
        >
          <div className="flex justify-end">
            <button onClick={() => setAbierto(false)} className="text-2xl" aria-label="Cerrar menú">
              ✕
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6 text-center">
            {ENLACES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                onClick={() => setAbierto(false)}
                className="font-display text-3xl text-tinta"
              >
                {e.texto}
              </Link>
            ))}
          </nav>
        </dialog>
      )}
    </header>
  );
}
