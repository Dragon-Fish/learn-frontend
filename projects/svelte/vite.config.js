import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { env } from 'process'
import { resolve, dirname } from 'path'
const curPath = resolve(dirname(''))

// https://vitejs.dev/config/
export default defineConfig({
  base: env.NODE_ENV === 'production' ? '/svelte/' : '',
  plugins: [svelte()],
  build: {
    outDir: resolve(curPath, '../../dist/svelte'),
  },
})
