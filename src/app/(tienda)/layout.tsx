import type { ReactNode } from "react";
import { ProveedorCarrito } from "@/lib/carrito";
import Encabezado from "@/components/Encabezado";
import Pie from "@/components/Pie";

export default function LayoutTienda({ children }: { children: ReactNode }) {
  return (
    <ProveedorCarrito>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded bg-coral px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Encabezado />
      <div id="contenido" className="flex-1">
        {children}
      </div>
      <Pie />
    </ProveedorCarrito>
  );
}
