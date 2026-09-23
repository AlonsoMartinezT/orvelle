import Link from "next/link";
import type { Producto } from "@/lib/tipos";

const dinero = (n: number) => `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })}`;

export default function TarjetaProducto({ producto }: { producto: Producto }) {
  const enOferta = producto.precio_oferta != null && producto.precio_oferta < producto.precio;

  return (
    <Link
      href={`/tienda/producto/?slug=${producto.slug}`}
      className="group block overflow-hidden rounded-2xl border border-linea bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-coral/10"
    >
      <div className="foto-fundida aspect-square overflow-hidden bg-crema">
        {producto.imagen_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-tinta/30">Orvelle</div>
        )}
      </div>
      <div className="p-4">
        <p className="font-display text-lg text-tinta">{producto.nombre}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-semibold text-coral">{dinero(producto.precio_oferta ?? producto.precio)}</span>
          {enOferta && <span className="text-sm text-tinta/40 line-through">{dinero(producto.precio)}</span>}
        </div>
        {producto.stock <= 0 && <p className="mt-1 text-xs font-medium text-tinta/50">Agotado</p>}
      </div>
    </Link>
  );
}
