import React, {Component} from 'react';
import axios from "axios";
import variables from "../../localVariables";
import CategoryList from "../category/CategoryList";
import {Button, Dropdown, Menu} from "antd";
import {DownOutlined} from "@ant-design/icons"
import SeatBookingModal from "../modal/SeatBookingModal";
import {Link} from "@reach/router";

class CardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            currentIndex: 0,
            render: false,
        }
        this.fetchMovie = this.fetchMovie.bind(this);
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
    }

    async componentDidMount() {
        await this.fetchMovie();
        this.setState({render: true})
    }

    async fetchMovie() {
        const id = this.props.id;
        let config = {
            headers: {'cardDetail': 'Detail'},
            params: {
                id: id,
            },
        }
        await axios.get(variables.movieDetailUrl, config).then(res => {
            if (res.data.data.length > 0) {
                this.setState({detail: res.data.data})
                console.log('data from db', res.data.data)

            }
        })
        this.setState({render: true})
    }

    setCurrentIndex(e) {
        this.setState({currentIndex: e.target.name})
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.detail !== nextProps.detail) {
            this.setState({
                detail: nextState.detail
            })
        }
    }

    dateString(targetTime) {
        targetTime = new Date(targetTime)
        return targetTime.getDate() + '-' +( parseInt(targetTime.getMonth()) + 1) + '-' + targetTime.getFullYear()
    }


    render() {

        let isLogged = localStorage.getItem("isLogged");
        let renderContainer = <div></div>
        if (this.state.render) {
            let MenuItems;
            let i = -1;
            let data = this.state.detail[this.state.currentIndex]
            console.log('data', this.state.detail)

            MenuItems = this.state.detail.map(item => {
                i++;
                return (
                    <Menu.Item>
                        <a name={i} onClick={this.setCurrentIndex}> {this.dateString(item.starting_time)} </a>
                    </Menu.Item>)

            })
            const dropMenu = <Menu>
                {MenuItems}
            </Menu>
            renderContainer = <div className={'container row'}>
                <CategoryList/>
                <div className={'col-lg-9 col-md-9 col-sm-12'}>
                    <div className={'row'}>
                        <h3 className={'w-100 text-center'}> {data.name}</h3>
                        <div className={'col-lg-7 col-md-7 col-sm-12 mr-0'}>
                            <img src={data.image} alt={"movie image"}/>
                        </div>
                        <div className={'col-lg-5 col-md-5 col-sm-12'}>
                            <Dropdown overlay={dropMenu}>
                                <a className="ant-dropdown-link" style={{color: 'black'}}
                                   onClick={e => e.preventDefault()}>
                                    Date: {this.dateString(data.starting_time)} <DownOutlined/>
                                </a>
                            </Dropdown>
                            <div> Price: {data.price}$ / ticket</div>
                            {isLogged === 'true' ?
                                <SeatBookingModal movieDetailIndex={data.id} number={data.number_viewer}/>
                                : <Link to={'/login'}> Login To Book A Seat </Link>
                            }
                        </div>
                    </div>
                    <hr/>
                    <h3> Description </h3>
                    <p> {data.description} </p>

                </div>
            </div>
        }

        return (
            renderContainer
        );
    }
}

export default CardDetail;
