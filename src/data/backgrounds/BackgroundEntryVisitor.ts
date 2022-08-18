import { BackgroundImageEntry } from './BackgroundEntry';

export interface BackgroundEntryVisitor {

    doForImage(entry: BackgroundImageEntry): void;

}

