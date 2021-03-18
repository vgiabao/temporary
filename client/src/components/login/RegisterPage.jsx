import React, {Component} from 'react';
import {Button, Input, message, Form} from "antd";
import {UserOutlined, HomeTwoTone,SecurityScanTwoTone,FlagTwoTone, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";
import axios from "axios";
import variables from "../../localVariables";
import {navigate} from "@reach/router"
import localVariables from "../../localVariables";
message.config({
    top:40
})
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "",
            reInputPassword: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            isExisting: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.getState = this.getState.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
        this.clearData = this.clearData.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    getState(name){
        return this.state[name];
    }

    async handleClickSubmit(){
        await this.isExistingAccount()
        console.log(this.state.isExisting)
        if (!this.state.isExisting)
        {
            if (this.checkMatch()) {
                axios.post(variables.registerUrl, this.state).then((result) => {
                    console.log(result)
                })
                message.success("Successfully Create New Account! Login Now!")
                this.clearData();
            }
        }
        else{
            message.error('Account Is Existing! Please Choose Another One!');
        }
    }


    checkMatch(){
        if (this.state.password !== this.state.reInputPassword){
            message.error("Password And It's Confirmation Do Not Match!");
            return false;
        }
        return true;
    }


    clearData(){
        this.setState({
            account: "",
            password: "",
            reInputPassword: "",
            name: "",
            email: "",
            phone: "",
            address: "",
        })
    }

    handleClickLogin(){
        navigate("login")
    }

    async isExistingAccount(){
        let config = {
            headers: {'Movie': 'detail'},
            params: {
                account:this.state.account
            }
        }

        await axios.get(localVariables.registerCheck, config).then (r => {
            if (r.data.data.length === 0) this.setState({
                isExisting: false
            })
            else {
                this.setState({
                    isExisting: true
                })
            }
        })
    }



    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <div className={'text-center container d-flex flex-column'} style={{alignItems: "center"}}>
                <h3> Register Form </h3>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.handleClickSubmit}
                    >
                        <Form.Item
                            label="Account"
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your account!',
                                },
                            ]}
                        >
                            <Input name={"account"}  required={true} size="large" type={"text"} placeholder="Account"
                                   onChange={this.handleChange} value={this.state.account} prefix={<UserOutlined />}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name={'password'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input name={"password"} type={"password"} size="large" placeholder="Your Password"
                                   onChange={this.handleChange} value={this.state.password} prefix={<SecurityScanTwoTone />}/>
                        </Form.Item>
                        <Form.Item
                            onChange={this.handleChange}
                            label="Confirm Password"
                            name="reInputPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Confirm Your Password!',
                                },
                            ]}
                        >
                            <Input name={"reInputPassword"} type={"password"} size="large" placeholder="Confirm your password"
                                   onChange={this.handleChange}  value={this.state.reInputPassword} prefix={<SecurityScanTwoTone />}/>
                        </Form.Item>
                        <Form.Item
                            onChange={this.handleChange}
                            label="Your Full Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Confirm Your Name!',
                                },
                            ]}
                        >
                            <Input name={"name"} size="large" placeholder="Your name" onChange={this.handleChange}
                                   prefix={<FlagTwoTone />}/>
                        </Form.Item>
                        <Form.Item
                            onChange={this.handleChange}
                            label="Your Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Confirm Your Email!',
                                },
                            ]}
                        >
                            <Input name={"email"} size="large" value={this.state.email} placeholder="Your email" onChange={this.handleChange}
                                   prefix={<MailTwoTone />}/>
                        </Form.Item>
                        <Form.Item
                            onChange={this.handleChange}
                            label="Your Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Confirm Your Address!',
                                },
                            ]}
                        >
                            <Input name={"address"} size="large" value={this.state.address} placeholder="Your Address" onChange={this.handleChange}
                                   prefix={<HomeTwoTone />}/>
                        </Form.Item>
                        <Form.Item
                            onChange={this.handleChange}
                            label="Your Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Confirm Your Phone!',
                                },
                            ]}
                        >
                            <Input name={"phone"} size="large" value={this.state.phone} placeholder="Your phone number" onChange={this.handleChange}
                                   prefix={<PhoneTwoTone />}/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            </div>
        );
    }
}

export default RegisterPage;
