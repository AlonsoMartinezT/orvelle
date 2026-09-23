import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
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
      <body className="flex min-h-dvh flex-col bg-hueso font-sans text-tinta">{children}</body>
    </html>
  );
}
