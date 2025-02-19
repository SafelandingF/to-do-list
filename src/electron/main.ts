import { app, BrowserWindow } from 'electron';
import { isDev } from './utils/env.js';
import { getPreloadPath } from './utils/pathResolver.js';
import electron from 'electron';

const windowsCustomConfig: Electron.BrowserWindowConstructorOptions = {
  // tansparent: true,可以使整个窗口变透明 只显示内容
  // transparent: true,
  // width: 800,
  // height: 800,

  //frame == false 设置无边框 外面黑色的一圈线
  // frame: false,
  // titleBarStyle: 'hidden',
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
  ipcMainOn('sendFrameAction', handleSendFrameAction(mainWindow));

  mainWindow.on('closed', () => {
    electron.ipcMain.removeAllListeners('sendFrameAction');
  });
});

const handleSendFrameAction = (mainWindow: BrowserWindow) => {
  const _handle = (_payload: frameWindowAction) => {
    switch (_payload) {
      case 'maximize': {
        mainWindow.maximize();
        break;
      }
      case 'minimize': {
        mainWindow.minimize();
        break;
      }
      case 'close': {
        mainWindow.close();
        break;
      }
      case 'toggleDevtools': {
        mainWindow.webContents.toggleDevTools();
      }
    }
  };
  return _handle;
};

// 这里自己封装主要是做类型约束的
const ipcMainOn = <Key extends keyof EventPayLoadMapping>(
  key: Key,
  handler: (payload: EventPayLoadMapping[Key]) => void
) => {
  electron.ipcMain.on(key, (_, palyLoad) => {
    handler(palyLoad);
  });
};
