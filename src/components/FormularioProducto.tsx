"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Categoria, Producto } from "@/lib/tipos";

const vacio = (): Omit<Producto, "id" | "creado_en"> => ({
  categoria_id: null,
  nombre: "",
  slug: "",
  descripcion: "",
  precio: 0,
  precio_oferta: null,
  imagen_url: null,
  stock: 0,
  activo: true,
  destacado: false,
});

const aSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function FormularioProducto({ productoId }: { productoId?: string }) {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Omit<Producto, "id" | "creado_en">>(vacio());
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(!!productoId);

  useEffect(() => {
    supabase.from("categorias").select("*").order("orden").then(({ data }) => setCategorias(data ?? []));
  }, []);

  useEffect(() => {
    if (!productoId) return;
    supabase
      .from("productos")
      .select("*")
      .eq("id", productoId)
      .single()
      .then(({ data }) => {
        if (data) setForm(data);
        setCargando(false);
      });
  }, [productoId]);

  const subirImagen = async (archivo: File) => {
    setSubiendoImagen(true);
    setError("");
    const nombreArchivo = `${Date.now()}-${aSlug(archivo.name.replace(/\.[^.]+$/, ""))}.${archivo.name.split(".").pop()}`;
    const { error: errorSubida } = await supabase.storage.from("productos").upload(nombreArchivo, archivo, {
      cacheControl: "3600",
      upsert: false,
    });
    setSubiendoImagen(false);
    if (errorSubida) {
      setError("No se pudo subir la imagen. ¿Iniciaste sesión?");
      return;
    }
    const { data } = supabase.storage.from("productos").getPublicUrl(nombreArchivo);
    setForm((f) => ({ ...f, imagen_url: data.publicUrl }));
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setError("");

    const payload = { ...form, slug: form.slug || aSlug(form.nombre) };
    const { error: errorGuardar } = productoId
      ? await supabase.from("productos").update(payload).eq("id", productoId)
      : await supabase.from("productos").insert(payload);

    setGuardando(false);
    if (errorGuardar) {
      setError(errorGuardar.message.includes("duplicate") ? "Ya existe un producto con ese nombre/slug." : "No se pudo guardar.");
      return;
    }
    router.push("/admin/productos/");
  };

  if (cargando) return <p className="mt-8 text-tinta/50">Cargando…</p>;

  return (
    <form onSubmit={guardar} className="mt-8 max-w-2xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Nombre</label>
        <input
          required
          value={form.nombre}
          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          className="campo"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Categoría</label>
        <select
          value={form.categoria_id ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, categoria_id: e.target.value || null }))}
          className="campo"
        >
          <option value="">Sin categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Descripción</label>
        <textarea
          value={form.descripcion}
          onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
          className="campo"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Precio (MXN)</label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm((f) => ({ ...f, precio: Number(e.target.value) }))}
            className="campo"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Precio de oferta (opcional)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={form.precio_oferta ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, precio_oferta: e.target.value ? Number(e.target.value) : null }))}
            className="campo"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Stock</label>
        <input
          required
          type="number"
          min={0}
          value={form.stock}
          onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
          className="campo"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Imagen del producto</label>
        {form.imagen_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.imagen_url} alt="" className="mb-3 h-32 w-32 rounded-xl object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && subirImagen(e.target.files[0])}
          className="text-sm"
        />
        {subiendoImagen && <p className="mt-1 text-sm text-tinta/50">Subiendo…</p>}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={form.activo} onChange={(e) => setForm((f) => ({ ...f, activo: e.target.checked }))} />
          Activo (visible en la tienda)
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={form.destacado} onChange={(e) => setForm((f) => ({ ...f, destacado: e.target.checked }))} />
          Destacado (en inicio)
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={guardando || subiendoImagen}
        className="rounded-full bg-coral px-8 py-3 font-semibold text-white transition hover:brightness-105 disabled:opacity-60"
      >
        {guardando ? "Guardando…" : "Guardar producto"}
      </button>
    </form>
  );
}
