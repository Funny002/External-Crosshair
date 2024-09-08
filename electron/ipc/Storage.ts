import { ipcMain } from 'electron';
import { Storage } from '../utils';

export const storageStore: Map<string, Storage> = new Map();

function handleStorage(path: string) {
  let storage = storageStore.get(path);
  if (!storage) {
    storage = new Storage(path);
    storageStore.set(path, storage);
  }
  return storage;
}

ipcMain.handle('storage:get', (_, path: string, keys: string) => {
  return handleStorage(path).get(keys);
});

ipcMain.on('storage:set', (_, path: string, keys: string, data?: any) => {
  return handleStorage(path).set(keys, data);
});

ipcMain.on('storage:remove', (_, path: string, keys: string) => {
  return handleStorage(path).remove(keys);
});

ipcMain.on('storage:clear', (_, path: string) => {
  return handleStorage(path).clear();
});
