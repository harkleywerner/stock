import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import fixReactVirtualized from 'esbuild-plugin-react-virtualized'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    proxy: {
      '^/$': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\//, '')
        },
      },
    }
  },

  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
})
