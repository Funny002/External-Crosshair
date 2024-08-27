import { app, BrowserWindow, BrowserWindowConstructorOptions, screen } from 'electron';
import { createWindow, Storage } from '../utils';
import { resolve } from 'path';

const url = app.isPackaged ? resolve(__dirname, './web/index.html') : 'http://localhost:8420/';

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
        ...windowBounds,
        fullscreen: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
          height: 28,
          color: '#f8f8f8',
          symbolColor: '#000000',
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

  getDisplays() {
    return screen.getAllDisplays().map(({ id, label, bounds }) => {
      return { id, label, ...bounds, center: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 } };
    });
  }
}
