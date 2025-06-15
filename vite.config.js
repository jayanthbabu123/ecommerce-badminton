import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`Current mode: ${mode}`)
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
    server: {
      port: mode === 'development' ? 5173 : 
            mode === 'qa' ? 5174 : 5175
    }
  }
})
