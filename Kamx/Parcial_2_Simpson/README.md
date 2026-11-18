# Los Simpson · Parcial 2

Aplicación sencilla con React, Vite, JavaScript, CSS, React Router y `fetch` nativo.
La carpeta estaba vacía: se añadieron los archivos mínimos sin ejecutar `npm create vite`.

## Ejecutar

Desde `Git_UDLA_web/Kamx/Parcial_2_Simpson`:

```bash
npm install
npm run dev
```

Las dependencias incluyen `react-router-dom`. Si necesitas instalarlo por separado:

```bash
npm install react-router-dom
```

En PowerShell, si la política de ejecución bloquea `npm.ps1`, utiliza `npm.cmd install`
y `npm.cmd run dev`. No es necesario cambiar la configuración de Windows.

Para comprobar la compilación: `npm run build`. Para revisar esa compilación: `npm run preview`.

## Estructura

```text
src/
├── components/
│   ├── Header/       (Header.jsx y Header.css)
│   ├── Navbar/       (Navbar.jsx y Navbar.css)
│   ├── Main/         (Main.jsx y Main.css)
│   ├── Card/         (Card.jsx y Card.css)
│   ├── CardDetail/   (CardDetail.jsx y CardDetail.css)
│   └── Footer/       (Footer.jsx y Footer.css)
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Flujo para estudiar

1. `App` configura `BrowserRouter`, `Routes` y `Route`. Header, Navbar y Footer
   permanecen visibles; la URL determina si aparece Main o CardDetail.
2. `Main` hace un `fetch` al montarse y guarda `data.results` en `characters`.
   Maneja carga, error y listado vacío. `map()` crea una Card por personaje.
3. `Card` recibe el objeto `character` mediante props y muestra imagen, nombre
   y ocupación. Su botón ejecuta `navigate('/character/' + character.id)`.
4. `useNavigate()` devuelve una función para cambiar de ruta desde JavaScript.
   `navigate(-1)` vuelve a la entrada anterior del historial del navegador.
5. La ruta `/character/:id` acepta IDs variables: por ejemplo, `/character/5`.
   No hay una ruta escrita manualmente para cada personaje.
6. `useParams()` obtiene ese ID desde la URL como un string. App no lo pasa como prop.
7. `CardDetail` hace otra consulta a `/api/characters/${id}`. Su efecto depende
   de `[id]` para volver a consultar si cambia el personaje en la URL.
8. `character` empieza como `null`; el renderizado condicional espera a que la
   consulta termine antes de acceder a sus propiedades.

Los dos efectos cancelan su petición con `AbortController` cuando se desmonta
el componente. Esto también evita que una respuesta antigua reemplace el detalle
si se cambia de ID. En desarrollo, `StrictMode` puede iniciar y cancelar una
primera petición: es normal.

## API comprobada

- Listado: <https://thesimpsonsapi.com/api/characters>.
  Devuelve un objeto con `count`, `next`, `prev`, `pages` y `results`.
  El array está en `results`: no es un array en la raíz ni una propiedad `data`.
- El listado muestra la primera página de 20 personajes que entrega la API.
  No se ha añadido paginación para mantener el ejercicio centrado en las rutas.
- Detalle: <https://thesimpsonsapi.com/api/characters/5>.
  Devuelve directamente el personaje, sin envolverlo en `results`.
  También se comprobó `/api/characters/1`.
- Campos utilizados: `id`, `name`, `age`, `birthdate`, `gender`, `occupation`,
  `status`, `description` y `phrases`. `description` está en el detalle, no en el listado.
- Los campos sin valor muestran «No disponible»; no se inventan datos de familia.
  Los textos de personajes se conservan en el idioma original de la API.
- Aunque existe `portrait_path`, la imagen se construye con el ID, como pide el ejercicio:

```js
const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`
```

## Revisión manual

- Abrir `/`: esperar el mensaje de carga y después las cards con sus imágenes.
- Pulsar «Conocer más» de Homer: comprobar `/character/1` y su información.
- Pulsar «Volver»: comprobar que se regresa al listado.
- Abrir directamente `/character/5` o recargar esa ruta: debe aparecer Maggie.
  Si no hay un listado previo en el historial, usar «Inicio» para ir al listado.
- Abrir `/character/abc`: debe mostrar el error de ID sin consultar la API.
- Abrir un ID inexistente: debe mostrar el error de la API, sin romper el renderizado.
- Desconectar la red y recargar el listado o el detalle: comprobar el mensaje de error.
- Revisar en móvil: grid adaptable e imagen del detalle encima de la información.

Si se aloja en un servidor estático, este debe servir `index.html` para las rutas
de la aplicación. Vite ya lo hace durante el desarrollo.

## Archivos creados

Los 16 archivos de `src` del árbol anterior, más `package.json`,
`package-lock.json`, `index.html`, `vite.config.js`, `.gitignore` y este README.
No se modificaron los proyectos de las otras carpetas.

## Presentación

Main muestra «Personajes de Springfield» y «Dale clic a "conocer más" para detalles».
Los botones usan amarillo y los fondos azul cielo claro, sin iconos de flecha.
El logotipo del Header está guardado localmente en `public/simpsons-logo.svg`:
[The Simpsons yellow logo, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:The_Simpsons_yellow_logo.svg).

## Verificación realizada

- `npm run build`: compilación correcta.
- `npm run dev`: Vite inicia correctamente.
- `/`, `/character/1`, `/character/5` y `/character/abc` responden HTTP 200
  con la entrada de React. Esta comprobación valida el soporte de rutas del
  servidor; no sustituye la ejecución de los componentes en el navegador.
- Los endpoints reales de listado y detalle se inspeccionaron antes de programar.
- La imagen `https://cdn.thesimpsonsapi.com/500/character/5.webp` respondió
  HTTP 200 con tipo `image/webp`.
- No se completó la revisión visual ni el recorrido de clics: Computer Use
  se detuvo al no poder determinar con confianza la URL de Chrome.
- `npm audit` informó cinco avisos de severidad alta en la cadena de
  dependencias de desarrollo de Vite, relacionados con `picomatch`.
  `npm audit fix` no encontró una corrección compatible; el registro ofrecía
  `picomatch` 4.0.7 como última versión. No se aplicó `--force`, que proponía
  cambiar las versiones mayores de Vite y su plugin de React.
