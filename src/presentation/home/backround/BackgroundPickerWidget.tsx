import React, { MouseEvent } from 'react';
import BackgroundsRepository from '../../../data/backgrounds/BackgroundsRepository';
import MaterialButton from '../../components/button/MaterialButton';

import './BackgroundPickerWidget.css';
import JsxBackgroundEntryVisitor from './JsxBackgroundEntryVisitor';

import IcApps from './ic_apps.svg';
import { BackgroundEntry } from '../../../data/backgrounds/BackgroundEntry';

type BackgroundPickerWidgetProps = {
    // empty on purpose
}

type BackgroundPickerWidgetState = {
    isOpened: boolean,
    selectedItem: string | null,
    availableBackgrounds: BackgroundEntry[]
}

class BackgroundPickerWidget extends React.Component<BackgroundPickerWidgetProps, BackgroundPickerWidgetState> {

    private backgroundRepository = BackgroundsRepository.getInstance();

    state: BackgroundPickerWidgetState

    constructor(props: BackgroundPickerWidgetProps) {
        super(props)

        this.state = {
            isOpened: false,
            selectedItem: null,
            availableBackgrounds: []
        }

        this.onGalleryOpenClickListener = this.onGalleryOpenClickListener.bind(this);
    }

    componentDidMount() {
        this.backgroundRepository.getAvailableBackground()
            .then(availableBackgrounds => {
                this.setState({
                    selectedItem: availableBackgrounds[0],
                    availableBackgrounds: availableBackgrounds[1]
                });
            });
    }

    render() {
        let { isOpened } = this.state;

        return (
            <div>
                <MaterialButton 
                    title={(isOpened ? 'Close Gallery' : 'Show Gallery')}
                    icon={IcApps}
                    className='picker-button'
                    onClick={this.onGalleryOpenClickListener} />
                {this.createGallery()}
            </div>
        );
    }

    private onGalleryOpenClickListener(event: MouseEvent<HTMLDivElement>) {
        let { isOpened } = this.state;
        this.setState({
            isOpened: !isOpened
        })
    }

    private onItemClick(entry: BackgroundEntry) {
        this.backgroundRepository.select(entry)
            .then(_ => console.log('On Background Changed'))
            .catch(error => console.error(error));
    }

    private createGallery() {
        let { isOpened, selectedItem, availableBackgrounds } = this.state;

        let jsxBackgroundEntryVisitor = new JsxBackgroundEntryVisitor();

        let className = isOpened ? 'picker' : 'picker-hide';

        return (
            <div className={className}>
                { availableBackgrounds.map(item => {
                    item.visit(jsxBackgroundEntryVisitor);
                    return (<div key={item.id} className='picker-item' onClick={() => { this.onItemClick(item) }}>{jsxBackgroundEntryVisitor.getState()}</div>)
                }) }
            </div>
        );
    }

}

export default BackgroundPickerWidget;
