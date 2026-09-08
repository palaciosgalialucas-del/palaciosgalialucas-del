# Mundo Gambito — Landing

Landing page de **Mundo Gambito**, programa de pedagogía de ajedrez para escuelas rurales.
Sitio estático: HTML + CSS + JS, sin build, sin framework. Se publica en Vercel con cada
push a `main`.

La URL de producción está en el dashboard de Vercel, en el proyecto conectado a este
repositorio.

## Estructura

```
.
├── public/
│   ├── index.html      # la página
│   ├── styles.css      # todo el CSS
│   ├── main.js         # envío del formulario a Formspree
│   └── favicon.svg     # ícono de la pestaña
├── vercel.json         # config de deploy (sitio estático)
├── package.json        # sólo para levantar el server local
└── README.md
```

> El diseño (paleta, tipografías y layout) viene de una landing anterior y se mantuvo sin
> cambios: `styles.css` y `vercel.json` no se tocaron al adaptar el contenido.

---

## 1. El formulario y los contactos (Formspree)

**Ya está conectado.** El formulario envía a Formspree, al formulario
*Mundo Gambito — Contacto*, endpoint `https://formspree.io/f/meaqprwv`, cableado en el
atributo `action` del `<form>` en `public/index.html`.

No hay claves ni variables de entorno: el endpoint es público por diseño, va en el HTML.

### Probar que llegan los contactos

1. Levantá el sitio en local (sección 2) y mandá el formulario con datos reales.
2. Formspree puede pedirte que **confirmes el primer envío por mail**: abrí ese mail y
   hacé click en el link. Es una sola vez, por formulario.
3. Entrá a tu panel en https://formspree.io y confirmá que la entrada aparece en
   **Submissions**. Desde ahí se exporta a CSV.

### Elegir a qué email llegan

En el panel de Formspree: el formulario → **Settings** → sección de emails. Podés poner
varios destinatarios. No hace falta tocar el código.

### Qué datos llegan

| Campo       | Contenido                                                      |
|-------------|----------------------------------------------------------------|
| `nombre`    | Nombre de quien escribe (obligatorio)                          |
| `escuela`   | Escuela y paraje o localidad (obligatorio)                     |
| `provincia` | Provincia elegida en el desplegable                            |
| `email`     | Email de contacto (obligatorio)                                |
| `mensaje`   | Texto libre, opcional                                          |
| `modalidad` | Modalidad que miraba antes de escribir. Queda **vacío** si llegó al formulario scrolleando en vez de tocar "Quiero esta modalidad": es el comportamiento esperado |
| `_subject`  | Asunto del mail: *Nuevo contacto — Mundo Gambito*              |

También hay un campo trampa (`_gotcha`), invisible para las personas: si un bot lo
completa, Formspree descarta el envío automáticamente.

### Cómo funciona el envío

`public/main.js` manda los datos con `fetch` y `Accept: application/json`, así el visitante
nunca sale de la página: al confirmarse el envío aparece la caja verde con su email. Si el
envío falla, el motivo se muestra en rojo debajo del botón y el botón se rehabilita — el
contacto no se pierde en silencio. Si el visitante tiene JavaScript desactivado, el `<form>`
hace POST nativo a Formspree y ve la pantalla de confirmación de ellos.

Está escrito en JavaScript vanilla, sin dependencias.

**Plan gratuito:** 50 envíos por mes.

### Cambiar de formulario

Reemplazá el ID en el `action` del `<form>` en `public/index.html`. Es el único lugar donde
aparece el endpoint.

> El campo oculto de modalidad se llama `modalidad`, pero su `id` sigue siendo `plan`
> porque `main.js` lo busca por ese id. Si cambiás uno, cambiá el otro.

---

## 2. Correr el proyecto en local

**Opción A — con Node (recomendada)**

```bash
npm run dev
```

Abrí **http://localhost:3000**

**Opción B — con Python** (ya viene en Mac y Linux)

```bash
cd public
python3 -m http.server 3000
```

Abrí **http://localhost:3000**

**Opción C — abrir el archivo directo**

