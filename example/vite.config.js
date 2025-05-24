import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Use the plugin from parent directory during development
      'vue3-tiny-translation': '../src/index.js'
    }
  }
}) 