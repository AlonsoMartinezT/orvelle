"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NavAdmin() {
  const router = useRouter();

  return (
    <div className="border-b border-linea bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <nav className="flex gap-6 font-medium text-sm">
          <Link href="/admin/" className="hover:text-coral">Panel</Link>
          <Link href="/admin/productos/" className="hover:text-coral">Productos</Link>
        </nav>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/admin/login/");
          }}
          className="text-sm font-medium text-tinta/60 hover:text-coral"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
