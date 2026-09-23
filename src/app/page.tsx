"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    supabase
      .from("productos")
      .select("*")
      .eq("activo", true)
      .eq("destacado", true)
      .order("creado_en", { ascending: false })
      .limit(4)
      .then(({ data }) => setDestacados(data ?? []));

    supabase
      .from("categorias")
      .select("*")
      .order("orden")
      .then(({ data }) => setCategorias(data ?? []));
  }, []);

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:py-24">
        <div className="aparece order-2 md:order-1">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-turquesa">Tulum · Quintana Roo</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-tinta md:text-5xl">
            Belleza que se siente <span className="text-coral">tan viva</span> como la selva y el mar de Tulum.
          </h1>
          <p className="mt-5 max-w-md text-tinta/70">
            Skincare, cabello, maquillaje y fragancias seleccionadas con la misma intención con la que cuidamos la
            piel en cabina. Pide en línea, recibe en Tulum.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tienda/" className="rounded-full bg-coral px-7 py-3 font-semibold text-white transition hover:brightness-105">
              Ver la tienda
            </Link>
            <Link href="/contacto/" className="rounded-full border border-tinta/20 px-7 py-3 font-semibold text-tinta transition hover:border-coral hover:text-coral">
              Agenda en cabina
            </Link>
          </div>
        </div>

        <div className="foto-portada order-1 aspect-[4/5] overflow-hidden rounded-3xl md:order-2" style={{ ["--fx" as string]: "60%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/hero.jpg")} alt="Producto de skincare Orvelle sobre fondo natural" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categorias.map((c) => (
            <Link
              key={c.id}
              href={`/tienda/?categoria=${c.slug}`}
              className="aparece flex flex-col items-center gap-2 rounded-2xl border border-linea bg-white p-6 text-center transition hover:border-coral hover:shadow-md"
            >
              <span className="text-3xl">{CATEGORIA_EMOJI[c.slug] ?? "✨"}</span>
              <span className="font-display text-lg">{c.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl text-tinta">Destacados</h2>
            <Link href="/tienda/" className="text-sm font-semibold text-coral hover:underline">Ver todo →</Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {destacados.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-turquesa/10">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center">
          <h2 className="font-display text-3xl text-tinta">Hecho para pieles que viven al aire libre</h2>
          <p className="mx-auto mt-3 max-w-xl text-tinta/70">
            Formulamos y elegimos cada producto pensando en sol, humedad y agua de mar — la rutina real de quien vive
            o visita Tulum.
          </p>
        </div>
      </section>
    </main>
  );
}
