import ChomeKeyValueStorage from "./ChomeKeyValueStorage";
import LocalKeyValueStorage from "./LocalKeyValueStorage";

interface KeyValueStorage {

    put<T>(key: string, value: T): Promise<T>;

    get<T>(key: string, defaultValue: T): Promise<T>;

    remove(key: string): Promise<void>;

}

function newKeyValueStorage(): KeyValueStorage {
    if (!ChomeKeyValueStorage.isAvailable()) {
        return new LocalKeyValueStorage();
    }

    return new ChomeKeyValueStorage();
}

export default KeyValueStorage;
export { newKeyValueStorage };
