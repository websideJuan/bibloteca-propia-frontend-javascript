import { defineConfig } from 'vite'


export default defineConfig({
  base: '/bibloteca-propia-frontend-javascript/', // This sets the base path for the application, useful for relative paths
  esbuild: {
    target: 'esnext', // This sets the JavaScript version to ESNext, allowing modern JavaScript features
  },
});