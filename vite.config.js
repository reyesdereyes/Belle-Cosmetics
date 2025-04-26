import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/Belle-Cosmetics/', // 👈 Esto asegura que los recursos se sirvan desde el subdirectorio
  plugins: [react()],
})