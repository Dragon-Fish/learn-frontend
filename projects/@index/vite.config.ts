import { resolve } from 'path'
import { defineConfig } from 'vite'
import pluginPug from 'vite-plugin-pug'

export default defineConfig({
  server: {
    fs: {
      allow: [resolve(__dirname)],
    },
  },
  plugins: [pluginPug({}, {})],
  build: {
    outDir: resolve(__dirname, '../../dist'),
  },
})
