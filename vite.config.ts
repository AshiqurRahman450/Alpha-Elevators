import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Split three.js ecosystem into separate cacheable chunks
          if (id.includes('node_modules/three/')) {
            return 'three-core'
          }
          if (id.includes('node_modules/@react-three/fiber')) {
            return 'three-fiber'
          }
          if (id.includes('node_modules/@react-three/drei') || id.includes('node_modules/three-stdlib')) {
            return 'three-drei'
          }
        }
      }
    }
  }
})
