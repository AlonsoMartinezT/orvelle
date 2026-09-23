"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { asset } from "@/lib/asset";
import { useSesionAdmin } from "@/lib/useSesionAdmin";

export default function LoginAdmin() {
  const router = useRouter();
  const { sesion, cargando } = useSesionAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!cargando && sesion) {
    router.replace("/admin/");
    return null;
  }

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");
    const { error: errorLogin } = await supabase.auth.signInWithPassword({ email, password });
    setEnviando(false);
    if (errorLogin) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.replace("/admin/");
  };

  return (
    <div className="grid flex-1 md:grid-cols-2">
      <div className="relative hidden overflow-hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/img/hero.jpg")} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-tinta/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-hueso">
          <p className="font-display text-3xl leading-tight">
            El rincón privado <br /> de Orvelle.
          </p>
          <p className="mt-3 max-w-xs text-sm text-hueso/70">
            Aquí gestionas el catálogo y los pedidos que llegan de Tulum y del mundo.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="font-display text-3xl text-tinta">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-tinta/60">Área privada de Orvelle.</p>

          <form onSubmit={entrar} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Correo</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="campo" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Contraseña</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="campo" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-full bg-coral py-3 font-semibold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {enviando ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
