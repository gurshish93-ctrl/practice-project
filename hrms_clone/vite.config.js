import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // ✅ Allow serving fonts and other assets from node_modules (needed for PrimeReact themes)
      allow: ['..', 'node_modules']
    }
  }
})
