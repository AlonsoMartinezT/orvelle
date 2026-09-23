import Link from "next/link";
import { ProveedorCarrito } from "@/lib/carrito";
import Encabezado from "@/components/Encabezado";
import Pie from "@/components/Pie";

export default function NoEncontrado() {
  return (
    <ProveedorCarrito>
      <Encabezado />
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center px-5 py-24 text-center">
        <p className="font-display text-6xl text-coral">404</p>
        <h1 className="mt-4 font-display text-2xl text-tinta">Esta página se nos evaporó, como el agua de Tulum</h1>
        <Link href="/" className="mt-8 rounded-full bg-coral px-7 py-3 font-semibold text-white">
          Volver al inicio
        </Link>
      </main>
      <Pie />
    </ProveedorCarrito>
  );
}
