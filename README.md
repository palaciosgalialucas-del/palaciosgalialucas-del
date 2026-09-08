# Max Power Business — Landing

Landing page de **Max Power Business**, plataforma de gestión de negocio (ventas, stock,
clientes, caja, usuarios y auditoría) para pymes. Sitio estático: HTML + CSS + JS, sin
build, sin framework. Se publica en Vercel en minutos.

El diseño es exactamente el del prototipo original (paleta, tipografías y layout sin cambios).

## Estructura

```
.
├── public/
│   ├── index.html      # la página
│   ├── styles.css      # todo el CSS (idéntico al prototipo)
│   ├── main.js         # envío del formulario a Formspree
│   └── favicon.svg     # ícono de la pestaña
├── vercel.json         # config de deploy (sitio estático)
├── package.json        # sólo para levantar el server local
└── README.md
```

---

## 1. El formulario y los leads (Formspree)

**Ya está conectado y funcionando.** El formulario envía a Formspree, al formulario
*Max Power Business Leads*, endpoint `https://formspree.io/f/myeybwek`, cableado en el
atributo `action` del `<form>` en `public/index.html`.

No hay claves ni variables de entorno: el endpoint es público por diseño, va en el HTML.

### Probar que llegan los leads

1. Levantá el sitio en local (sección 2) y mandá el formulario con datos reales.
2. Formspree puede pedirte que **confirmes el primer envío por mail**: abrí ese mail y
   hacé click en el link. Es una sola vez.
3. Entrá a tu panel en https://formspree.io y confirmá que la entrada aparece en
   **Submissions**. Desde ahí se exporta a CSV.

### Elegir a qué email llegan

En el panel de Formspree: tu formulario → **Settings** → sección de emails. Podés poner
varios destinatarios. No hace falta tocar el código para esto.

### Qué datos te llegan

| Campo       | Contenido                                                      |
|-------------|----------------------------------------------------------------|
| `negocio`   | Nombre del negocio (obligatorio)                               |
| `email`     | Email de contacto (obligatorio)                                |
| `rubro`     | Rubro elegido en el desplegable                                |
| `plan`      | Plan que miraba antes de anotarse (si vino desde "Quiero este plan") |
| `_subject`  | Asunto del mail: *Nuevo lead — Max Power Business*             |

También hay un campo trampa (`_gotcha`), invisible para las personas: si un bot lo
completa, Formspree descarta el envío automáticamente.

### Cómo funciona el envío

`public/main.js` manda los datos con `fetch` y `Accept: application/json`, así el visitante
nunca sale de la página: al confirmarse el envío aparece la caja verde con su email. Si el
envío falla, el motivo se muestra en rojo debajo del botón y el botón se rehabilita — el
lead no se pierde en silencio. Si el visitante tiene JavaScript desactivado, el `<form>`
hace POST nativo a Formspree y ve la pantalla de confirmación de ellos.

Está escrito en JavaScript vanilla, sin dependencias. La librería `@formspree/ajax` haría
lo mismo, pero exigiría sumar un `<script>` externo desde un CDN y reescribir el marcado con
atributos `data-fs-*` y contenedores propios de mensajes — más piezas, y riesgo de mover el
diseño. Si algún día querés sus validaciones campo por campo, se cambia sin tocar el resto.

**Plan gratuito:** 50 envíos por mes. Para la prueba inicial alcanza y sobra. Si empieza a
llenarse, el plan pago arranca en unos USD 10/mes.

### Cambiar de formulario

Reemplazá el ID en el `action` del `<form>` en `public/index.html`:

```html
<form class="signup-box" id="signupForm"
      action="https://formspree.io/f/myeybwek"   <!-- ← acá -->
      method="POST">
```

Es el único lugar donde aparece el endpoint.

---

## 2. Correr el proyecto en local

No necesitás instalar nada raro. Elegí una de estas tres:

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

### Crear la cuenta

1. Entrá a **https://vercel.com/signup**.
2. Elegí **Continue with GitHub** (lo más práctico: así después se despliega solo con cada push).
3. Autorizá a Vercel a acceder a tu cuenta de GitHub.
4. Elegí el plan **Hobby** — gratis, y alcanza de sobra para esta landing.

### Opción A — desde GitHub (recomendada: se actualiza sola)

1. Asegurate de que el código esté pusheado a GitHub.
2. En Vercel: **Add New… → Project**.
3. Buscá el repositorio `palaciosgalialucas-del` y click en **Import**.
4. En la pantalla de configuración **no toques nada**: el `vercel.json` ya define que es un
   sitio estático servido desde `public/`. Dejá Framework Preset en *Other* y Build Command vacío.
5. Click en **Deploy**.
6. En ~30 segundos tenés la URL, del estilo `max-power-business.vercel.app`.

A partir de ahí, **cada `git push` a la rama principal republica el sitio automáticamente**.

### Opción B — desde la terminal (un solo comando)

```bash
npm i -g vercel     # una sola vez
vercel login        # una sola vez
vercel --prod       # publica
```

La primera vez te hace 4 preguntas; podés aceptar todas las respuestas por defecto con Enter
(scope: tu cuenta / link to existing project: no / project name: max-power-business /
directory: `./`).

### Después de publicar

Entrá a la URL y mandá el formulario una vez desde el sitio ya publicado, para confirmar que
los leads te llegan al mail de verdad.

---

## 4. Conectar el dominio propio (maxpowerbussiness.com)

Primero: **el dominio tiene que estar comprado**. Si todavía no lo tenés, se compra en
NIC Argentina (para `.com.ar`), Namecheap, GoDaddy, Google Domains/Squarespace o en el propio
Vercel (**Domains → Buy**, que es lo más simple porque queda todo configurado solo).

Si ya lo comprás en otro lado:

1. En Vercel, entrá a tu proyecto → pestaña **Settings** → **Domains**.
2. Escribí `maxpowerbussiness.com` y click en **Add**.
3. Vercel te va a ofrecer agregar también `www.maxpowerbussiness.com` con redirección.
   Aceptá: conviene tener las dos.
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
dominio (por ejemplo un correo `@maxpowerbussiness.com`) hay que reconfigurarlo desde Vercel.

> **Cuidado con la ortografía del dominio.** El que pediste es `maxpowerbussiness.com`, con
> doble "s" en *bussiness*. La palabra en inglés se escribe *business*, con una sola "s".
> Vale la pena decidir cuál querés antes de imprimirlo en tarjetas — y si podés, comprar las
> dos y redirigir una a la otra.

---

## Cambios frecuentes

| Qué querés cambiar          | Dónde                                                        |
|-----------------------------|--------------------------------------------------------------|
| Textos, precios, planes     | `public/index.html`                                          |
| Colores, tipografías        | Variables `:root` arriba de `public/styles.css`              |
| Email que recibe los leads  | Panel de Formspree → tu formulario → **Settings**            |
| Rubros del desplegable      | `<select id="rubro">` en `public/index.html`                 |
