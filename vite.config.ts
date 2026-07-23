import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Safari often resolves localhost to 127.0.0.1 (IPv4), not [::1] (IPv6).
    host: true,
  },
})
