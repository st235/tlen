import KeyValueStorage from "./KeyValueStorage";

class LocalKeyValueStorage implements KeyValueStorage {

    private localStorage: Storage

    constructor() {
        this.localStorage = window.localStorage;
    }

    put<T>(key: string, value: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.localStorage.setItem(key, JSON.stringify(value));
            return resolve(value);
        });
    }

    get<T>(key: string, defaultValue: T): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                let storedValue = this.localStorage.getItem(key);

                if (storedValue == null) {
                    if (defaultValue === undefined) {
                        return reject('Default value is undefined');
                    } else {
                        return resolve(defaultValue);
                    }
                }

                let obj = JSON.parse(storedValue);
                return resolve(obj as T);
            } catch (e) {
                return reject(e);
            }
        });
    }

    remove(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.localStorage.removeItem(key);
            return resolve();
        });
    }

}

export default LocalKeyValueStorage;
