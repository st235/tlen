import { BackgroundEntryVisitor } from './BackgroundEntryVisitor';

export interface BackgroundEntry {

    id: string;

    visit(visitor: BackgroundEntryVisitor): void;

}

export class BackgroundImageEntry implements BackgroundEntry {

    id: string
    url: string
    isGrayScaled: Boolean

    constructor(id: string, url: string, isGrayScaled: Boolean) {
        this.id = id
        this.url = url
        this.isGrayScaled = isGrayScaled
    }

    visit(visitor: BackgroundEntryVisitor) {
        visitor.doForImage(this)
    }
}
