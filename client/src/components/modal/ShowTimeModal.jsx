import React, {Component} from 'react';
import {Input, Modal} from "antd";
import axios from "axios";
import localVariables from "../../localVariables";

class ShowTimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            starting_time: '',
            price: 0.00,
            number_viewer: 0,
            id: 0
        }
        this.showModal = this.showModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.setupData = this.setupData.bind(this);
        this.updateScreening = this.updateScreening.bind(this);
    }


    showModal(){
        this.setState({visible: true})
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handleCancel(){
        this.setState({visible:false})
    }
    setupData(){
        const data = this.props.item;
        this.setState({
            starting_time: data.starting_time,
            price: data.price,
            number_viewer: data.number_viewer,
            id:data.id
        })
    }
    componentDidMount() {
        this.setupData();
    }


    updateScreening(){
        const config = {
            headers: {'movieDetail': 'Detail'},
            params: {
                id: this.state.id,
                starting_time:this.state.starting_time,
                price: this.state.price,
                number_viewer: this.state.number_viewer,
            },
        }
        axios.put(localVariables.updateScreening, config).then(res => {
            console.log(res)
        })
        this.setState({
            visible:false
        })
        setTimeout(() => window.location.reload(), 500)

    }

    render() {
        return (
            <div>
                <a className={'col-3'} onClick={this.showModal}>  Edit  </a>
            <Modal title={"Modify Screening"} onCancel={this.handleCancel} onOk={this.updateScreening} visible={this.state.visible}>
                <div>
                    <Input prefix={'Show Time: '} name={'starting_time'} onChange={this.handleChange} value={this.state.starting_time} />
                    <Input prefix={'Price: '} suffix={'$'} name={'price'} onChange={this.handleChange} value={this.state.price} />
                    <Input prefix={'Max Viewer: '} name={"number_viewer"} onChange={this.handleChange} value={this.state.number_viewer}  />
                </div>
            </Modal>
            </div>
        );
    }
}

export default ShowTimeModal;
