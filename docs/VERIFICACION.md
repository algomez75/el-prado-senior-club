# Verificación — 29 de octubre de 2026

## Recorrido comprobado

La familia descubre el centro, consulta los servicios, amplía las fotos, cambia de idioma y prepara una consulta para elegir cómo enviarla.

- `npm run build`: compilación de producción, TypeScript y generación de rutas completadas.
- `npm run typecheck`: completado sin errores tras los últimos cambios.
- `npm start`: servidor de la exportación comprobado con respuestas 200 en inicio, inglés, privacidad, sitemap, robots e imagen de portada; respuesta 404 correcta para una ruta inexistente. Comprobados canonical, descripción, Open Graph, hreflang y JSON-LD en el HTML generado.
- Navegador de escritorio (1280 × 720): portada, servicios y contenido bilingüe renderizados; sin desbordamiento horizontal medido.
- Móvil (390 × 844): diseño adaptable, barra inferior de contacto y menú móvil comprobados. Abrir el menú muestra enlaces; seleccionar una sección lo cierra y actualiza `aria-expanded` a `false`.
- Galería: abre un diálogo con foco; siguiente cambia de la foto 1 a la 2; Escape cierra el diálogo. Incluye cuatro fotos navegables.
- Formulario: un teléfono corto no permite preparar la consulta. Con nombre, teléfono válido, motivo y consentimiento se genera el texto correcto, con enlace SMS que contiene el destinatario comercial y el mensaje codificado.
- Formulario: no se envió ningún SMS, correo o consulta real durante las pruebas. La disponibilidad de SMS del teléfono no está verificada. Copiar usa Clipboard API, con selección manual del texto si el navegador deniega el permiso; no se da por confirmada la copia en el navegador de pruebas.
- Cambio de idioma español/inglés comprobado en el navegador.
- Lectura de contactos, mapa, privacidad y preguntas frecuentes en el DOM. No se iniciaron llamadas reales.
- Se corrigieron un aviso de Next.js sobre desplazamiento suave, la herencia de Open Graph, el bloqueo de desplazamiento de la galería y un salto extra de línea del titular inglés.
- Revisión de React: contenido estático en componentes servidor; estado y efectos limitados a menú, animación progresiva, galería y formulario; limpieza de observadores; etiquetas, foco y teclado contemplados.

## Límites deliberados

El email es un marcador temporal no operativo. La información específica sobre horarios, licencia, servicios adicionales y redes sociales requiere confirmación del negocio; ver `INFORMACION-VERIFICADA.md`. El sitio no promete envío de formularios a un backend ni una bandeja de correo no configurada.
