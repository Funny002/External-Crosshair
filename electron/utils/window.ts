import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { isUrl, objectMerge } from './object';

const defaultConfig = {
  title: 'External Crosshair',
  fullscreenable: false,
  autoHideMenuBar: true,
  show: false,
};

export function createWindow(src: string, config?: BrowserWindowConstructorOptions, loadFunc?: Function) {
  const win = new BrowserWindow(objectMerge(defaultConfig, config));

  if (!('show' in config) || config.show) {
    win.once('ready-to-show', () => {
      console.log('win');
      win.show();
    });
  }

  const loadApi = isUrl(src) ? win.loadURL(src) : win.loadFile(src);

  loadApi.then(() => {
    if (loadFunc) {
      loadFunc.apply(win);
    }
  });

  return win;
}
