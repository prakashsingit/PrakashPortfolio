import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards /api/* to the ASP.NET Core backend during `npm run dev`.
      // Update the target port to match whatever `dotnet run` prints for the API project.
      '/api': {
       // target: 'http://localhost:5199',
       target: 'http://localhost:63062',
        changeOrigin: true,
      },
    },
  },
})
