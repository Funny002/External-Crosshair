import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { createWindow } from '../utils';
import { resolve } from 'path';

const url = app.isPackaged ? resolve(__dirname, './web/index.html') : 'http://localhost:8420/';

function createMainWindow() {
  const config: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 28,
      color: '#cdcdcd',
      symbolColor: '#000000',
    },
  };

  return createWindow(url, config);
}

export class MainWindow {
  win: BrowserWindow | null = null;

  get isDestroyed() {
    return !this.win || this.win.isDestroyed();
  }

  stoup() {
    if (!this.win || this.isDestroyed) {
      this.win = createMainWindow();
    } else {
      this.win.show();
    }

    return this.win;
  }
}
