import React, {Component} from 'react';
import {Input, Modal} from "antd";
import ShowTime from "../showtime/ShowTime";
import AddNewScreeningModal from "./AddNewScreeningModal";
import axios from "axios";
import localVariables from "../../localVariables";

class MovieDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,

        }
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

     handleSubmit(){
        this.setState({confirmLoading:true})
         axios.delete(localVariables.deleteMovie, {params: {id: this.props.item.id}}).then(res => console.log(res))
        this.setState({visible:false})
        // setTimeout(() => window.location.reload(), 400)
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

    render() {
        const item = this.props.item
        console.log('id', item.id)

        return (
            <div>
                <a  onClick={this.showModal} style={{color:'red'}} className={'mx-2'} key="list-loadmore-edit">Delete</a>
                <Modal confirmLoading={this.state.confirmLoading}  onOk={this.handleSubmit} visible={this.state.visible} onCancel={this.handleCancel} title={item.name}>
                    <h6> Do You Really Want To DELETE the movie {item.name} ?</h6>
                </Modal>
            </div>
        );
    }
}

export default MovieDeleteModal;
