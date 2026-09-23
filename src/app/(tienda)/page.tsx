"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { asset } from "@/lib/asset";
import type { Categoria, Producto } from "@/lib/tipos";
import TarjetaProducto from "@/components/TarjetaProducto";

const CATEGORIA_EMOJI: Record<string, string> = {
  skincare: "🌿",
  cabello: "💇🏽‍♀️",
  maquillaje: "💄",
  fragancias: "🌸",
};

export default function Inicio() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const carrusel = useRef<HTMLDivElement>(null);

  const desplazar = (direccion: 1 | -1) => {
    carrusel.current?.scrollBy({ left: direccion * 300, behavior: "smooth" });
  };

  useEffect(() => {
    supabase
      .from("productos")
      .select("*")
      .eq("activo", true)
      .eq("destacado", true)
      .order("creado_en", { ascending: false })
      .limit(8)
      .then(({ data }) => setDestacados(data ?? []));

    supabase
      .from("categorias")
      .select("*")
      .order("orden")
      .then(({ data }) => setCategorias(data ?? []));
  }, []);

  const CATEGORIA_FONDO: Record<string, string> = {
    skincare: "bg-turquesa-suave",
    cabello: "bg-coral-suave",
    maquillaje: "bg-turquesa-suave",
    fragancias: "bg-coral-suave",
  };

  return (
    <main className="overflow-x-clip">
      <div className="relative overflow-hidden bg-coral-suave">
        <section className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:py-24">
        <div className="aparece relative order-2 md:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-turquesa px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Tulum · Quintana Roo
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-tinta md:text-6xl">
            Belleza que se siente <span className="text-coral">tan viva</span> como la selva y el mar.
          </h1>
          <p className="mt-5 max-w-md text-lg text-tinta/70">
            Skincare, cabello, maquillaje y fragancias seleccionadas con la misma intención con la que cuidamos la
            piel en cabina. Pide en línea, recibe en Tulum.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tienda/"
              className="rounded-full bg-coral px-8 py-3.5 font-bold text-white shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-coral/40"
            >
              Ver la tienda
            </Link>
            <Link
              href="/contacto/"
              className="rounded-full border-2 border-tinta/15 px-8 py-3.5 font-bold text-tinta transition hover:-translate-y-0.5 hover:border-turquesa hover:text-turquesa"
            >
              Agenda en cabina
            </Link>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="foto-portada aspect-[4/5] overflow-hidden rounded-[2rem]" style={{ ["--fx" as string]: "60%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/hero.jpg")} alt="Producto de skincare Orvelle sobre fondo natural" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-5 py-3 shadow-xl">
            <p className="font-display text-2xl text-coral">12+</p>
            <p className="text-xs font-semibold text-tinta/60">productos curados</p>
          </div>
        </div>
        </section>
      </div>

      <div className="overflow-hidden border-y-2 border-tinta bg-tinta py-3">
        <div className="flex w-max animate-[marquesina_28s_linear_infinite] gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 pr-10 font-display text-lg uppercase tracking-widest text-hueso">
              <span>Skincare</span>
              <span className="text-coral">✦</span>
              <span>Cabello</span>
              <span className="text-turquesa">✦</span>
              <span>Maquillaje</span>
              <span className="text-coral">✦</span>
              <span>Fragancias</span>
              <span className="text-turquesa">✦</span>
              <span>Envíos a todo México</span>
              <span className="text-coral">✦</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="mb-6 font-display text-3xl text-tinta">Explora por categoría</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categorias.map((c) => (
            <Link
              key={c.id}
              href={`/tienda/?categoria=${c.slug}`}
              className={`aparece flex flex-col items-center gap-2 rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${CATEGORIA_FONDO[c.slug] ?? "bg-crema"}`}
            >
              <span className="text-4xl">{CATEGORIA_EMOJI[c.slug] ?? "✨"}</span>
              <span className="font-display text-lg text-tinta">{c.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="py-12">
          <div className="mx-auto flex max-w-6xl items-end justify-between px-5">
            <div>
              <h2 className="font-display text-3xl text-tinta">Destacados</h2>
              <p className="mt-1 text-sm text-tinta/60">Los favoritos de quienes ya nos conocen.</p>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/tienda/" className="text-sm font-bold text-coral hover:underline">Ver todo →</Link>
              <button
                onClick={() => desplazar(-1)}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-tinta/15 text-lg transition hover:border-coral hover:text-coral"
              >
                ←
              </button>
              <button
                onClick={() => desplazar(1)}
                aria-label="Siguiente"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-tinta/15 text-lg transition hover:border-coral hover:text-coral"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={carrusel}
            className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-auto sm:max-w-6xl [&::-webkit-scrollbar]:hidden"
          >
            {destacados.map((p) => (
              <div key={p.id} className="w-[70vw] shrink-0 snap-start sm:w-[260px]">
                <TarjetaProducto producto={p} />
              </div>
            ))}
          </div>

          <Link href="/tienda/" className="mt-4 block px-5 text-sm font-bold text-coral hover:underline sm:hidden">
            Ver todo →
          </Link>
        </section>
      )}

      <section className="bg-turquesa-suave">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <h2 className="font-display text-3xl text-tinta md:text-4xl">Hecho para pieles que viven al aire libre</h2>
          <p className="mx-auto mt-3 max-w-xl text-tinta/70">
            Formulamos y elegimos cada producto pensando en sol, humedad y agua de mar — la rutina real de quien vive
            o visita Tulum.
          </p>
          <Link
            href="/tienda/"
            className="mt-8 inline-block rounded-full bg-coral px-8 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Descubrir la tienda
          </Link>
        </div>
      </section>
    </main>
  );
}
