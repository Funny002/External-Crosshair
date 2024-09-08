import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronApi', {
  window: {
    minus: () => ipcRenderer.send('windows:minus'),
    close: () => ipcRenderer.send('windows:close'),
  },
  storage: {
    clear: (path: string) => ipcRenderer.send('storage:clear', path),
    get: (path: string, key: string) => ipcRenderer.invoke('storage:get', path, key),
    remove: (path: string, key: string) => ipcRenderer.send('storage:remove', path, key),
    set: (path: string, key: string, data: any) => ipcRenderer.send('storage:set', path, key, data),
  },
  canvas: {
    show: (uuid: string) => ipcRenderer.send('canvas:show', uuid),
    hide: (uuid: string) => ipcRenderer.send('canvas:hide', uuid),
    status: (uuid: string) => ipcRenderer.invoke('canvas:status', uuid),
    refresh: {
      send: (uuid: string) => ipcRenderer.send('canvas:refresh:send', uuid),
      on: (callback: Function) => ipcRenderer.on('canvas:refresh:on', (_, ...args: any[]) => callback(...args)),
    },
  },
});
