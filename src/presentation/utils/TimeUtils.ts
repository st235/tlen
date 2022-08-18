function localizeTimeInSeconds(time: number): [number | null, string] {
    if (time < 0) {
        return [null, ''];
    }

    if (time < 60) {
        return [time, 'seconds'];
    }

    time /= 60;

    if (time < 60) {
        return [Math.trunc(time), 'minutes'];
    }

    time /= 60;

    if (time < 24) {
        return [Math.trunc(time), 'hours'];
    }

    time /= 24;

    if (time < 7) {
        return [Math.trunc(time), 'days'];
    }

    time /= 7;

    return [Math.trunc(time), 'weeks'];
}

export { localizeTimeInSeconds };
