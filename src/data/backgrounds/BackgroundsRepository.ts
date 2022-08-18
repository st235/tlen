import { resolve } from 'path';
import { assertNever } from '../../utils/Assertions';
import KeyValueStorage, { newKeyValueStorage } from '../storage/KeyValueStorage';
import { BackgroundEntry, BackgroundImageEntry } from './BackgroundEntry';

import BACKGROUNDS_PRESET from './backgrounds.json';

type OnBackgroundChangedListener = (entry: BackgroundEntry) => void;

class BackgroundsRepository {

    private static KEY_ID = 'key.id';
    private static KEY_DEFAULT_ID = 'default';

    private static INSTANCE: BackgroundsRepository;

    public static getInstance(): BackgroundsRepository {
        if (this.INSTANCE == null) {
            this.INSTANCE = new BackgroundsRepository();
        }
        return this.INSTANCE;
    }

    private backgrounds: BackgroundEntry[]

    private storage: KeyValueStorage
    private onBackgroundChangedListeners: OnBackgroundChangedListener[]

    constructor() {
        this.storage = newKeyValueStorage();
        this.onBackgroundChangedListeners = [];

        this.backgrounds = [];

        for (let background of BACKGROUNDS_PRESET as any[]) {
            if (background['type'] === 'image') {
                this.backgrounds.push(
                    new BackgroundImageEntry(
                        background['id'],
                        background['url'],
                        true
                    )
                )
            }
        }

        console.log(this.backgrounds);
    }

    addOnBackgroundChangedListener(listener: OnBackgroundChangedListener) {
        this.onBackgroundChangedListeners.push(listener);
    }

    removeOnBackgroundChangedListener(listener: OnBackgroundChangedListener) {
        let indexToRemove = this.onBackgroundChangedListeners.indexOf(listener);

        if (indexToRemove !== -1) {
            this.onBackgroundChangedListeners.splice(indexToRemove, 1);
        }
    }

    select(entry: BackgroundEntry): Promise<void> {
        return this.storage.put(BackgroundsRepository.KEY_ID, entry.id)
            .then(_ => {
                for (let listener of this.onBackgroundChangedListeners) {
                    listener(entry);
                }

                return Promise.resolve();
            });
    }

    getSelectedEntry(): Promise<BackgroundEntry> {
        return this.getSelectedId()
        .then(selectedId => {
            console.log('selectedId', selectedId);
            return this.backgrounds.find(item => item.id === selectedId) ?? assertNever('Item was not found');
        })
    }

    getSelectedId(): Promise<string> {
        return this.storage.get<string>(BackgroundsRepository.KEY_ID, BackgroundsRepository.KEY_DEFAULT_ID);
    }

    getAvailableBackground(): Promise<[string, BackgroundEntry[]]> {
        return this.getSelectedId()
            .then(selectedId => Promise.resolve([selectedId, this.backgrounds]));
    }

}

export default BackgroundsRepository;
