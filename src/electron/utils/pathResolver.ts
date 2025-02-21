import { app } from 'electron';
import path from 'path';
import { isDev } from './env.js';

const __dirname = import.meta.dirname;

export const getPreloadPath = () => {
  console.log(import.meta.dirname);
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    'dist-electron',
    'preload.cjs'
  );
};

// tsc transpile 无法迁移文件内的assets路径所以将其放到最外侧
export const getAssetsPath = () => {
  return path.join(__dirname, '..', '..', 'public', 'assets');
};
