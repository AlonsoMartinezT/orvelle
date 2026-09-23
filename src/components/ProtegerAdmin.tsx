"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSesionAdmin } from "@/lib/useSesionAdmin";

export default function ProtegerAdmin({ children }: { children: React.ReactNode }) {
  const { sesion, cargando } = useSesionAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !sesion) router.replace("/admin/login/");
  }, [cargando, sesion, router]);

  if (cargando || !sesion) {
    return <main className="mx-auto max-w-3xl px-5 py-16 text-tinta/50">Verificando acceso…</main>;
  }

  return <>{children}</>;
}
