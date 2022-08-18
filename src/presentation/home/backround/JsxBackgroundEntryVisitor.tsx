import React from 'react';

import { BackgroundImageEntry } from '../../../data/backgrounds/BackgroundEntry';
import { BackgroundEntryVisitor } from '../../../data/backgrounds/BackgroundEntryVisitor';

export default class JsxBackgroundEntryVisitor implements BackgroundEntryVisitor {

    private jsxState: JSX.Element | null = null;

    getState(): JSX.Element {
        let state = this.jsxState

        if (state == null) {
            throw new Error("state cannot be null")
        }

        return state
    }

    doForImage(entry: BackgroundImageEntry): void {
        this.jsxState = (<img loading='lazy' src={entry.url} />);
    }

}
