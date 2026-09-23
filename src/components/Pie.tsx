import Link from "next/link";

export default function Pie() {
  return (
    <footer className="border-t border-linea bg-crema">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-tinta/70">
        <p className="font-display text-lg text-tinta">Orvelle</p>
        <p className="mt-1">Tulum, Quintana Roo · skincare, cabello, maquillaje y fragancias</p>

        <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/tienda/" className="hover:text-coral">Tienda</Link>
          <Link href="/contacto/" className="hover:text-coral">Contacto</Link>
        </nav>

        <p className="mt-6 max-w-2xl rounded-xl border border-linea bg-white/60 p-4 text-xs leading-relaxed text-tinta/60">
          Orvelle es un negocio <strong>ficticio</strong>: proyecto conceptual de portafolio de{" "}
          <a href="https://github.com/AlonsoMartinezT" className="underline">Amtixo</a>. Nombre, productos, precios y
          personas son inventados para mostrar cómo se vería una tienda en línea completa, con gestión de catálogo
          y pedidos en tiempo real, para este rubro.
        </p>

        <Link href="/admin/login/" className="mt-6 inline-block text-xs text-tinta/30 hover:text-tinta/60">
          Equipo
        </Link>
      </div>
    </footer>
  );
}
