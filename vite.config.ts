import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  plugins: [react()],
})
