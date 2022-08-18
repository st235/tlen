import KeyValueStorage from './KeyValueStorage';

class ChomeKeyValueStorage implements KeyValueStorage {

    static isAvailable(): boolean {
        console.log(chrome);
        console.log(chrome.storage);
        return chrome && chrome.storage != null && chrome.storage !== undefined;
    }

    put<T>(key: string, value: T): Promise<T> {
        return chrome.storage.sync.set({ [key]: value })
            .then(_ => Promise.resolve(value))
    }

    get<T>(key: string, defaultValue: T): Promise<T> {
        return chrome.storage.sync.get([key])
            .then(items => {
                if (items[key] === undefined) {
                    if (defaultValue === undefined) {
                        return Promise.reject('Default value is undefined');
                    }
                    return Promise.resolve(defaultValue);
                }

                return Promise.resolve(items[key]);
            });
    }

    remove(key: string): Promise<void> {
        return chrome.storage.sync.remove([key]);
    }

}

export default ChomeKeyValueStorage;
