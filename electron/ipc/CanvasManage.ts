import { CanvasManage } from '../window';
import { ipcMain } from 'electron';

export const canvasManage = new CanvasManage();

ipcMain.on('canvas:show', (_, uuid: string) => {
  return canvasManage.show(uuid);
});

ipcMain.on('canvas:hide', () => {
  return canvasManage.hide();
});

ipcMain.on('canvas:refresh:send', (_, uuid: string) => {
  return canvasManage.refresh(uuid);
});

ipcMain.handle('canvas:status', (_, uuid: string) => {
  return canvasManage.getStatus(uuid);
});
