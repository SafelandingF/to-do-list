import { app, BrowserWindow } from 'electron';
import { isDev } from './utils/env.js';
import electron from 'electron';
import windowsCustomConfig from './config/mainWindowConfig.js';
import setAppTray from './config/appTrayConfig.js';
import dayjs from 'dayjs';

app.on('ready', () => {
  const mainWindow = new BrowserWindow(windowsCustomConfig);
  setAppTray();
  // 也可以通过这个方式来设置图标
  // mainWindow.setIcon(path.join(getAssetsPath(), 'icon.ico'));
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile('./dist/index.html');
  }

  ipcMainOn('sendFrameAction', handleSendFrameAction(mainWindow));
  ipcMainOn('sendSetWindowSize', handleSetWindowSize(mainWindow));
  shouldCheckOverdueTasks(mainWindow);

  mainWindow.on('closed', () => {
    electron.ipcMain.removeAllListeners('sendFrameAction');
  });

  mainWindow.getContentSize();
  // const { x, y } = mainWindow.getBounds();
  console.log(mainWindow.getBounds(), mainWindow.getContentSize());
});
app.on('will-quit', (event) => {
  event.preventDefault();
});
app.on('before-quit', (event) => {
  event.preventDefault();
});
app.on('window-all-closed', () => {
  console.log('window-all-closed');
});

const handleSendFrameAction = (mainWindow: BrowserWindow) => {
  const _handle = (_payload: FrameWindowAction) => {
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

const handleSetWindowSize = (mainWindow: BrowserWindow) => {
  const _handle = (_payload: FrameWindowSize) => {
    mainWindow.setSize(_payload.width, _payload.height, true);
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

const shouldCheckOverdueTasks = (browserWindow: BrowserWindow) => {
  setInterval(() => {
    const now = dayjs().format('YYYY-MM-DD:mm:ss');
    ipcMainSend('handleCheckOverdueTask', now, browserWindow);
  }, 5 * 1000);
};

const ipcMainSend = <Key extends keyof EventPayLoadMapping>(
  key: Key,
  palyLoad: EventPayLoadMapping[Key],
  BrowserWindow: BrowserWindow
) => {
  BrowserWindow?.webContents.send(key, palyLoad);
};
