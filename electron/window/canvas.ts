import { BrowserWindowConstructorOptions } from 'electron';
import { app, BrowserWindow } from 'electron';
import { createWindow } from '../utils';
import { resolve } from 'path';

function CreateCanvas(uuid: string) {
  const url = app.isPackaged ? resolve(__dirname, './web/index.html/') : `http://localhost:8420/`;

  const config: BrowserWindowConstructorOptions = {
    width: 300,
    height: 300,
    transparent: true,
    alwaysOnTop: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      webgl: false,
      devTools: false,
      enableWebSQL: false,
      disableDialogs: true,
      preload: resolve(__dirname, '../preload/main.js'),
    },
  };
  const view = createWindow(url + `#/canvas/${ uuid }`, config);
  view.setSkipTaskbar(true);
  view.setIgnoreMouseEvents(true, { forward: true });
  return view;
}

export class CanvasManage {
  uuid: string = '';
  view: BrowserWindow | null = null;

  show(uuid: string) {
    if (this.uuid !== uuid) this.hide();
    this.uuid = uuid;
    this.view = CreateCanvas(uuid);
  }

  hide() {
    if (this.view) {
      this.view.close();
      this.view = null;
    }
    this.uuid = '';
  }

  refresh(uuid: string) {
    if (this.uuid !== uuid) return undefined;
    this.view?.webContents.send('canvas:refresh:on');
  }

  getStatus(uuid: string) {
    return this.uuid === uuid;
  }
}
