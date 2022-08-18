import React from 'react';

import logo from './logo.svg';
import './TitleWidget.css';

type TitleWidgetProps = {
    title: string,
    description: string
}

type TitleWidgetState = {
    title: string,
    description: string
}

class TitleWidget extends React.Component<TitleWidgetProps, TitleWidgetState> {

    state: TitleWidgetState

    constructor(props: TitleWidgetProps) {
        super(props)

        this.state = {
            title: props.title,
            description: props.description
        }
    }

    render() {
        const { title, description } = this.state;

        return (
            <div className='title-widget'>
                <img src={logo} className='icon' alt='Icon' />
                <div className='text-container'>
                    <p className='title'>{title}</p>
                    <p className='description'>{description}</p>
                </div>
            </div>
        );
    }

}

export default TitleWidget;
