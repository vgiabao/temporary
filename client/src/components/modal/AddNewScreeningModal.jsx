import React, {Component} from 'react';
import {Button, Input, Modal} from "antd";
import axios from "axios";
import localVariables from "../../localVariables";

class AddNewScreeningModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            starting_time: '',
            price:0.00,
            number_viewer: 0
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(){
        axios.post(localVariables.addScreening, {
            id: this.props.id,
            starting_time: this.state.starting_time,
            price: this.state.price,
            number_viewer: this.state.number_viewer
        }).then(result => {
            console.log(result)
        })
        setTimeout(() => window.location.reload(false), 200)
    }

    render() {
        return (
            <div className={'d-flex'} style={{alignItems:"center", justifyContent:"center"}}>
                <Button onClick={this.showModal}>
                    Add New Screening
                </Button>
                <Modal title={"Add New Screening"} onCancel={this.handleCancel} onOk={this.handleSubmit} visible={this.state.visible}>
                    <div>
                        <Input placeholder={'7:0:0 13-01-2021'} prefix={'Show Time: '} name={'starting_time'} onChange={this.handleChange} value={this.state.starting_time} />
                        <Input prefix={'Price: '} suffix={'$'} name={'price'} onChange={this.handleChange} value={this.state.price} />
                        <Input prefix={'Max Viewer: '} name={"number_viewer"} onChange={this.handleChange} value={this.state.number_viewer}  />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddNewScreeningModal;
