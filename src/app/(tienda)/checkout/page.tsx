"use client";

import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "@/lib/carrito";
import { supabase } from "@/lib/supabase";

const WHATSAPP_NUMERO = "529841234567";
const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

export default function Checkout() {
  const { items, total, vaciar } = useCarrito();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [notas, setNotas] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState("");

  if (confirmado) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-4xl">✓</p>
        <h1 className="mt-4 font-display text-3xl text-tinta">¡Gracias, {nombre.split(" ")[0]}!</h1>
        <p className="mt-2 text-tinta/70">Tu pedido quedó registrado. Te contactamos al {telefono} para confirmar entrega.</p>
        <Link href="/tienda/" className="mt-8 inline-block rounded-full bg-coral px-7 py-3 font-semibold text-white">
          Seguir comprando
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-tinta/60">Tu carrito está vacío.</p>
        <Link href="/tienda/" className="mt-6 inline-block rounded-full bg-coral px-7 py-3 font-semibold text-white">
          Ir a la tienda
        </Link>
      </main>
    );
  }

  const enviarPedido = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setError("");
    setEnviando(true);

    const { error: errorInsert } = await supabase.from("pedidos").insert({
      cliente_nombre: nombre,
      cliente_telefono: telefono,
      cliente_email: email || null,
      items,
      total,
      notas: notas || null,
    });

    setEnviando(false);

    if (errorInsert) {
      setError("No pudimos registrar tu pedido. Intenta de nuevo en un momento.");
      return;
    }

    const resumen = items.map((i) => `- ${i.cantidad} x ${i.nombre} (${dinero(i.precio * i.cantidad)})`).join("\n");
    const texto = `Hola Orvelle, hice un pedido en la tienda:\n\n${resumen}\n\nTotal: ${dinero(total)}\nNombre: ${nombre}`;
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");

    vaciar();
    setConfirmado(true);
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-3xl text-tinta">Finalizar pedido</h1>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]">
        <form onSubmit={enviarPedido} className="space-y-4" noValidate>
          <div>
            <label className="mb-1 block text-sm font-medium">Nombre completo</label>
            <input required minLength={2} value={nombre} onChange={(e) => setNombre(e.target.value)} className="campo" />
            <p className="error-campo">Escribe tu nombre.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Teléfono / WhatsApp</label>
            <input required minLength={10} value={telefono} onChange={(e) => setTelefono(e.target.value)} className="campo" placeholder="984 123 4567" />
            <p className="error-campo">Escribe un teléfono válido.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Correo (opcional)</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="campo" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Notas de entrega (opcional)</label>
            <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="campo" rows={3} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-full bg-coral py-3.5 font-semibold text-white transition hover:brightness-105 disabled:opacity-60"
          >
            {enviando ? "Enviando…" : `Confirmar pedido · ${dinero(total)}`}
          </button>
          <p className="text-xs text-tinta/50">Al confirmar, se abre WhatsApp con el resumen para coordinar la entrega.</p>
        </form>

        <aside className="h-fit rounded-2xl border border-linea bg-white p-5">
          <p className="font-display text-lg">Resumen</p>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.producto_id} className="flex justify-between text-tinta/70">
                <span>{i.cantidad} × {i.nombre}</span>
                <span>{dinero(i.precio * i.cantidad)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-linea pt-4 font-semibold">
            <span>Total</span>
            <span className="text-coral">{dinero(total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