Doble click en `public/index.html`. Sirve para ver el diseño, pero el envío a Formspree
puede fallar por restricciones del navegador con `file://`. Para probar el formulario usá A o B.

> Cada vez que cambies algo, guardá y recargá el navegador (Ctrl/Cmd + R).

---

## 3. Deploy a Vercel

**Ya está configurado.** El proyecto está importado en Vercel y conectado a este
repositorio: cada push a `main` dispara un deploy nuevo, sin pasos manuales.

Vercel también publica una URL distinta por cada deploy, con un hash en el medio. Sirve
para revisar un cambio puntual; **la que se comparte es la de producción**, que siempre
apunta al último deploy de `main`.

> **El nombre del proyecto define la URL.** El proyecto se creó cuando esta landing era
> de otra marca, así que conviene renombrarlo a `mundo-gambito` para que la URL acompañe:
> **Settings → General → Project Name**. Al renombrarlo, la URL vieja deja de responder.

### Si alguna vez hay que rehacerlo desde cero

1. Entrá a **https://vercel.com/signup** y elegí *Continue with GitHub*. Plan **Hobby** (gratis).
2. **Add New… → Project**, buscá el repositorio y **Import**.
3. **No toques la configuración**: el `vercel.json` ya declara que es un sitio estático
   servido desde `public/`. Framework Preset en *Other*, Build Command vacío.
4. **Deploy**.

O desde la terminal:

```bash
npm i -g vercel     # una sola vez
vercel login        # una sola vez
vercel --prod       # publica
```

---

## 4. Conectar un dominio propio

Primero: el dominio tiene que estar comprado. Se compra en NIC Argentina (para `.com.ar`),
Namecheap, GoDaddy, o en el propio Vercel (**Domains → Buy**, lo más simple porque queda
todo configurado solo).

Si ya lo comprás en otro lado:

1. En Vercel, entrá al proyecto → **Settings** → **Domains**.
2. Escribí el dominio y click en **Add**.
3. Vercel te va a ofrecer agregar también la versión con `www` y una redirección. Aceptá:
   conviene tener las dos.
4. Vercel te muestra los registros DNS que hay que cargar. Van a ser algo así:

   | Tipo    | Nombre | Valor                   |
   |---------|--------|-------------------------|
   | `A`     | `@`    | `76.76.21.21`           |
   | `CNAME` | `www`  | `cname.vercel-dns.com`  |

   > Usá **los valores exactos que te muestra tu panel de Vercel**, no los de esta tabla:
   > pueden cambiar según el proyecto.

5. Entrá al panel de donde compraste el dominio, buscá la sección **DNS** / **Administrar DNS**
   / **Zona DNS**, y cargá esos dos registros.
   - Si ya existe un registro `A` en `@` apuntando a otro lado, editalo en vez de agregar uno nuevo.
   - En "TTL" dejá el valor por defecto (o `3600`).
6. Volvé a Vercel y esperá. El cartel de **Invalid Configuration** pasa a **Valid** cuando el
   DNS se propaga: suele tardar entre 10 minutos y 2 horas (puede llegar a 24 hs en el peor caso).
7. El certificado HTTPS lo emite Vercel solo, gratis. No hay que hacer nada.

**Alternativa más simple (nameservers):** en vez de cargar registros uno por uno, podés apuntar
todo el dominio a Vercel cambiando los *nameservers* en tu registrador por los que Vercel indica
(`ns1.vercel-dns.com` y `ns2.vercel-dns.com`). Ojo: si hacés esto, cualquier otro servicio del
dominio (por ejemplo un correo del mismo dominio) hay que reconfigurarlo desde Vercel.

---

## Cambios frecuentes

| Qué querés cambiar             | Dónde                                                     |
|--------------------------------|-----------------------------------------------------------|
| Textos, modalidades            | `public/index.html`                                       |
| Colores, tipografías           | Variables `:root` arriba de `public/styles.css`           |
| Email que recibe los contactos | Panel de Formspree → el formulario → **Settings**         |
| Provincias del desplegable     | `<select id="provincia">` en `public/index.html`          |
