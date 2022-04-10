import localforage from "localforage";

localforage.config({
  name: "agnos",
});

export class LocalStorageService<T> {
  private _store: LocalForage;
  constructor(storeName: string) {
    this._store = localforage.createInstance({
      storeName,
    });
  }
  async get(id: string) {
    return this._store.getItem(id) as Promise<T>;
  }
  async save(id: string, data: T) {
    if (!id || !data) return;
    return this._store.setItem(id, data) as Promise<T>;
  }
}

// NOTE: this service is not currently used as we no longer write session info to the local storage
export class TokensLocalStorage extends LocalStorageService<string> {
  constructor() {
    super("tokens");
  }
  async getAccessToken() {
    return super.get("accessToken") as Promise<string>;
  }
  async getIdToken() {
    return super.get("idToken") as Promise<string>;
  }
  async getRefreshToken() {
    return super.get("refreshToken") as Promise<string>;
  }
  async saveAccessToken(token: string) {
    return super.save("accessToken", token) as Promise<string>;
  }
  async saveIdToken(token: string) {
    return super.save("idToken", token) as Promise<string>;
  }
  async saveRefreshToken(token: string) {
    return super.save("refreshToken", token) as Promise<string>;
  }
}
