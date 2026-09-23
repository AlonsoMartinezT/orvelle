# Orvelle

**Estética y tienda de belleza · Tulum, Quintana Roo**: proyecto conceptual de portafolio de [Amtixo](https://github.com/AlonsoMartinezT).

> Orvelle es un negocio **ficticio**. Nombre, productos, precios y personas son inventados para mostrar cómo se vería una tienda en línea completa —con carrito, base de datos real y panel de administrador— para este rubro.

🔗 **Demo:** https://alonsomartinezt.github.io/orvelle/

## El brief

A diferencia del resto del portafolio (sitios estáticos con datos fijos), Orvelle necesitaba demostrar un caso real: un negocio local que vende productos físicos y necesita que **el dueño mismo pueda agregar y editar su catálogo** sin tocar código, con los pedidos cayendo en un solo lugar.

La solución: un frontend 100% estático (Next.js, export, hosteado en GitHub Pages, sin servidor propio) conectado a un backend real en **Supabase** — base de datos Postgres, autenticación y almacenamiento de imágenes — todo consumido directamente desde el navegador.

## Páginas

| Ruta | Qué resuelve |
| --- | --- |
| `/` | Portada con foto fundida, categorías, productos destacados (leídos en vivo de la base de datos) |
| `/tienda` | Catálogo completo con filtro por categoría y buscador |
| `/tienda/producto?slug=` | Ficha de producto con selector de cantidad y "agregar al carrito" |
| `/carrito` | Carrito editable, persistido en `localStorage` |
| `/checkout` | Formulario de datos → inserta el pedido en Supabase y abre WhatsApp con el resumen |
| `/contacto` | Datos de contacto, ubicación y horario |
| `/admin/login` | Acceso privado con Supabase Auth |
| `/admin` | Dashboard: total de productos y últimos pedidos |
| `/admin/productos` | Tabla de productos: activar/desactivar, destacar, editar, borrar |
| `/admin/productos/nuevo` y `/admin/productos/editar?id=` | Alta y edición de producto, con subida real de imagen a Supabase Storage |
| 404 | Página de error con el tono de marca |

## Backend real (Supabase)

- **Tablas:** `categorias`, `productos`, `pedidos`, con Row Level Security activo.
- **Reglas de acceso:** cualquiera puede leer el catálogo activo y crear un pedido (checkout público); solo un usuario autenticado (el admin) puede escribir en `categorias`/`productos` y leer/editar `pedidos`.
- **Storage:** bucket público `productos` para las imágenes; solo el admin autenticado puede subir/editar/borrar archivos.
- **Auth:** un único usuario administrador (acceso privado, no se documentan credenciales aquí).
- Como el sitio es exportación estática (sin servidor de Next.js), todo el panel admin corre 100% en el navegador contra la API de Supabase — no hay rutas de servidor ni variables de entorno secretas: la URL del proyecto y la llave pública (`publishable key`) son información no sensible por diseño de Supabase, la seguridad la da RLS.

## Detalles de implementación

- **Fotos fundidas** con `mask-image` (mismo tratamiento que el resto del portafolio, adaptado a la paleta vibrante de Orvelle).
- **Carrito** en Context de React + `localStorage`, independiente del catálogo remoto.
- Las páginas de detalle de producto y de edición de producto usan **parámetros de URL** (`?slug=`, `?id=`) en vez de rutas dinámicas de Next.js — así un producto nuevo agregado desde el panel admin tiene su página funcionando al instante, sin esperar un nuevo despliegue del sitio.
- Formularios con validación nativa y `:user-invalid`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) con exportación estática
- React 19 · Tailwind CSS v4 · TypeScript
- [Supabase](https://supabase.com) (Postgres, Auth, Storage) vía `@supabase/supabase-js`
- Playfair Display y Poppins (Google Fonts vía `next/font`)
- Despliegue automático a GitHub Pages con GitHub Actions

## Correr en local

```bash
npm install
npm run dev
```

`npm run build` genera el sitio estático en `out/`. En GitHub Pages el workflow define `NEXT_PUBLIC_BASE_PATH=/orvelle`.

## Fotografías

Fotos de [Unsplash](https://unsplash.com) bajo la [licencia de Unsplash](https://unsplash.com/license).

| Archivo | Crédito |
| --- | --- |
| `hero.jpg` | [Denise Chan](https://images.unsplash.com/photo-1671493234884-b1611bcf3e69) |
| `serum-vitamina-c.jpg` | [Elsa Olofsson](https://unsplash.com/photos/Pm0K9Y3EPUc) |
| `crema-hidratante-aloe.jpg` | [Birgith Roosipuu](https://images.unsplash.com/photo-1623143445418-40c192fa3d11) |
| `bruma-facial-agua-coco.jpg` | [Unsplash](https://images.unsplash.com/photo-1597931752949-98c74b5b159f) |
| `protector-solar-mineral.jpg` | [Unsplash](https://unsplash.com/photos/vX0YZZvZmqI) |
| `aceite-argan-multiusos.jpg` | [Denise Chan](https://images.unsplash.com/photo-1671493229066-f36e86b35841) |
| `shampoo-solido-coco.jpg` | [Denise Chan](https://images.unsplash.com/photo-1671493234254-15fc6c91aa87) |
| `mascarilla-reparadora.jpg` | [Unsplash](https://unsplash.com/photos/RsohkU8mrxU) |
| `paleta-tonos-arena.jpg` | [Unsplash](https://unsplash.com/photos/pEFWzRyO0Pw) |
| `base-ligera-tulum.jpg` | [Unsplash](https://unsplash.com/photos/eX-FeKAgPe0) |
| `labial-coral-mate.jpg` | [Unsplash](https://unsplash.com/photos/AdfA5C0c12M) |
| `perfume-flor-tuberosa.jpg` | [21 swan](https://unsplash.com/photos/3C5ZfCLSGC4) |
| `bruma-corporal-coco-lima.jpg` | [Siora Photography](https://unsplash.com/photos/LkT5-JCePUY) |
