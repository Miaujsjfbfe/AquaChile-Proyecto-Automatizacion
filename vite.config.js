import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // <-- Esto es clave para que reconozca expect globalmente
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})