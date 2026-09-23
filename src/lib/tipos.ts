export type Categoria = {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
};

export type Producto = {
  id: string;
  categoria_id: string | null;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precio_oferta: number | null;
  imagen_url: string | null;
  stock: number;
  activo: boolean;
  destacado: boolean;
};

export type ItemCarrito = {
  producto_id: string;
  nombre: string;
  precio: number;
  imagen_url: string | null;
  cantidad: number;
};

export type Pedido = {
  id: string;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string | null;
  items: ItemCarrito[];
  total: number;
  estado: string;
  notas: string | null;
  creado_en: string;
};
