import path from 'path';
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: true, // Enable CSS modules if needed
  },
  define: {
    // global: {},
  },
  plugins: [react()],
  resolve: {
    alias: {
      root: "/",
      src: "/src",
      server: "/server",
      '@components': path.resolve(__dirname, 'components'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@config': path.resolve(__dirname, 'config'),
    }
  },
  server: {
    host: true,
    port: 3000,
     watch: {
       usePolling: true
     }
  },
  
});
