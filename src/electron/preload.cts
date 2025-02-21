import { Key } from 'readline';

const electron = require('electron') as typeof Electron;

electron.contextBridge.exposeInMainWorld('electron', {
  sendFrameAction: (palyLoad) => ipcRendererSend('sendFrameAction', palyLoad),
  setWindowSize: (payload) => ipcRendererSend('setWindowSize', payload)
} satisfies Window['electron']);

// 这里自己封装主要是做类型约束的
const ipcRendererSend = <Key extends keyof EventPayLoadMapping>(
  key: Key,
  palyLoad: EventPayLoadMapping[Key]
) => {
  electron.ipcRenderer.send(key, palyLoad);
};

// const ipcPendererInvoke =
