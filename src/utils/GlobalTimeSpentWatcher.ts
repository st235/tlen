import { time } from "console";
import WindowWatcher from "./WindowWatcher";

type OnSpentTimeUpdateListener = (elapsedTime: number, timeDiff: number) => void

class GlobalTimeSpentWatcher {

    private static INSTANCE: GlobalTimeSpentWatcher | null = null

    private timerId?: number
    private windowWatcher: WindowWatcher

    private elapsedTime: number = 0

    private listeners: OnSpentTimeUpdateListener[]

    constructor(windowWatcher: WindowWatcher = WindowWatcher.getInstance()) {
        this.windowWatcher = windowWatcher
        this.listeners = []

        this.timerId = window.setInterval(() => { this.onTick(1) }, 1000);
    }

    static getInstance(): GlobalTimeSpentWatcher {
        if (this.INSTANCE == null) {
            this.INSTANCE = new GlobalTimeSpentWatcher()
        }

        return this.INSTANCE
    }

    addListener(listener: OnSpentTimeUpdateListener) {
        this.listeners.push(listener)
    }

    removeListener(listener: OnSpentTimeUpdateListener) {
        let indexToDelete = this.listeners.indexOf(listener)

        if (indexToDelete !== -1) {
            this.listeners.splice(indexToDelete, 1)
        }
    }

    onTick(timeDiff: number) {
        if (!this.windowWatcher.isVisible()) {
            return
        }

        this.elapsedTime += timeDiff
        
        for (let listener of this.listeners) {
            listener(this.elapsedTime, timeDiff)
        }
    }

}

export default GlobalTimeSpentWatcher;
