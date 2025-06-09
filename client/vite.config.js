import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
      '/blogs': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    }
  }
});
