import { ipcMain } from 'electron';
import { Key } from 'readline';

const electron = require('electron') as typeof Electron;
const __devtron = require('devtron');
const fs = require('fs');

electron.ipcRenderer.on('test', (_, data) => console.log(data));
console.log(electron.ipcRenderer.eventNames());

electron.contextBridge.exposeInMainWorld('electron', {
  sendFrameAction: (palyLoad) => ipcRendererSend('sendFrameAction', palyLoad),
  sendSetWindowSize: (payload) => ipcRendererSend('sendSetWindowSize', payload),
  handleCheckOverdueTask: (cb) => ipcRendererOn('handleCheckOverdueTask', cb)
} satisfies Window['electron']);

// electron.contextBridge.exposeInMainWorld('__devtron', {
//   require: require,
//   process: process
// } satisfies Window['__devtron']);
electron.contextBridge.exposeInMainWorld('node', {
  __devtron: __devtron,
  ipcRenderer: () => electron.ipcRenderer.eventNames(),

  // 这里要进行一下通信
  ipcMain: () => electron.ipcMain.eventNames(),
  fs: fs
} satisfies Window['node']);

// 这里自己封装主要是做类型约束的
const ipcRendererSend = <Key extends keyof EventPayLoadMapping>(
  key: Key,
  palyLoad: EventPayLoadMapping[Key]
) => {
  electron.ipcRenderer.send(key, palyLoad);
};

const ipcRendererOn = <Key extends keyof EventPayLoadMapping>(
  key: Key,
  cb: (payload: EventPayLoadMapping[Key]) => void
): Unsubscribe => {
  const callback = (
    _event: Electron.IpcRendererEvent,
    payload: EventPayLoadMapping[Key]
  ) => {
    cb(payload);
  };
  electron.ipcRenderer.on(key, callback);
  return () => {
    electron.ipcRenderer.removeListener(key, callback);
  };
};

// const ipcPendererInvoke =
