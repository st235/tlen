import React from 'react';
import BackgroundsRepository from '../../data/backgrounds/BackgroundsRepository';
import CssBackgroundEntryVisitor from './backround/CssBackgroundEntryVisitor';
import TitleWidget from './TitleWidget';

import './HomeScreen.css';

import BackgroundPickerWidget from './backround/BackgroundPickerWidget';
import TimerWidget from './TimerWidget';
import ScoreboardWidget from './scoreboard/ScoreboardWidget';
import { BackgroundEntry } from '../../data/backgrounds/BackgroundEntry';

type HomeScreenProps = {
    // empty on purpose
}

type HomeScreenState = {
    currentBackground: BackgroundEntry | null
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {

    private backgroundRepository = BackgroundsRepository.getInstance()

    state: HomeScreenState

    private onBackgroundChangeListener = (entry: BackgroundEntry) => {
        this.setState({
            currentBackground: entry
        });
    }

    constructor(props: HomeScreenProps) {
        super(props)

        this.state = {
            currentBackground: null
        }
    }

    componentDidMount() {
        this.backgroundRepository.getSelectedEntry()
            .then(entry => this.onBackgroundChangeListener(entry));

        this.backgroundRepository.addOnBackgroundChangedListener(this.onBackgroundChangeListener);
    }

    componentWillUnmount() {
        this.backgroundRepository.removeOnBackgroundChangedListener(this.onBackgroundChangeListener);
    }

    render() {
        let { currentBackground } = this.state;

        return (
            <div className='container'>
                <div className='container child background-box' style={this.getDynamicBackground(currentBackground)} />
                <div className='container child content'>
                    <div className='top-left-column'>
                        <TitleWidget 
                            title='Tlen 81'
                            description='Tlen is the least useful extension in the world. However, it helps you to enjoy to spend some time with yourself.' />
                        <ScoreboardWidget />
                    </div>
                    <div className='top-right-column'>
                        <BackgroundPickerWidget />
                    </div>
                    <div className='bottom-middle-column'>
                        <TimerWidget />
                    </div>
                </div>
            </div>
        );
    }

    private getDynamicBackground(backgroundEntry: BackgroundEntry | null): React.CSSProperties {
        if (backgroundEntry == null) {
            return {
                backgroundColor: 'grey'
            }
        }

        let cssBackgroundEntryVisitor = new CssBackgroundEntryVisitor();

        backgroundEntry.visit(cssBackgroundEntryVisitor);

        return cssBackgroundEntryVisitor.getState();
    }

}

export default HomeScreen;
