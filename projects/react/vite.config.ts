import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'process'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: env.NODE_ENV === 'production' ? '/react/' : '',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../dist/react'),
  },
})
