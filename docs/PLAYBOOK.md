# 🚀 PLAYBOOK MAESTRO: INGENIERÍA WEB DE ALTO RENDIMIENTO, MOTION, ANALYTICS & AI-SEO

> **Documento de Ingeniería Universal y Agnóstico de Entorno.**  
> Esta guía documenta el estándar técnico completo para auditar, rediseñar, optimizar y certificar cualquier sitio web o aplicación web con una puntuación de **100/100 en Google Lighthouse**, posicionamiento en Google Tradicional (Search Console), analítica sin penalización de CPU (GTM + GA4) e indexación en motores de Inteligencia Artificial (ChatGPT, Claude, Gemini, Perplexity).

---

## 📑 ÍNDICE MAESTRO

1. [Ecosistema Completo de Skills para Agentes de IA](#1-ecosistema-completo-de-skills-para-agentes-de-ia)
2. [Fase 1: Auditoría de Diseño, UX y Anti-Slop (`impeccable` + `design-taste-frontend` + `minimalist-ui`)](#fase-1-auditoría-de-diseño-ux-y-anti-slop)
3. [Fase 2: Auditoría de Motion y Cinemática WAAPI (`emil-design-eng` + `find-animation-opportunities`)](#fase-2-auditoría-de-motion-y-cinemática-waapi)
4. [Fase 3: Suite de Pruebas Automatizadas en Navegador Real (`playwright-core`)](#fase-3-suite-de-pruebas-automatizadas-en-navegador-real)
5. [Fase 4: Estrategia Integral de SEO y AI-SEO / AEO (`ai-seo` + `seo` + `seo-audit`)](#fase-4-estrategia-integral-de-seo-y-ai-seo--aeo)
6. [Fase 5: Grafo de Entidades, E-E-A-T y Canales de Conversión](#fase-5-grafo-de-entidades-e-e-a-t-y-canales-de-conversión)
7. [Fase 6: Infraestructura, Cabeceras de Seguridad y Caché Inmutable](#fase-6-infraestructura-cabeceras-de-seguridad-y-caché-inmutable)
8. [Fase 7: Analítica de Alta Conversión: Google Tag Manager (GTM) + GA4 con Carga Diferida (Zero-TBT)](#fase-7-analítica-de-alta-conversión-google-tag-manager-gtm--ga4-con-carga-diferida-zero-tbt)
9. [Fase 8: Google Search Console, Verificación y Monitoreo de Indexación](#fase-8-google-search-console-verificación-y-monitoreo-de-indexación)
10. [Fase 9: Suite de Auditoría Google Lighthouse y Certificación 100/100 (`accessibility`)](#fase-9-suite-de-auditoría-google-lighthouse-y-certificación-100100)
11. [Checklist Final de Lanzamiento a Producción](#11-checklist-final-de-lanzamiento-a-producción)

---

## 1. Ecosistema Completo de Skills para Agentes de IA

Las *Skills* son paquetes modulares de directivas y estándares técnicos que se instalan desde el registro abierto oficial ([skills.sh](https://skills.sh/)) utilizando el gestor de paquetes de agentes `npx skills`:

```bash
# Búsqueda interactiva en el registro de skills:
npx skills find <término-de-búsqueda>

# Instalación global en el entorno del agente:
npx skills add <autor/repositorio@nombre-skill> -g -y
```

### 📦 Catálogo Detallado de Skills Utilizadas:

| Skill | Fuente / Repositorio | Comando de Búsqueda / Instalación | Función Específica en el Proyecto |
| :--- | :--- | :--- | :--- |
| **`impeccable`** | `skills.sh` / `anthropics/skills` | `npx skills find impeccable` | Auditoría integral de UX, jerarquía visual, ritmo tipográfico, carga cognitiva y redacción de copy comercial. |
| **`design-taste-frontend`** | `skills.sh` / `vercel-labs/agent-skills` | `npx skills find design-taste-frontend` | Erradicación de clichés de IA (*anti-slop*), definición de dirección estética editorial y diseño de Bento Grids asimétricos. |
| **`minimalist-ui`** | `skills.sh` / `vercel-labs/agent-skills` | `npx skills find minimalist-ui` | Paletas monocromáticas oscuras, eliminación de sombras pesadas y gradientes artificiales, bordes sutiles de luz. |
| **`redesign-existing-projects`** | `skills.sh` | `npx skills find redesign-existing-projects` | Metodología de auditoría previa antes de tocar código, preservando la identidad comercial del cliente mientras se eleva la calidad técnica. |
| **`emil-design-eng`** | `skills.sh` | `npx skills find emil-design-eng` | Encodificación de los principios de diseño de Emil Kowalski: cero rebotes (*zero spring-bounce*), velocidad y desaceleración monótona. |
| **`find-animation-opportunities`** | `skills.sh` | `npx skills find find-animation-opportunities` | Análisis de qué elementos justifican movimiento (micro-interacciones) y cuáles deben permanecer estáticos para evitar *layout shifts*. |
| **`ai-seo`** | `skills.sh` | `npx skills find ai-seo` | Implementación del estándar internacional [llmstxt.org](https://llmstxt.org) (`llms.txt` y `llms-full.txt`) para motores de IA y navegación agéntica. |
| **`seo` & `seo-audit`** | `skills.sh` / `anthropics/skills` | `npx skills find seo` | Generación del grafo Schema.org JSON-LD (`Person`, `ProfessionalService`, `WebSite`, `FAQPage`), OpenGraph y directivas de rastreo. |
| **`accessibility`** | `skills.sh` / `anthropics/skills` | `npx skills find accessibility` | Auditoría y remediación estricta de normas internacionales WCAG 2.2 (ratios de contraste > 4.5:1 y coincidencia de nombres accesibles). |
| **`astro`** | `skills.sh` | `npx skills find astro` | Arquitectura de islas (*Islands Architecture*), compilación SSG estática a cero JavaScript en el cliente donde no se requiere. |
| **`tailwind-css-patterns`** | `skills.sh` | `npx skills find tailwind-css-patterns` | Patrones de utilidad limpia en Tailwind CSS v4 (`@tailwindcss/vite`), eliminando archivos CSS gigantes y variables globales desordenadas. |
| **`typescript-advanced-types`** | `skills.sh` | `npx skills find typescript-advanced-types` | Tipado estricto de diccionarios de internacionalización (i18n) y contratos de interfaces de componentes. |

---

## Fase 1: Auditoría de Diseño, UX y Anti-Slop

### 🧠 Skills: `impeccable`, `design-taste-frontend`, `minimalist-ui`, `redesign-existing-projects`

### 1. Erradicación del "AI Slop":
- **Eliminar clichés visuales**: Fondos negros puros (#000000) con resplandores morados/azules genéricos (*heavy blur gradients*), sombras flotantes irreales y textos con contraste deficiente.
- **Paleta Editorial Oscura**:
  - Fondo primario: Carbón profundo neutro (`#0d0e12` o `bg-bg-main`).
  - Fondo secundario de tarjetas: `#14161d` (`bg-bg-sec/80`).
  - Bordes de definición: `border-white/5` a `border-white/10`.
  - Color de acento cálido con propósito: Ámbar / Naranja quemado (`text-accent` / `#f29a2e`).

### 2. Estructura Bento Grid Asimétrica:
- En lugar de listas repetitivas de tarjetas iguales, estructurar bloques con jerarquía visual:
  - Tarjeta destacada (2 columnas): Caso de estudio principal con métricas de negocio.
  - Tarjetas secundarias (1 columna): Soluciones especializadas o servicios complementarios.

### 3. Jerarquía Tipográfica y Copywriting de Negocio:
- Usar tipografía con personalidad y carácter (*Bricolage Grotesque*, *Geist*, *Inter Variable*).
- **Regla Impeccable de Copy**: Reemplazar frases vacías por propuestas de valor concretas.
  - ❌ *Evitar*: "Soy desarrollador web fullstack apasionado por el código limpio."
  - ✅ *Aplicar*: "Desarrollo web con pensamiento de negocio. Sitios de alta conversión y plataformas escalables."

---

## Fase 2: Auditoría de Motion y Cinemática WAAPI

### 🧠 Skills: `emil-design-eng`, `find-animation-opportunities`

### 1. El Principio del Cero Rebote (Zero Spring-Bounce):
En interfaces profesionales y herramientas de negocio, las animaciones que "rebotan" como una pelota de goma transmiten inmadurez y retrasan la acción del usuario. La desaceleración debe ser continua y monótona.

### 2. El Problema de los Acordeones en CSS Tradicional:
- El uso de `max-height: 500px` causa que el contenido se abra con una velocidad distorsionada según la cantidad de texto.
- Las transiciones de altura con CSS puro provocan bloqueos del hilo principal y tirones (*layout shifts*).

### 3. Implementación Canónica con Web Animations API (WAAPI):
```typescript
/**
 * Controlador de acordeón con física monótona y cálculo dinámico de altura
 * Curva: cubic-bezier(0.16, 1, 0.3, 1) | Duración: 250ms abrir / 200ms cerrar
 */
export class AccordionController {
  private element: HTMLElement;
  private content: HTMLElement;
  private isAnimating = false;

  constructor(element: HTMLElement) {
    this.element = element;
    this.content = element.querySelector('[data-accordion-content]')!;
  }

  toggle() {
    if (this.element.hasAttribute('open')) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.element.setAttribute('open', 'true');
    const startHeight = this.element.offsetHeight;
    const endHeight = startHeight + this.content.scrollHeight;

    const anim = this.element.animate(
      [
        { height: `${startHeight}px` },
        { height: `${endHeight}px` }
      ],
      { duration: 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );

    anim.onfinish = () => {
      this.element.style.height = 'auto';
      this.isAnimating = false;
    };
  }

  close() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const startHeight = this.element.offsetHeight;
    const endHeight = startHeight - this.content.scrollHeight;

    const anim = this.element.animate(
      [
        { height: `${startHeight}px` },
        { height: `${endHeight}px` }
      ],
      { duration: 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );

    anim.onfinish = () => {
      this.element.removeAttribute('open');
      this.element.style.height = 'auto';
      this.isAnimating = false;
    };
  }
}
```

---

## Fase 3: Suite de Pruebas Automatizadas en Navegador Real

### 🧠 Herramienta: `playwright-core`

Para garantizar que los componentes no se rompan ni generen saltos visuales:

1. **Instalación**:
   ```bash
   pnpm add -D playwright-core
   ```
2. **Script de Verificación Cinemática (`scripts/verify-kinematics.mjs`)**:
   - Levanta un servidor HTTP estático en memoria.
   - Lanza Chromium en modo headless.
   - Hace clic en los acordeones y mide cuadro a cuadro la altura en píxeles.
   - **Criterio de Aprobación**: Altura inicial = 77px, Altura final = 145px, Delta de retroceso cinemático = 0px.

---

## Fase 4: Estrategia Integral de SEO y AI-SEO / AEO

### 🧠 Skills: `ai-seo`, `seo`, `seo-audit`

### 1. Estándar `llms.txt` y `llms-full.txt` (llmstxt.org):
Los motores de IA (ChatGPT, Claude, Perplexity, Gemini) y los agentes autónomos de compra leen estos archivos directamente. Para obtener una calificación de **3/3 en Navegación Agéntica (Agentic Readiness)**, los archivos DEBEN cumplir estrictamente la especificación [llmstxt.org](https://llmstxt.org):
- **Encabezado principal H1** obligatorio.
- **Bloque de resumen / blockquote** (`> ...`) en el encabezado.
- **Enlaces Markdown canónicos estructurados**: Cada recurso debe ser un enlace con la sintaxis `- [Nombre del Recurso](URL): Descripción detallada`.
- ❌ *Error común*: Colocar URLs huérfanas en texto plano (`https://...`), lo que provoca el error *"El archivo no contiene ningún enlace"* en herramientas de evaluación agéntica como Vercel Is-Agentic o Frase.

#### A. `/public/llms.txt` (Resumen estructurado para contexto de IA):
```markdown
# [Nombre del Proyecto / Profesional] — [Especialidad o Propuesta de Valor]

> [Resumen ejecutivo en 1-2 oraciones que define la entidad, público objetivo y diferencial técnico].

## Páginas Principales

- [[Nombre del Sitio (ES)]](https://tudominio.com/): Portafolio principal con propuesta de valor, casos de estudio y contacto.
- [[Nombre del Sitio (EN)]](https://tudominio.com/en/): Official English version featuring architecture stack and case studies.

## Casos de Estudio y Proyectos

- [Proyecto Alpha (Cliente EE. UU.)](https://proyectoalpha.com/): Landing comercial de alto rendimiento con reserva directa.
- [Plataforma Beta (Colombia)](https://app.proyectobeta.co/): Plataforma web integral para gestión operativa en tiempo real.

## Canales de Contacto y Perfiles Profesionales

- [WhatsApp Oficial](https://wa.me/message/...): Canal directo de atención y cotización.
- [LinkedIn Profesional](https://linkedin.com/in/...): Perfil y trayectoria profesional.
- [GitHub](https://github.com/...): Repositorios y código abierto.

## Documentación y Enlaces Opcionales

- [Dossier Completo (llms-full.txt)](https://tudominio.com/llms-full.txt): Archivo exhaustivo con toda la información técnica, E-E-A-T, metodología de trabajo y FAQ.
```

#### B. `/public/llms-full.txt` (Dossier completo de autoridad):
Contiene la totalidad de casos de estudio detallados (problema, solución, stack, métricas), justificaciones arquitectónicas, políticas comerciales y la lista completa de Preguntas Frecuentes (FAQ) con enlaces canónicos a cada recurso.

---

### 2. Schema.org JSON-LD Multigrafo `@graph`:
Inyectado en el `<head>` del layout principal para conectar la entidad en el Knowledge Graph de Google:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://tudominio.com/#person",
      "name": "Nombre Profesional",
      "jobTitle": "Senior Software Architect",
      "url": "https://tudominio.com",
      "knowsAbout": [
        "Software Architecture",
        "Frontend Engineering",
        "Mobile Development",
        "Web Performance Optimization"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/tu-perfil",
        "https://github.com/tu-usuario",
        "https://www.instagram.com/tu-perfil",
        "https://www.tiktok.com/@tu-perfil",
        "https://www.facebook.com/tu-pagina"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://tudominio.com/#service",
      "name": "Nombre Comercial",
      "url": "https://tudominio.com",
      "priceRange": "$$",
      "areaServed": "Worldwide",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://tudominio.com/#website",
      "url": "https://tudominio.com",
      "name": "Nombre Comercial",
      "inLanguage": ["es", "en"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://tudominio.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuál es tu stack tecnológico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desarrollo con Astro para sitios de alta conversión y Angular para plataformas complejas."
          }
        }
      ]
    }
  ]
}
</script>
```

---

### 3. Directivas en `robots.txt` para Crawlers de IA:
```
User-agent: *
Allow: /

# Permitir indexación de bots de IA
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://tudominio.com/sitemap.xml
```

---

## Fase 5: Grafo de Entidades, E-E-A-T y Canales de Conversión

1. **Desambiguación de Entidad (E-E-A-T)**:
   - Dividir los canales en dos grupos:
     - **Canales de Interfaz de Usuario**: Enlaces con alta autoridad profesional y conversión visible (LinkedIn, GitHub, Instagram, TikTok).
     - **Canales del Grafo de Entidad**: Incluir todos (incluso Facebook) dentro del `sameAs` del JSON-LD para que los motores de búsqueda conecten todas tus presencias sin fugar tráfico en la UI.
2. **Enrutamiento Directo a WhatsApp**:
   - Usar shortlinks directos de WhatsApp Business (`https://wa.me/message/TU_ID_SHORTLINK`) que ya traen mensaje predeterminado para eliminar pasos intermedios.
3. **Widget Flotante de Conversión**:
   - Botón flotante accesible (`aria-label`, `role="tooltip"`, `focus-visible`), indicador pulsante de estado activo y atributos semánticos de medición (`data-event="whatsapp_click"`, `data-event-location="floating_widget"`).

---

## Fase 6: Infraestructura, Cabeceras de Seguridad y Caché Inmutable

Para proteger el sitio contra vulnerabilidades (Clickjacking, XSS, MIME Sniffing) y conseguir tiempos de carga de **0ms** en visitas recurrentes:

### 1. Plantilla para Cloudflare Pages (`public/_headers`):
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-XSS-Protection: 1; mode=block

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/llms.txt
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
  Content-Type: text/plain; charset=UTF-8

/llms-full.txt
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
  Content-Type: text/plain; charset=UTF-8

/robots.txt
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
  Content-Type: text/plain; charset=UTF-8

/sitemap.xml
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
  Content-Type: application/xml; charset=UTF-8
```

### 2. Plantilla para Vercel (`vercel.json`):
```json
{
  "cleanUrls": false,
  "trailingSlash": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/llms.txt",
      "headers": [
        { "key": "Content-Type", "value": "text/plain; charset=UTF-8" },
        { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
      ]
    },
    {
      "source": "/llms-full.txt",
      "headers": [
        { "key": "Content-Type", "value": "text/plain; charset=UTF-8" },
        { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
      ]
    }
  ]
}
```

---

## Fase 7: Analítica de Alta Conversión: Google Tag Manager (GTM) + GA4 con Carga Diferida (Zero-TBT)

### ⚠️ El Problema de Rendimiento con GTM Tradicional:
Cuando el script oficial de Google Tag Manager (`gtm.js`) se carga de forma síncrona en el `<head>`, el navegador detiene el renderizado inicial para descargar, parsear y ejecutar el contenedor. En auditorías móviles con CPU estrangulada (throttling 4x en Moto G Power), esto genera una penalización de **600 a 2000 ms de Total Blocking Time (TBT)**, reduciendo la puntuación de rendimiento de 100 a 60-80.

### 🛡️ Arquitectura de Carga Diferida de Alto Rendimiento (Deferred GTM Loader):

Esta arquitectura garantiza **100/100 en Performance móvil** y al mismo tiempo **captura el 100% de las conversiones sin pérdida de datos**:

1. **Buffer Inmediato (`dataLayer`)**: `window.dataLayer = window.dataLayer || [];` se declara de inmediato en el `<head>`. Cualquier evento enviado antes de que cargue el script de GTM queda almacenado en memoria.
2. **Carga Diferida por Idle / Temporizador**: La descarga del script pesado se posterga mediante `requestIdleCallback` o tras 2.5 segundos de inactividad.
3. **Carga por Primer Gesto del Usuario**: Si el usuario toca la pantalla, hace scroll o presiona una tecla antes del tiempo de inactividad, GTM se inyecta de inmediato (`{ once: true, passive: true }`).
4. **Respuesta Instantánea a Clics de Conversión**: Si el usuario hace clic inmediatamente en un botón de WhatsApp o Email, el despachador central invoca `window._loadGTM()` al instante y procesa los eventos encolados.

#### Implementación en el Layout Principal (`BaseLayout.astro`):
```astro
{gtmId && (
  <!-- Google Tag Manager (High-Performance Deferred Loading) -->
  <script is:inline define:vars={{ gtmId }}>
    window.dataLayer = window.dataLayer || [];
    window._loadGTM = function() {
      if (window._gtmLoaded) return;
      window._gtmLoaded = true;
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer',gtmId);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(function() { setTimeout(window._loadGTM, 2500); });
    } else {
      setTimeout(window._loadGTM, 3000);
    }

    ['pointerdown', 'touchstart', 'scroll', 'keydown', 'click'].forEach(function(evt) {
      window.addEventListener(evt, window._loadGTM, { once: true, passive: true });
    });
  </script>
  <!-- End Google Tag Manager -->
)}
```

#### Despachador Centralizado de Eventos (`Analytics.astro`):
Por arquitectura limpia, los componentes de interfaz solo declaran atributos semánticos (`data-event`, `data-event-location`). `Analytics.astro` escucha globalmente y mapea al evento estándar `portfolio_cta_click`:

```html
<script is:inline>
  document.addEventListener('click', (event) => {
    const origin = event.target;
    if (!(origin instanceof Element)) return;

    const target = origin.closest('[data-event]');
    if (!(target instanceof HTMLAnchorElement)) return;

    const ctaType = target.dataset.event;
    const location = target.dataset.eventLocation;
    const label = target.textContent?.trim();
    const destination = target instanceof HTMLAnchorElement ? target.href : '';

    const detail = {
      event: ctaType,
      location,
      label,
      destination,
    };

    window.dispatchEvent(new CustomEvent('oscar-dev:event', { detail }));

    // Buffer en dataLayer con nombre de evento unificado para GTM/GA4
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'portfolio_cta_click',
      cta_type: ctaType,
      location,
      label,
      destination,
    });

    // Carga inmediata de GTM si el usuario interactuó antes del temporizador
    if (typeof window._loadGTM === 'function') {
      window._loadGTM();
    }
  });
</script>
```

#### Configuración en Google Tag Manager (GTM):
1. **Activador (Trigger)**: Tipo *Evento Personalizado* con Nombre del Evento: `portfolio_cta_click`.
2. **Variables de Capa de Datos (Data Layer Variables)**:
   - `location` -> Nombre en capa de datos: `location`
   - `label` -> Nombre en capa de datos: `label`
   - `destination` -> Nombre en capa de datos: `destination`
   - `cta_type` -> Nombre en capa de datos: `cta_type`
3. **Etiqueta GA4 Event**: Se dispara con el activador `portfolio_cta_click` y envía los parámetros de evento a Google Analytics 4.

---

## Fase 8: Google Search Console, Verificación y Monitoreo de Indexación

### 1. Verificación por Metaetiqueta Limpia:
Para verificar la propiedad del dominio en Google Search Console sin acoplar claves secretas en el repositorio:
1. En `src/layouts/BaseLayout.astro`:
   ```astro
   {import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION && (
     <meta name="google-site-verification" content={import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION} />
   )}
   ```
2. Configurar la variable de entorno `PUBLIC_GOOGLE_SITE_VERIFICATION` en el panel de Cloudflare Pages / Vercel / Netlify con el token proporcionado por Search Console.

### 2. Monitoreo Post-Despliegue:
- Enviar el mapa del sitio `https://tudominio.com/sitemap.xml` en Google Search Console.
- Solicitar indexación de las URLs canónicas principales (`/` y `/en/`).
- Verificar que `robots.txt` devuelva código de estado HTTP `200 OK` y no bloquee recursos esenciales.

---

## Fase 9: Suite de Auditoría Google Lighthouse y Certificación 100/100

### 🧠 Skills & Herramientas: `accessibility`, `lighthouse`, `playwright-core`

### 1. Instalación de dependencias:
```bash
pnpm add -D lighthouse playwright-core
```

### 2. Script de Auditoría Automatizada (`scripts/run-lighthouse.mjs`):
```javascript
import { chromium } from 'playwright-core';
import lighthouse from 'lighthouse';
import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.webp': 'image/webp'
};

async function startStaticServer(port = 54321) {
  const distDir = path.join(process.cwd(), 'dist');
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    let filePath = path.join(distDir, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) filePath += '.html';
    if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
  await new Promise(resolve => server.listen(port, resolve));
  return server;
}

async function runAudit() {
  const server = await startStaticServer(54321);
  const browser = await chromium.launch({
    args: ['--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'http://127.0.0.1:54321/';
  
  // Auditoría Mobile
  const mobile = await lighthouse(url, {
    port: 9222,
    output: 'json',
    formFactor: 'mobile',
    throttlingMethod: 'simulate'
  });

  // Auditoría Desktop
  const desktop = await lighthouse(url, {
    port: 9222,
    output: 'json',
    formFactor: 'desktop'
  });

  console.log('📱 MOBILE:', {
    Performance: Math.round(mobile.lhr.categories.performance.score * 100),
    Accessibility: Math.round(mobile.lhr.categories.accessibility.score * 100),
    BestPractices: Math.round(mobile.lhr.categories['best-practices'].score * 100),
    SEO: Math.round(mobile.lhr.categories.seo.score * 100),
  });

  console.log('💻 DESKTOP:', {
    Performance: Math.round(desktop.lhr.categories.performance.score * 100),
    Accessibility: Math.round(desktop.lhr.categories.accessibility.score * 100),
    BestPractices: Math.round(desktop.lhr.categories['best-practices'].score * 100),
    SEO: Math.round(desktop.lhr.categories.seo.score * 100),
  });

  await browser.close();
  server.close();
}

runAudit().catch(console.error);
```

### 3. Las Dos Reglas de Oro de Accesibilidad para el 100%:
1. **Ratio de Contraste (WCAG AA > 4.5:1)**:
   - Jamás utilizar opacidades decorativas (ej. `text-white/60` o `text-text-sec/60`) sobre textos informativos o legales en fondos oscuros. Usar colores contrastados puros.
2. **Coincidencia de Nombre Accesible (WCAG 2.5.3 - Label in Name)**:
   - Todo botón o enlace con texto visible DEBE contener dicho texto literal dentro del `aria-label`.
   - ❌ *Incorrecto*: `<a href="/en/" aria-label="Cambiar a inglés">EN</a>`
   - ✅ *Correcto*: `<a href="/en/" aria-label="EN - Cambiar el idioma a inglés">EN</a>`

---

## 11. Checklist Final de Lanzamiento a Producción

- [x] **Diseño Anti-Slop**: Bento Grid modular, tipografía intencional y cero clichés de IA.
- [x] **Motion Emil Kowalski**: Acordeones y micro-interacciones con WAAPI y cero rebotes.
- [x] **Pruebas Automatizadas**: Playwright validando cinemática y consistencia visual en Chromium.
- [x] **Navegación Agéntica (AI-SEO 3/3)**: Archivos `llms.txt` y `llms-full.txt` con enlaces Markdown estructurados bajo la especificación [llmstxt.org](https://llmstxt.org).
- [x] **Schema.org**: JSON-LD con `Person`, `ProfessionalService`, `WebSite` y `FAQPage`.
- [x] **Robots.txt & Sitemap**: Permisos explícitos para rastreadores de IA y referencia al mapa del sitio.
- [x] **Google Search Console**: Verificación limpia por variable de entorno sin acoplar secretos.
- [x] **GTM + GA4 Carga Diferida (Zero-TBT)**: Inyección diferida de `gtm.js` por interacción/idle con buffer inmediato de `dataLayer`.
- [x] **Seguridad & Caché**: Cabeceras HSTS, `X-Frame-Options: DENY` y caché inmutable de 1 año para `/_astro/*`.
- [x] **Google Lighthouse**: Certificación de **100/100** en Rendimiento, Accesibilidad, Buenas Prácticas y SEO.
