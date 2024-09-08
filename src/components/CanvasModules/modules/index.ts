import * as Cross from './Cross.ts';
import * as Aim from './Aim.ts';
import * as Dot from './Dot.ts';

export const modules = { Aim, Cross, Dot };

export function setupModules(uuid: string): CanvasModule {
  const module = modules[uuid];
  if (module) {
    return module;
  } else {
    console.log('module not found');
  }
  return {
    options: [],
    defaults: {},
    setup: (ctx: CanvasRenderingContext2D, options: Record<string, any>) => {},
  };
}
