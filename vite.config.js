import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig((config) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };
  const mockUrl = 'http://localhost:3001/';
  const localDev = 'http://localhost:5000/';

  let apiUrl = process.env.VITE_LOCAL_API_URL
    ? process.env.VITE_LOCAL_API_URL
    : localDev;

  console.log('mode: ' + config.mode);
  if (config.mode === 'mock') {
    apiUrl = mockUrl;
  }
  console.log('apiUrl: ' + apiUrl);

  return {
    plugins: [react()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    esbuild: {},
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
    server: {
      proxy: {
        '/resources': {
          target: apiUrl,
          changeOrigin: true,
          xfwd: true,
          rewrite: (path) => path.replace(/^\/resources/, '/resources'),
        },
      },
    },
  };
});
