import React, {Component} from 'react';
import {Button, Input, Modal} from 'antd'
import ShowTime from "../showtime/ShowTime";
import AddNewScreeningModal from "./AddNewScreeningModal";
import axios from "axios";
import localVariables from "../../localVariables";
class AddNewMovieModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name:'movie name',
            short_description: 'movie short description',
            description: 'movie description',
            category_id: 'category id from 1 to 9',
            image: 'image url',
        }
        this.showModal = this.showModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    showModal() {
        this.setState({visible: true})
    }
    handleCancel(){
        this.setState({visible:false})
    }

    handleSubmit(){
        axios.post(localVariables.addMovie, this.state).then(res => {
            console.log("successfully add a movie!")
        })
        this.setState({visible:false})
        setTimeout(() => window.location.reload(), 1000)

    }



    render() {
        return (
            <div>
                <Button onClick={this.showModal}> Add A Movie </Button>
                <Modal onOk={this.handleSubmit} visible={this.state.visible} onCancel={this.handleCancel} title={"Add New Movie"}>
                    <h5>Movie Title: </h5>
                    <Input prefix={'Name: '} name={'name'} onChange={this.handleChange} value={this.state.name}/>
                    <h5> Short Description</h5>
                    <Input.TextArea style={{height: '20vh'}} prefix={'Short Description: '} name={'short_description'}
                                    onChange={this.handleChange} value={this.state.short_description}/>
                    <h5> Description: </h5>
                    <Input.TextArea style={{height: '40vh'}} prefix={'Description: '} name={'description'}
                                    onChange={this.handleChange} value={this.state.description}/>
                    <h5> Category ID: </h5>
                    <Input prefix={'Category ID: '} name={'category_id'} onChange={this.handleChange}
                           value={this.state.category_id}/>
                    <h5> Image Url: </h5>
                    <Input prefix={'Image Url: '} name={'image'} onChange={this.handleChange} value={this.state.image}/>
                    <img src={this.state.image} alt={'movie image'}/>
                </Modal>
            </div>
        );
    }
}

export default AddNewMovieModal;
