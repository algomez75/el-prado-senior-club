# El Prado Senior Club

Web bilingüe en **Next.js 16 / React 19 / TypeScript**, con App Router, prerenderizado estático, diseño adaptable, animaciones con respeto a movimiento reducido y formulario de contacto sin envíos simulados.

## Desarrollo

```sh
npm ci
npm run dev
```

Vista local: http://127.0.0.1:3000

```sh
npm run build
npm run typecheck
```

El resultado de producción está en `out/` y se puede servir en cualquier hosting estático. Después del build, `npm start` inicia un servidor local para revisar esa carpeta en el puerto 3000 (o el puerto indicado en `PORT`). El script de desarrollo utiliza Next.js; el de inicio sirve la exportación de producción.

## Cómo subirlo

**Vercel o una plataforma compatible con Next.js:** descomprime el ZIP de código, sube el proyecto a tu repositorio e impórtalo. Comando de instalación: `npm ci`. Comando de compilación: `npm run build`. El proyecto usa exportación estática y genera `out/`.

**Hostinger u otro hosting estático:** usa el ZIP de la web compilada. Extrae su contenido directamente dentro de `public_html` o de la carpeta pública de tu dominio. `index.html` debe quedar en la raíz pública, junto a `_next/`, `images/`, `en/` y `privacidad/`. No hace falta instalar Node.js para servir la versión compilada. Configura el hosting para servir `404.html` cuando una página no exista.

El ZIP del código excluye `node_modules`, cachés y Git; `npm ci` reconstruye las dependencias desde el lockfile. Para compilar desde el código necesitas Node.js 20.9 o superior y acceso a Internet para descargar dependencias y tipografías. La versión compilada ya incluye las tipografías.

## Páginas y SEO

- `/`: contenido principal en español.
- `/en/`: versión en inglés, marcada con `lang="en"` en su contenedor de contenido.
- `/privacidad/`: privacidad, con resumen en inglés.
- `/sitemap.xml` y `/robots.txt`.
- HTML prerenderizado, títulos y descripciones por idioma, canonical y hreflang, Open Graph e imagen para compartir, datos estructurados `LocalBusiness`.
- No se publican datos estructurados de valoraciones propias, horarios contradictorios, email ficticio o servicios clínicos no verificados.
- El dominio canónico se configura en `src/lib/site.ts`. Actualízalo al conectar el dominio definitivo.

El despliegue inicial en Sites es **privado**. Esa privacidad impide la indexación pública. La base técnica de SEO está preparada para el lanzamiento público con dominio final y datos validados; Next.js por sí solo no garantiza posicionamiento.

## Contacto: comportamiento real

El formulario valida nombre, teléfono, motivo y consentimiento. Prepara una consulta **en memoria del navegador**. Ofrece abrir la aplicación SMS con destino al (305) 967-8776, copiar el texto o llamar. El usuario realiza el envío final en su dispositivo. No hay base de datos, promesa de respuesta, solicitudes automáticas a un servicio externo ni almacenamiento del formulario.

**SMS no verificado:** falta confirmar si el teléfono comercial acepta mensajes. El sitio lo indica junto a la acción de SMS y ofrece llamada como alternativa.

**Email:** `contacto@elpradoseniorclub.example` es un marcador no operativo expresamente identificado. No se realizan envíos a ese dominio. Para recepción por correo real, confirmar el buzón y conectar un proveedor de formularios/correo con su configuración de producción. No introducir secretos en componentes cliente.

## Contenido y fuentes

Ver [investigación detallada](docs/INFORMACION-VERIFICADA.md). Incluye dirección, teléfonos, discrepancia de horarios, estado de licencia, resultado de búsquedas de redes sociales y límites de los servicios verificables.

Datos comerciales centralizados: `src/lib/site.ts`. Textos bilingües: `src/lib/content.ts`.

Antes del lanzamiento comercial: confirmar horario, email, perfiles oficiales, catálogo de servicios, disponibilidad para nuevos participantes, condiciones de transporte y seguros, estado de licencia y derechos de uso de fotos. Estos pendientes no bloquean la revisión privada del diseño.

## Imágenes

- Fotos del centro y logo encontrados en la ficha pública Google/Waze, con fuente documentada en la investigación. Se usan como material de referencia para esta versión privada; confirmar permiso para publicación comercial.
- La portada es una **imagen ilustrativa generada con IA**. Su procedencia se conserva en esta documentación; las etiquetas de procedencia se retiraron del diseño por solicitud del usuario. No muestra participantes ni instalaciones reales.
- Herramienta de portada: ImageGen integrada, sin CLI. Archivo del proyecto: `public/images/hero-compartir.webp` (derivado optimizado del PNG generado, conservado en el directorio original de imágenes generadas).
- Prompt final: `docs/PROMPT-PORTADA.md`.
- Fotografías optimizadas en WebP; las fuentes y tipografías se sirven localmente después del build.

## Accesibilidad y funcionamiento

Navegación por teclado, menú móvil con estado expandido, enlace para saltar al contenido, etiquetas de formularios, errores nativos, galería con diálogo modal, cierre Escape, anterior/siguiente con flechas, restauración de foco y texto alternativo. El contenido principal existe en el HTML sin JavaScript. Las animaciones de entrada se activan como mejora progresiva y respetan `prefers-reduced-motion`.

El registro de verificaciones está en `docs/VERIFICACION.md`.
