import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // MUI puede resolverse desde la carpeta superior: compartir una sola copia de React.
    dedupe: ['react', 'react-dom'],
  },
})
