# Clase 12 API · Valorant

Proyecto educativo de React y Vite basado en la estructura de Class13_reactV3_fetch-hooks.

## Ejecutar

Desde esta carpeta:

```sh
npm install
npm run dev
```

En PowerShell, si npm.ps1 está bloqueado, utiliza npm.cmd en lugar de npm.

## Estructura

- App: integra Header, Main y Footer.
- Main: consulta la API con fetch dentro de useEffect y guarda agentes, carga y errores con useState.
- CardCharacter: recibe nombre, imagen, rol y descripción mediante props.

Endpoint: https://valorant-api.com/v1/agents?language=es-ES&isPlayableCharacter=true

La respuesta contiene un arreglo data. Solo se muestran agentes jugables. Las imágenes y los datos requieren conexión a Internet. El botón Reintentar permite repetir una petición fallida.

## Compilar

```sh
npm run build
npm run preview
```
