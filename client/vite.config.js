import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ecommerce/', // Set the base path for the project
  plugins: [react()],
})
