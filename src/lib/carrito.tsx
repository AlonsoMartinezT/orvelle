"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "./tipos";

const CLAVE_STORAGE = "orvelle_carrito";

type ContextoCarrito = {
  items: ItemCarrito[];
  total: number;
  cantidadTotal: number;
  agregar: (producto: Producto, cantidad?: number) => void;
  actualizarCantidad: (producto_id: string, cantidad: number) => void;
  quitar: (producto_id: string) => void;
  vaciar: () => void;
};

const Contexto = createContext<ContextoCarrito | null>(null);

export function ProveedorCarrito({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_STORAGE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // localStorage no disponible: el carrito solo vive en memoria
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      // no pasa nada si no se puede persistir
    }
  }, [items, listo]);

  const agregar = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.producto_id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.producto_id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i,
        );
      }
      const precio = producto.precio_oferta ?? producto.precio;
      return [
        ...prev,
        {
          producto_id: producto.id,
          nombre: producto.nombre,
          precio,
          imagen_url: producto.imagen_url,
          cantidad,
        },
      ];
    });
  };

  const actualizarCantidad = (producto_id: string, cantidad: number) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.producto_id !== producto_id)
        : prev.map((i) => (i.producto_id === producto_id ? { ...i, cantidad } : i)),
    );
  };

  const quitar = (producto_id: string) =>
    setItems((prev) => prev.filter((i) => i.producto_id !== producto_id));

  const vaciar = () => setItems([]);

  const total = useMemo(() => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0), [items]);
  const cantidadTotal = useMemo(() => items.reduce((acc, i) => acc + i.cantidad, 0), [items]);

  return (
    <Contexto.Provider value={{ items, total, cantidadTotal, agregar, actualizarCantidad, quitar, vaciar }}>
      {children}
    </Contexto.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de ProveedorCarrito");
  return ctx;
}
