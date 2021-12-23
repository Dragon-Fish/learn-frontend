import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { env } from 'process'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: env.NODE_ENV === 'production' ? '/vue3/' : '',
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, '../../dist/vue3'),
  },
})
