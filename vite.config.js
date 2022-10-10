import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig((config) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };
  const jsonServer = 'http://localhost:3001';

  const getUrl = (apiName) => {
    const keyName = 'VITE_' + apiName + '_API_URL_PROXY';
    const proxyToUrl = process.env[keyName] ? process.env[keyName] : jsonServer;
    console.log('Proxying ' + apiName + ' to: ' + proxyToUrl);
    return proxyToUrl;
  };

  const timecardConfig = {
    target: getUrl('TIMECARD'),
    changeOrigin: true,
    xfwd: true,
  };

  const accrualsConfig = {
    target: getUrl('ACCRUALS'),
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
        '/test': accrualsConfig, // TODO: configure Accruals URLs accordingly
      },
    },
  };
});
