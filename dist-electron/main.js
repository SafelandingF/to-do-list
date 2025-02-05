import { app, BrowserWindow } from 'electron';
import { isDev } from './utils/env.js';
app.on('ready', () => {
    const mainWindow = new BrowserWindow();
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5173');
    }
    else {
        mainWindow.loadFile('./dist/index.html');
    }
});
