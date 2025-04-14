import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['taskmanager-frontend-zijb.onrender.com'], // ✅ Add your Render domain here
  },
})
