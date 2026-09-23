const WHATSAPP_NUMERO = "529841234567";

export default function Contacto() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-tinta">Contacto</h1>
      <p className="mt-3 text-tinta/70">
        Escríbenos para dudas sobre tu pedido, tratamientos en cabina, o si quieres que te ayudemos a armar tu rutina.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMERO}`}
          target="_blank"
          rel="noopener"
          className="rounded-2xl border border-linea bg-white p-6 transition hover:border-coral"
        >
          <p className="font-display text-lg">WhatsApp</p>
          <p className="mt-1 text-sm text-tinta/60">Respuesta el mismo día, en horario de cabina.</p>
        </a>
        <div className="rounded-2xl border border-linea bg-white p-6">
          <p className="font-display text-lg">Cabina Orvelle</p>
          <p className="mt-1 text-sm text-tinta/60">Av. Cobá, Tulum Centro, Quintana Roo</p>
        </div>
        <div className="rounded-2xl border border-linea bg-white p-6">
          <p className="font-display text-lg">Horario</p>
          <p className="mt-1 text-sm text-tinta/60">Martes a domingo, 10:00–19:00</p>
        </div>
        <div className="rounded-2xl border border-linea bg-white p-6">
          <p className="font-display text-lg">Correo</p>
          <p className="mt-1 text-sm text-tinta/60">hola@orvelle.mx</p>
        </div>
      </div>
    </main>
  );
}
