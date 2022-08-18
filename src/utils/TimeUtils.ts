class TimeUtils {

    private constructor() {
        // private on purpose
    }

    static getCurrentTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    }

}

export default TimeUtils;
