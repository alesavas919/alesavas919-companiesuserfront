import { defineConfig, loadEnv    } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), 'VITE_')
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_INDEX_API_URL,
        changeOrigin: true,
        secure: false,       // Si tu servidor es HTTPS, pon 'true', sino 'false'
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist'
  },
  base: '/'
})
