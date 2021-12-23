import { defineConfig } from 'vite'
import { env } from 'process'
import { resolve } from 'path'

export default defineConfig({
  base: env.NODE_ENV === 'production' ? '/angular/' : '',
  build: {
    outDir: resolve(__dirname, '../../dist/angular'),
  },
})
