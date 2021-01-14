import React, {Component} from 'react';

class PreviewMoviewMocal extends Component {
    constructor(props) {
        super(props);
        this.state= {
            visible: false
        }
    }

    handleCancelModal(){}
    handleSubmitModal(){

    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.visible !== nextProps.visible){

        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default PreviewMoviewMocal;
