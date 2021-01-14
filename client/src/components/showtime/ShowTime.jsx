import React, {Component} from 'react';
import {  Input, Modal } from 'antd';

class ShowTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTimes: this.props.showTimes
        }
        this.removeItem = this.removeItem.bind(this);
    }
    componentDidMount() {
        this.setState({
            showTimes: this.props.showTimes
        })
    }


    onFinish(values){
        console.log(values)
    }

    removeItem(key){
        let arr = [];
        for (let item of this.state.showTimes){
            if (item.id === key){
                arr.push(item)
            }
        }
        this.setState({
            showTimes: arr
        })
    }
    handleChane(){

    }

    render() {
        const data = this.state.showTimes;
        const dataContainer = data.map(item => (
            <div>
            <Input prefix={'Price'} onChange={this.handleChane}  />
            <Input prefix={'Price'} onChange={this.handleChane} />
            </div>
        ))
        return (
            <div>
            <Modal>

            </Modal>
            </div>
        );
    }
}

export default ShowTime;
