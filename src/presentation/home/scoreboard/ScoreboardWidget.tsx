import { throws } from 'assert';
import React from 'react';
import SpentTimeRepository from '../../../data/SpentTimeRepository';
import { localizeTimeInSeconds } from '../../utils/TimeUtils';

import icFunctions from './ic_functions.svg';
import icSportsScore from './ic_sports_score.svg';

import './ScoreboardWidget.css';

type ScoreboardWidgetProps = {
}

type ScoreboardWidgetState = {
    topTime: number,
    overallTime: number
}

class ScoreboardWidget extends React.Component<ScoreboardWidgetProps, ScoreboardWidgetState> {

    state: ScoreboardWidgetState

    private spentTimeRepository: SpentTimeRepository

    private onTopTimeChangedListener = (topTime: number) => {
        this.setState({
            topTime: topTime
        });
    }

    private onOverallTimeChangedListener = (overallTime: number) => {
        this.setState({
            overallTime: overallTime
        });
    }

    constructor(props: ScoreboardWidgetProps) {
        super(props)

        this.spentTimeRepository = SpentTimeRepository.getInstance()

        this.state = {
            topTime: -1,
            overallTime: -1
        }
    }

    componentDidMount() {
        this.spentTimeRepository
            .getTopTimeSpent()
            .then(topTime => this.onTopTimeChangedListener(topTime));

        this.spentTimeRepository
            .getOverallTimeSpent()
            .then(overallTime => this.onOverallTimeChangedListener(overallTime));

        this.spentTimeRepository.onTopTimeSpentChangedListener = this.onTopTimeChangedListener
        this.spentTimeRepository.onOverallTimeSpentChangedListener = this.onOverallTimeChangedListener
    }

    componentWillUnmount() {
        this.spentTimeRepository.onTopTimeSpentChangedListener = null
        this.spentTimeRepository.onOverallTimeSpentChangedListener = null
    }

    render() {
        let { topTime, overallTime } = this.state;

        return (
            <div className='scoreboard'>
                <div className='item'>
                    <div className='icon'>
                        <img src={icSportsScore} alt='Icon' />
                        <span className='title'>Top Time Spent</span>
                    </div>
                    <div className='text'>
                        {this.getElementForLocalizedString(topTime)}
                    </div>
                </div>
                <div className='item'>
                    <div className='icon'>
                        <img src={icFunctions} alt='Icon' />
                        <span className='title'>Overall Time Spent</span>
                    </div>
                    <div className='text'>
                    {this.getElementForLocalizedString(overallTime)}
                    </div>
                </div>
            </div>
        );
    }

    private getElementForLocalizedString(time: number) {
        let localizedTime = localizeTimeInSeconds(time)

        if (localizedTime[0] == null) {
            return (<span>'loading...'</span>);
        }

        return (<span><b>{localizedTime[0]}</b> {localizedTime[1]}</span>);
    }

}

export default ScoreboardWidget;
