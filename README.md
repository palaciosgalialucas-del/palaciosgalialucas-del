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

## 1. Conectar el formulario a Formspree

Hoy el formulario **todavía no envía nada**: falta pegar tu endpoint. Son 5 minutos.

### Crear la cuenta y el formulario

1. Entrá a **https://formspree.io** y hacé click en **Get started** / **Sign up**.
2. Registrate con el email donde querés recibir los leads (podés usar Google o email +
   contraseña). Ese email es al que van a llegar los avisos.
3. Confirmá tu cuenta desde el mail que te manda Formspree.
4. Ya adentro, click en **+ New form** (o **New project** y después **New form**).
5. Completá:
   - **Form name**: `Max Power Business — Leads`
   - **Send emails to**: tu email (ej. `palaciosgalialucas@gmail.com`)
6. Click en **Create form**.
7. Formspree te muestra el **endpoint**, con esta forma:

   ```
   https://formspree.io/f/xdkogqwr
   ```

   Esos 8 caracteres del final son tu ID. Copiá la URL completa.

### Dónde pegarlo en el código

Abrí **`public/index.html`**, buscá la etiqueta `<form>` (está cerca del final, en la
sección "Sumarme a la prueba", precedida por un comentario que dice `PEGÁ ACÁ TU ENDPOINT`)
y reemplazá `TU_ID_DE_FORMSPREE` por tu ID real:

```html
<!-- antes -->
<form class="signup-box"
      id="signupForm"
      action="https://formspree.io/f/TU_ID_DE_FORMSPREE"
      method="POST">

<!-- después -->
<form class="signup-box"
      id="signupForm"
      action="https://formspree.io/f/xdkogqwr"
      method="POST">
```

Es el **único** lugar que hay que tocar. Guardá el archivo.

### Probar que funciona

1. Levantá el sitio en local (ver sección 2) y mandá el formulario con tus datos.
2. La primera vez, Formspree te manda un mail para **confirmar el formulario**: abrilo y
   hacé click en el link. Hasta que no confirmes, los envíos quedan pendientes.
3. Desde ahí, cada lead te llega por mail y queda guardado en el panel de Formspree
   (menú **Submissions**), de donde podés exportarlo a CSV.

### Qué datos te llegan

| Campo       | Contenido                                                      |
|-------------|----------------------------------------------------------------|
| `negocio`   | Nombre del negocio                                             |
| `email`     | Email de contacto                                              |
| `rubro`     | Rubro elegido en el desplegable                                |
| `plan`      | Plan que miraba antes de anotarse (si vino desde "Quiero este plan") |
| `_subject`  | Asunto del mail: *Nuevo lead — Max Power Business*             |

También hay un campo trampa (`_gotcha`), invisible para las personas: si un bot lo
completa, Formspree descarta el envío automáticamente.

**Sobre el plan gratuito:** Formspree gratis permite **50 envíos por mes**. Para una prueba
inicial alcanza y sobra. Si empieza a llenarse, el plan pago arranca en unos USD 10/mes.

**Si algo falla:** el formulario muestra el mensaje de error en rojo debajo del botón en vez
de perder el lead en silencio. Los dos errores más comunes son: no haber pegado el endpoint,
o no haber confirmado el formulario desde el mail de Formspree.

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
