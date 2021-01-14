import React, {Component} from 'react';
import {Modal, Input} from 'antd'
import axios from "axios";
import localVariables from "../../localVariables";

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: '',
            phone: '',
            email: '',
            address: '',
            type: 1,
            id: 0,
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOke = this.handleOke.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }


    handleCancel() {
        this.setState({visible: false})
    }

    handleOke() {

    }

    showModal(){
        this.setState({visible:true})
    }

    setupData(){
        this.setState({
            name: this.props.data.name,
            phone: this.props.data.phone,
            email: this.props.data.email,
            address: this.props.data.address,
            type: this.props.data.type,
            id: this.props.data.user_id
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        this.setupData();
    }

    updateUser(){
        const config = {
            headers: {'bookDetail': 'Detail'},
            params: {
                id: this.state.id,
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address,
                type: this.state.type
            },
        }
        axios.put(localVariables.updateUser, config).then(res => {
            console.log(res)
        })

        this.setState({
            visible:false
        })
        setTimeout(() => window.location.reload(false), 500)

    }


    render() {
        return (
            <div>
            <a onClick={this.showModal} className={'mx-2'} key="list-loadmore-edit">edit</a>
            <Modal onOk={this.updateUser} title={'User Information'} onCancel={this.handleCancel} visible={this.state.visible}>
                <Input prefix={'Name: '} name={'name'} onChange={this.handleChange} value={this.state.name} />
                <Input prefix={'Phone: '} name={'phone'} onChange={this.handleChange} value={this.state.phone} />
                <Input prefix={'Email: '} name={'email'} onChange={this.handleChange} value={this.state.email}/>
                <Input prefix={'Address: '} name={'address'} onChange={this.handleChange} value={this.state.address}/>
                { this.props.isAdmin ? <Input prefix={'User Type: '} name={'type'} onChange={this.handleChange} value={this.state.type}/> : null}
            </Modal>
            </div>
        );
    }
}

export default UserDetail;
