import React, {Component} from 'react';
import {  Input, Modal } from 'antd';
import ShowTimeModal from "../modal/ShowTimeModal";
import axios from "axios";
import localVariables from "../../localVariables";

class ShowTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTimes: this.props.showTimes
        }
    }
    componentDidMount() {
        this.setState({
            showTimes: this.props.showTimes
        })
    }


    onFinish(values){
        console.log(values)
    }






    render() {
        const data = this.state.showTimes;
        const dataContainer = data.map(item => (
            <div className={'row'}>
                <p className={'col-5'}> {item.starting_time}</p>
                <p className={'col-2'}> {item.price}$</p>
                <p className={'col-2'}> {item.number_viewer}</p>
                <ShowTimeModal item={item} convertDay={this.convertDay}/>
            </div>

        ))
        return (
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <p className={'col-5'}> Starting Time</p>
                    <p className={'col-2'}> Price</p>
                    <p className={'col-3'}> Max Viewers</p>
                </div>
                {dataContainer}
            </div>
        );
    }
}

export default ShowTime;
