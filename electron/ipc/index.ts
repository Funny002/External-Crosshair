import { BrowserWindow, ipcMain } from 'electron';

ipcMain.on('windows:close', () => {
  BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.on('windows:minus', () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

export * from './Storage';
export * from './CanvasManage';
