import { Key } from 'readline';

const electron = require('electron') as typeof Electron;

electron.contextBridge.exposeInMainWorld('electron', {
  sendFrameAction: (palyLoad) => ipcRendererSend('sendFrameAction', palyLoad),
  sendSetWindowSize: (payload) => ipcRendererSend('sendSetWindowSize', payload),

  handleCheckOverdueTask: (cb) => ipcRendererOn('handleCheckOverdueTask', cb)
} satisfies Window['electron']);

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
