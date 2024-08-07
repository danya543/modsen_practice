import path from 'node:path'
import * as url from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src'
      )
    }
  }
})
