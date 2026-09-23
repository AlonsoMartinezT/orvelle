import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { ProveedorCarrito } from "@/lib/carrito";
import Encabezado from "@/components/Encabezado";
import Pie from "@/components/Pie";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Orvelle · Belleza en Tulum",
    template: "%s · Orvelle",
  },
  description:
    "Orvelle es un estudio de belleza y tienda de skincare, cabello, maquillaje y fragancias en Tulum, Quintana Roo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${playfair.variable} ${poppins.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-hueso font-sans text-tinta">
        <a
          href="#contenido"
          className="sr-only z-[60] rounded bg-coral px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <ProveedorCarrito>
          <Encabezado />
          <div id="contenido" className="flex-1">
            {children}
          </div>
          <Pie />
        </ProveedorCarrito>
      </body>
    </html>
  );
}
