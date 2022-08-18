import React from 'react';

import './MaterialButton.css';

type MaterialButtonProps = {
    title: string,
    icon?: string | undefined,
    className?: string | undefined,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

type MaterialButtonState = {
    title: string,
    icon: string | undefined,
    className: string | undefined,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}

class MaterialButton extends React.Component<MaterialButtonProps, MaterialButtonState> {

    state: MaterialButtonState

    constructor(props: MaterialButtonProps) {
        super(props)

        this.state = {
            title: props.title,
            icon: props.icon,
            className: props.className,
            onClick: props.onClick
        }
    }

    componentDidUpdate(prevProps: MaterialButtonProps) {
        if (prevProps === this.props) {
            return;
        }

        this.setState({
            title: this.props.title,
            icon: this.props.icon,
            className: this.props.className,
            onClick: this.props.onClick
        })
    }

    render() {
        let { title, icon, className, onClick } = this.state;

        let realClassName = 'material-button ' + className;

        return (
            <div className={realClassName} onClick={onClick}>
                { icon ? <img className='icon' src={icon} /> : null }
                <span className='text'>{title}</span>
            </div>
        );
    }

}

export default MaterialButton;
