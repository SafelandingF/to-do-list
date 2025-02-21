import { Tray } from 'electron/main';
import { getAssetsPath } from '../utils/pathResolver.js';
import path from 'path';
import { Menu } from 'electron';

const setAppTray = (): void => {
  const appTrayIcon = new Tray(path.join(getAssetsPath(), 'icon-white.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ]);
  appTrayIcon.setContextMenu(contextMenu);
};

export default setAppTray;
