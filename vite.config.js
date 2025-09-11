import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this line to include .glb files (and potentially .png if not already handled)
  assetsInclude: ['**/*.glb', '**/*.png'], // <--- ADD OR MODIFY THIS LINE
})