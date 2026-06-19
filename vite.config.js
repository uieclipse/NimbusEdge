import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vite needs to know the repo name to build correct asset URLs when deployed
// to GitHub Pages at https://<user>.github.io/<repo>/. Locally (npm run dev)
// this has no effect — base only changes production build output.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
