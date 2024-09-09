import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { isUrl, objectMerge } from './object';

const defaultConfig = {
  title: 'External Crosshair',
  fullscreenable: false,
  autoHideMenuBar: true,
  show: false,
};

export function createWindow(src: string, config: BrowserWindowConstructorOptions = {}, hash?: string) {
  const win = new BrowserWindow(objectMerge(defaultConfig, config));

  if (!('show' in config) || config.show) {
    win.once('ready-to-show', () => {
      win.show();
    });
  }

  let loadApi: Promise<any>;

  if (isUrl(src)) {
    loadApi = win.loadURL(src);
  } else {
    loadApi = win.loadFile(src, hash ? { hash: hash } : undefined);
  }

  loadApi.then();

  return win;
}
