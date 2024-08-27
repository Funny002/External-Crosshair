import { existsSync, writeFileSync } from 'node:fs';
import { mkdirSync, readFileSync } from 'fs';
import { dirname } from 'node:path/win32';
import { resolve } from 'node:path';
import { isObject } from './object';

function keySplit(key: string): [string[], string] {
  const names = key.split('.');
  const name = names.pop();
  return [names, name];
}

export function mkdirPath(path: string) {
  if (!existsSync(path)) {
    mkdirPath(dirname(path));
    mkdirSync(path);
  }
}

export class Storage {
  private readonly dir: string;
  private store: Record<string, any>;

  constructor(path: string) {
    this.dir = resolve(process.env.USERPROFILE, './.ExternalCrossHair', path);
    this.initStorage();
  }

  get exists() {
    return existsSync(this.dir);
  }

  readFile() {
    this.store = JSON.parse(readFileSync(this.dir, 'utf-8'));
  }

  writeFile() {
    writeFileSync(this.dir, JSON.stringify(this.store, null, 2), { encoding: 'utf-8', flag: 'w' });
  }

  initStorage() {
    this.store = {};
    if (!this.exists) {
      mkdirPath(dirname(this.dir));
      this.writeFile();
    } else {
      this.readFile();
    }
  }

  handlerKey(keys: string[]) {
    let target = this.store;
    if (!keys.length) return target;
    for (const key of keys) {
      if (isObject(target)) {
        if (!target[key]) {
          target[key] = {};
        }
        target = target[key];
      } else {
        throw new Error(`${ key } is not object`);
      }
    }
    return target;
  }

  set(key: string, value: any) {
    const [names, name] = keySplit(key);
    this.handlerKey(names)[name] = value;
    this.writeFile();
  }

  get(key: string) {
    return this.handlerKey(key.split('.'));
  }

  remove(key: string) {
    const [names, name] = keySplit(key);
    delete this.handlerKey(names)[name];
    this.writeFile();
  }

  clear() {
    this.store = {};
    this.writeFile();
  }
}
