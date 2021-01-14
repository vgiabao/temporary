import React, {Component} from 'react';
import {Input, Button, Form, Checkbox} from "antd";
import axios from "axios";
import localVariables from "../../localVariables";
import {navigate} from "@reach/router";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "",
            isWarning: false,
            currentUser: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onFinish = this.onFinish.bind(this);

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    clickRegister(){
        navigate('register')
    }


    onFinish(values) {
        let config = {
            headers: {'Login': 'JWT '},
            params: {
                account: values.username,
                password: values.password
            },
        }
        axios.get(localVariables.loginUrl, config, (result) => {
            console.log(result);
        }).then(r => {
                if (r.data.data.length > 0) {
                    const userData = r.data.data[0];
                    this.setState({currentUser: userData});
                    localStorage.setItem("id",userData.user_id);
                }
            }
        )
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.currentUser !== nextState.currentUser) {
            if (nextState.currentUser!=null){
                this.props.handleChangeLogged();
                navigate("user/" + nextState.currentUser.user_id)
                this.props.handleCurrentUser(true, this.state.currentUser);

            }
        }
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
                offset: 4,
                span: 16,
            },
        };
        return (
            <div className={"container-fluid"}
                 style={{display: "flex", alignItems: "center", flexDirection: "column",}}>
                <div className={"col-lg-4 col-md-6 col-sm-12"}>
                    <h2>Login</h2>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <h6 onClick={this.clickRegister} style={{color:"darkblue"}}>
                            Do not have account? Create one!
                        </h6>
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
