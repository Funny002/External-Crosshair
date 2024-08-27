import { app, BrowserWindow } from 'electron';
import { MainWindow } from './window';
import { Tray } from './tray';

const tray = new Tray();
const main = new MainWindow();

app.whenReady().then(() => {
  tray.stoup(); // 托盘
  main.stoup(); // 主窗口

  console.log('app ready');
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    main.stoup();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
