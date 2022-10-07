import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig((config) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };

  const viteServerUrl = 'http://localhost:3000/';

  const localTimecardUrl = process.env['VITE_TIMECARD_API_URL'];
  const localAccrualsUrl = process.env['VITE_ACCRUALS_API_URL'];

  // Reset Vite local api urls to the same url and port the Vite Server is running on e.g. http://localhost:3000
  // otherwise API requests will be made directly to the url specified e.g. http://localhost:3001 and not the Vite Server
  // Vite Server is set up to proxy API requests based on the path requested e.g. http://localhost:3000/resources/time-entry maps to the timecardConfig (configured below in server > proxy)
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('VITE_') && key.indexOf('API_URL') > -1) {
      process.env[key] = viteServerUrl;
    }
  });

  const getUrl = (proxyToLocalUrl) => {
    return proxyToLocalUrl;
  };

  const timecardConfig = {
    target: getUrl(localTimecardUrl),
    changeOrigin: true,
    xfwd: true,
  };

  const accrualsConfig = {
    target: getUrl(localAccrualsUrl),
    changeOrigin: true,
    xfwd: true,
  };

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
        '/resources/time-period-types': timecardConfig,
        '/resources/time-entries': timecardConfig,
        '/resources/accruals': accrualsConfig, // TODO: configure Accruals URLs accordingly
      },
    },
  };
});
