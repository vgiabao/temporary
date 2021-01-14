import React, {Component} from 'react';
import {Button, Input} from "antd";
import {UserOutlined, HomeTwoTone,SecurityScanTwoTone,FlagTwoTone, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";
import axios from "axios";
import variables from "../../localVariables";
import {navigate} from "@reach/router"
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
            address: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.getState = this.getState.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    getState(name){
        return this.state[name];
    }

    handleClickSubmit(){
        axios.post(variables.registerUrl, this.state).then((result) => {
            console.log(result)
        })
    }

    handleClickLogin(){
        navigate("login")
    }

    render() {
        return (
            <div className={'text-center d-flex flex-column'} style={{alignItems: "center"}}>
                <h3> Register Form </h3>
                <div className={"col-4"}>
                    <Input name={"account"}  required={true} size="large" type={"text"} placeholder="Account"
                           onChange={this.handleChange} prefix={<UserOutlined />}/>
                    <Input name={"password"} type={"password"} size="large" placeholder="password"
                           onChange={this.handleChange} prefix={<SecurityScanTwoTone />}/>
                    <Input name={"reInputPassword"} type={"password"} size="large" placeholder="reInput your password"
                           onChange={this.handleChange} prefix={<SecurityScanTwoTone />}/>
                    <Input name={"name"} size="large" placeholder="Your name" onChange={this.handleChange}
                           prefix={<FlagTwoTone />}/>
                    <Input name={"email"} size="large" placeholder="Your email" onChange={this.handleChange}
                           prefix={<MailTwoTone />}/>
                    <Input name={"phone"} size="large" placeholder="Your phone number" onChange={this.handleChange}
                           prefix={<PhoneTwoTone />}/>
                    <Input name={"address"} size="large" placeholder="Your Address" onChange={this.handleChange}
                           prefix={<HomeTwoTone />}/>
                    <h6 style={{color:"darkblue"}} onClick={this.handleClickLogin}> Have an account? Login!</h6>
                    <Button  onClick={this.handleClickSubmit}> Submit </Button>
                </div>
            </div>
        );
    }
}

export default RegisterPage;
