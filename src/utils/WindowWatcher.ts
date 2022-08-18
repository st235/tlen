class WindowWatcher {

    private static INSTANCE: WindowWatcher;

    static getInstance(): WindowWatcher {
        if (this.INSTANCE == null) {
            this.INSTANCE = new WindowWatcher();
        }

        return this.INSTANCE;
    }

    private _isVisible: boolean = false

    private constructor() {
        document.addEventListener('visibilitychange', () => {
            this.updateVisibility();
        });

        this.updateVisibility();
    }

    isVisible(): boolean {
        return this._isVisible;
    }

    private updateVisibility() {
        if (document.visibilityState === 'visible') {
            this._isVisible = true;
        } else {
            this._isVisible = false;
        }
    }

}

export default WindowWatcher;
