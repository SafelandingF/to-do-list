import { app, BrowserWindow } from 'electron';
import { isDev } from './utils/env.js';
import { getPreloadPath } from './utils/pathResolver.js';
import electron from 'electron';

const windowsCustomConfig: Electron.BrowserWindowConstructorOptions = {
  // tansparent: true,可以使整个窗口变透明 只显示内容
  // transparent: true,
  titleBarStyle: 'hidden',
  webPreferences: {
    preload: getPreloadPath()
    // 为渲染进程提供node能力
    // nodeIntegration: true,
  }
};

app.on('ready', () => {
  const mainWindow = new BrowserWindow(windowsCustomConfig);
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile('./dist/index.html');
  }
  ipcMainOn('sendFrameAction', (payload) => void 0);
});

// 这里自己封装主要是做类型约束的
const ipcMainOn = <Key extends keyof EventPayLoadMapping>(
  key: Key,
  handler: (payload: EventPayLoadMapping[Key]) => void
) => {
  electron.ipcMain.on(key, (_, palyLoad) => {
    handler(palyLoad);
  });
};
