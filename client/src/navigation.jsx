import React, {Component} from 'react';
import {Link, navigate} from "@reach/router"
import {Menu, Dropdown, Button} from "antd";
import {UserOutlined,LogoutOutlined} from "@ant-design/icons"
class Navigation extends Component {
    clickLogout = () => {
        navigate("/login")
        this.props.handleLogout();
    }

    clickProfile = () => {
        const id = localStorage.getItem("id")
        navigate("/user/" + id)
    }


    Menu = <Menu>
        <Menu.Item onClick={this.clickProfile} key="2" icon={<UserOutlined />}>
           Profile
        </Menu.Item>
        <hr/>
        <Menu.Item key="1" onClick={this.clickLogout} icon={<LogoutOutlined />}>
            Logout
        </Menu.Item>
    </Menu>

    render() {
        return (
            <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{}}>
                <Link to={'/'} className="navbar-brand" >Movie TT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active mr-2">
                            <Link to={"/"}  className="text-black-50">
                            Home
                            </Link>
                        </li>
                        { !this.props.isLogged === true ?
                            <li className="nav-item active mr-2">
                                <Link to={"login"} className="text-black-50">
                                    Login
                                </Link>
                            </li> : null}

                        { !this.props.isLogged === true ?
                            <li className="nav-item active">
                                <Link to={"register"} className="text-black-50">
                                    Register
                                </Link>
                            </li> : null}

                    </ul>
                    { this.props.isLogged === true ?
                        <div className={'d-inline-flex mr-5'}>
                            <Dropdown.Button  overlay={this.Menu} placement="bottomCenter" icon={<UserOutlined />}>
                            </Dropdown.Button>
                        </div>
                         : null}

                </div>
            </nav>
        );
    }
}



export default Navigation;
