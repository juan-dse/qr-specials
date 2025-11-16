# Módulo 01 – Public Menu (QR Specials)

Pantalla pública que se muestra cuando el cliente escanea el QR.

## Cómo usar

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Prueba en local:

   ```bash
   npm run dev
   ```

   Luego abre: `http://localhost:5173/r/taqueria-el-guero`

3. Build de producción:

   ```bash
   npm run build
   ```

4. Deploy con Netlify CLI:

   ```bash
   netlify deploy
   netlify deploy --prod
   ```

## Contrato de la API

GET `/.netlify/functions/public-menu?slug=:slugRestaurante`

Respuesta OK con especial:

```json
{
  "ok": true,
  "restaurant": { "id": 1, "name": "Taquería El Güero", "slug": "taqueria-el-guero" },
  "special_today": { "id": 10, "name": "Taco Tuesday 3x$5" },
  "date": "YYYY-MM-DD"
}
```

Respuesta OK sin especial:

```json
{
  "ok": true,
  "restaurant": { ... },
  "special_today": null,
  "date": "YYYY-MM-DD"
}
```

Respuesta error:

```json
{ "ok": false, "error": "RESTAURANT_NOT_FOUND" }
```
