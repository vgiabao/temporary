import React, {Component} from 'react';
import {Input, Modal, Button} from "antd";
import axios from "axios";
import localVariables from "../../localVariables";
import ShowTime from "../showtime/ShowTime";
import {PlusCircleOutlined} from "@ant-design/icons"
import ShowTimeModal from "./ShowTimeModal";
import AddNewScreeningModal from "./AddNewScreeningModal";
class MovieDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showTimes: [],
            movieViewer: [],
            id: 0,
            name: '',
            description: '',
            short_description: '',
            category_id: '',
            image: '',
            render: false,
            confirmLoading:false

        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        this.setupData = this.setupData.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.fetchShowTime = this.fetchShowTime.bind(this)
    }

    showModal() {
        this.setState({visible: true})
    }

    handleCancel() {
        this.setState({visible: false})
    }

    setupData() {
        const item = this.props.item
        this.setState({
            id: item.id,
            name: item.name,
            description: item.description,
            short_description: item.short_description,
            category_id: item.category_id,
            image: item.image,
        })
    }

    handleSubmit() {
        const config = {
            headers: {'bookDetail': 'Detail'},
            params: {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                short_description: this.state.short_description,
                category_id: this.state.category_id,
                image: this.state.image
            },
        }
        console.log(config)
        axios.put(localVariables.updateMovie, config).then(res => {
            console.log(res)
        })

        this.setState({
            confirmLoading: true,
            visible: false
        })
        setTimeout(() => window.location.reload(), 1500)

    }

    async componentDidMount() {
        this.setupData();
        console.log('id' + this.state.id)
        await this.fetchShowTime();
        this.setState({render: true})
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async fetchShowTime() {
        let config = {
            headers: {'Movie': 'detail'},
            params: {
                id:this.props.item.id
            }
        }
        await axios.get(localVariables.movieDetailUrl, config).then(res => {
            this.setState({showTimes: res.data.data})
        })
    }

    render() {
        const item = this.props.item;
        let container = <div></div>;
        if (this.state.render) {
            container = <div>
                <a  onClick={this.showModal} className={'mx-2'} key="list-loadmore-edit">edit</a>
                <Modal confirmLoading={this.state.confirmLoading}  onOk={this.handleSubmit} visible={this.state.visible} onCancel={this.handleCancel} title={item.name}>
                    <h3>Movie Title: </h3>
                    <Input prefix={'Name: '} name={'name'} onChange={this.handleChange} value={this.state.name}/>
                    <h3> Short Description</h3>
                    <Input.TextArea style={{height: '20vh'}} prefix={'Short Description: '} name={'short_description'}
                                    onChange={this.handleChange} value={this.state.short_description}/>
                    <h3> Description: </h3>
                    <Input.TextArea style={{height: '40vh'}} prefix={'Description: '} name={'description'}
                                    onChange={this.handleChange} value={this.state.description}/>
                    <h3> Category ID: </h3>
                    <Input prefix={'Category ID: '} name={'category_id'} onChange={this.handleChange}
                           value={this.state.category_id}/>
                    <h3> Image Url: </h3>
                    <Input prefix={'Image Url: '} name={'image'} onChange={this.handleChange} value={this.state.image}/>
                    <img src={this.state.image} alt={'movie image'}/>
                    <h3 className={'mb-1'}> Screening:  </h3>
                    <ShowTime  showTimes={this.state.showTimes}/>
                    <AddNewScreeningModal id={this.state.id}/>
                </Modal>
            </div>
        }
        return (
            container
        );
    }
}

export default MovieDetailModal;
