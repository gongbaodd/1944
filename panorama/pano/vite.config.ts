// @ts-nocheck

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        canvas: resolve(__dirname, 'canvas.html'),
        // add more pages here
      }
    }
  }
})