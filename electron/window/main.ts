import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { createWindow, Storage } from '../utils';
import { join } from 'path';

const url = app.isPackaged ? join(__dirname, '../web/index.html') : 'http://localhost:8420';

export class MainWindow {
  storage: Storage;
  win: BrowserWindow | null = null;

  constructor() {
    this.storage = new Storage('config.json');
  }

  get isDestroyed() {
    return !this.win || this.win.isDestroyed();
  }

  stoup() {
    if (!this.win || this.isDestroyed) {
      const windowBounds = this.storage.get('windowBounds');
      const config: BrowserWindowConstructorOptions = {
        width: 700,
        height: 450,
        minWidth: 600,
        minHeight: 400,
        titleBarStyle: 'hidden',
        ...windowBounds,
        webPreferences: {
          preload: join(__dirname, '../preload/main.js'),
        },
      };
      this.win = createWindow(url, config);
    } else {
      this.win.show();
    }
    this.handlerWindow(this.win);
    return this.win;
  }

  handlerWindow(view: BrowserWindow) {
    const handlerFunc = () => {
      this.storage.set('windowBounds', view.getNormalBounds());
    };

    view.on('moved', handlerFunc);
    view.on('resized', handlerFunc);
    view.once('close', () => {
      view.off('moved', handlerFunc);
      view.off('resized', handlerFunc);
    });
  }
}
