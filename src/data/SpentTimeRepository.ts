import KeyValueStorage, { newKeyValueStorage } from "./storage/KeyValueStorage";

type OnTopTimeSpentChangedListener = (topTimeSpent: number) => void
type OnOverallTimeSpentChangedListener = (overallTimeSpent: number) => void

class SpentTimeRepository {

    private static INSTANCE: SpentTimeRepository | null = null

    private static KEY_TOP_TIME_SPENT = "key.top_time_spent"
    private static OVERALL_TIME_SPENT = "key.overall_time_spent"

    private keyValueStorate: KeyValueStorage

    onTopTimeSpentChangedListener: OnTopTimeSpentChangedListener | null = null
    onOverallTimeSpentChangedListener: OnOverallTimeSpentChangedListener | null = null

    constructor(keyValueStorage: KeyValueStorage = newKeyValueStorage()) {
        this.keyValueStorate = keyValueStorage
    }

    static getInstance(): SpentTimeRepository {
        if (this.INSTANCE == null) {
            this.INSTANCE = new SpentTimeRepository()
        }

        return this.INSTANCE
    }

    getTopTimeSpent(): Promise<number> {
        return this.keyValueStorate.get(SpentTimeRepository.KEY_TOP_TIME_SPENT, 0)
    }

    updateTopTimeSpent(newTopTimeSpent: number): Promise<number | null> {
        return this.getTopTimeSpent()
            .then(topTimeSpent => {
                if (topTimeSpent < newTopTimeSpent) {
                    return this.keyValueStorate.put<number>(SpentTimeRepository.KEY_TOP_TIME_SPENT, newTopTimeSpent)
                }

                return Promise.resolve(null)
            })
            .then(newTopTimeSpent => {
                if (this.onTopTimeSpentChangedListener && newTopTimeSpent) {
                    this.onTopTimeSpentChangedListener(newTopTimeSpent)
                }

                return Promise.resolve(newTopTimeSpent)
            })
    }

    getOverallTimeSpent(): Promise<number> {
        return this.keyValueStorate.get(SpentTimeRepository.OVERALL_TIME_SPENT, 0)
    }

    updateOverallTimeSpent(timeSpentDiff: number): Promise<number> {
        return this.getOverallTimeSpent()
            .then(overallTimeSpent => this.keyValueStorate.put(SpentTimeRepository.OVERALL_TIME_SPENT, overallTimeSpent + timeSpentDiff))
            .then(newOverallTimeSpent => {
                if (this.onOverallTimeSpentChangedListener) {
                    this.onOverallTimeSpentChangedListener(newOverallTimeSpent)
                }

                return Promise.resolve(newOverallTimeSpent)
            })
    }


}

export default SpentTimeRepository;
