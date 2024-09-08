export class Storage {
  readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  async get(key: string) {
    return await window.electronApi.storage.get(this.path, key);
  }

  async set(key: string, data: any) {
    return await window.electronApi.storage.set(this.path, key, data);
  }

  async remove(key: string) {
    return await window.electronApi.storage.remove(this.path, key);
  }

  async close() {
    return await window.electronApi.storage.clear(this.path);
  }

  static async get(path: string, key: string) {
    return await window.electronApi.storage.get(path, key);
  }

  static async set(path: string, key: string, data: any) {
    return await window.electronApi.storage.set(path, key, data);
  }

  static async remove(path: string, key: string) {
    return await window.electronApi.storage.remove(path, key);
  }

  static async close(path: string) {
    return await window.electronApi.storage.clear(path);
  }
}
