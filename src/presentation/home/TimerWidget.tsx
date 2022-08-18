import React from 'react';
import GlobalTimeSpentWatcher from '../../utils/GlobalTimeSpentWatcher';
import { localizeTimeInSeconds } from '../utils/TimeUtils';

import './TimerWidget.css';

type TimerWidgetProps = {
    // empty on purpose
}

type TimerWidgetState = {
    elapsedTime: number
}

class TimerWidget extends React.Component<TimerWidgetProps, TimerWidgetState> {

    state: TimerWidgetState

    private onTimeElapsedListener = (timeElapsed: number, _: number) => {
        this.setState({
            elapsedTime: timeElapsed
        });
    }

    constructor(props: TimerWidgetProps) {
        super(props)

        this.state = {
            elapsedTime: 0
        };
    }

    componentDidMount() {
        GlobalTimeSpentWatcher.getInstance()
            .addListener(this.onTimeElapsedListener)
    }

    componentWillUnmount() {
        GlobalTimeSpentWatcher.getInstance()
            .removeListener(this.onTimeElapsedListener)
    }

    render() {
        let { elapsedTime } = this.state;
        let localizedTime = localizeTimeInSeconds(elapsedTime)

        return (
            <div className='timer-widget'>
                <p className='title'>"Tlen" is not a state of mind. Remember, you're not alone! Don't stare at the screen, spend this time better.</p>
                <p><span className='time'>{localizedTime[0]}</span><span className='units'> {localizedTime[1]}</span></p>
            </div>
          );
    }

}

export default TimerWidget;
