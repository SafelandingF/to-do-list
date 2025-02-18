import { app } from 'electron';
import path from 'path';
import { isDev } from './env.js';

export const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    'dist-electron',
    'preload.cjs'
  );
};
