import type { ReactNode } from "react";
import Link from "next/link";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-crema">
      <div className="border-b border-tinta/10 bg-tinta">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-2.5">
          <Link href="/admin/" className="font-display text-sm tracking-[0.15em] text-hueso/90">
            ORVELLE <span className="text-hueso/50">· equipo</span>
          </Link>
          <Link href="/tienda/" className="text-xs font-medium text-hueso/60 hover:text-coral">
            Ver tienda ↗
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
