import path from 'path';
import { getAssetsPath, getPreloadPath } from '../utils/pathResolver.js';

const windowsCustomConfig: Electron.BrowserWindowConstructorOptions = {
  width: 500,
  height: 500,

  //frame == false 设置无边框 外面黑色的一圈线
  frame: false,

  //禁止改变主窗口尺寸
  resizable: false,
  // 窗口置顶
  alwaysOnTop: true,
  // 禁止最大化
  fullscreenable: true,

  //可以使整个窗口变透明 只显示内容
  transparent: true,
  /**
   * useContentSize boolean (optional) - The width and height would be used as web page's size,
   * which means the actual window's size will include window frame's size and be slightly larger.
   * Default is false
   *
   * No, useContentSize does not mean the size of the window would be equal to contentSize. It means the size of the webpage would be equal to width and height specified.
   * 否，useContentSize 并不意味着窗口的大小等于 contentSize。这意味着网页的大小将等于指定的 width 和 height。
   */
  // useContentSize: true,

  // 隐藏标题栏
  titleBarStyle: 'hidden',

  //显示桌面图标
  icon: path.join(getAssetsPath(), 'icon.ico'),
  title: 'To-Do List',
  webPreferences: {
    preload: getPreloadPath()
    // 为渲染进程提供node能力
    // nodeIntegration: true,
  }
};

export default windowsCustomConfig;
