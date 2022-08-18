import React from 'react';

import { BackgroundImageEntry } from '../../../data/backgrounds/BackgroundEntry';
import { BackgroundEntryVisitor } from '../../../data/backgrounds/BackgroundEntryVisitor';

export default class CssBackgroundEntryVisitor implements BackgroundEntryVisitor {

    private cssState: React.CSSProperties = {};

    getState(): React.CSSProperties {
        return this.cssState
    }

    doForImage(entry: BackgroundImageEntry): void {
        let cssState: React.CSSProperties = {
            backgroundImage: "url(" + entry.url + ")",
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        }

        if (entry.isGrayScaled) {
            cssState.filter = 'grayscale(100%)'
        }

        this.cssState = cssState
    }

}
