/// <reference types="vite/client" />

import { canvasManage } from '../electron/ipc';

interface AimItem {
  name: string;
  label: string;
  type: 'canvas' | 'svg' | 'img';
  tags: (string | { label: string })[];
}

interface CanvasModuleOptions {
  min: number;
  max: number;
  name: string;
  type: string;
  step: number;
  docs: string;
  label: string;
}

interface CanvasModule {
  defaults: Record<string, any>;
  options: CanvasModuleOptions[];
  setup: (ctx: CanvasRenderingContext2D, options: Record<string, any>) => void;
}

interface ElectronApi {
  window: {
    minus: () => void;
    close: () => void;
  };
  storage: {
    clear: (path: string, key: string) => void;
    remove: (path: string, key: string) => void;
    get: (path: string, key: string) => Promise<any>;
    set: (path: string, key: string, data: any) => void;
  };
  canvas: {
    show: (uuid: string) => void;
    hide: (uuid: string) => void;
    status: (uuid: string) => Promise<boolean>;
    refresh: {
      send: (uuid: string) => void;
      on: (callback: Function) => void;
    };
  };
}

declare interface Window {
  electronApi: ElectronApi;
}
