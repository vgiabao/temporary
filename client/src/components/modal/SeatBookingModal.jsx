import React, {Component} from 'react';
import {Modal} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import Seat from "../seat/Seat";
import axios from "axios";
import variables from "../../localVariables";
import localVariables from "../../localVariables";

class SeatBookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            bookingSeats: [],
            bookedSeats: [],
            bookedUsers: [],
            render: false,
            loading: false,
            userIndex: localStorage.getItem("id")
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAddSeat = this.handleAddSeat.bind(this);
        this.handleRemoveSeat = this.handleRemoveSeat.bind(this);
        this.isInclude = this.isInclude.bind(this);
        this.fetchSeat = this.fetchSeat.bind(this);
        this.onOkHandler = this.onOkHandler.bind(this);
        this.isSelfBooked = this.isSelfBooked.bind(this);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.visible === true && this.props.visible !== nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.movieDetailIndex !== this.props.movieDetailIndex) {
            this.setState({render: false})
            await this.fetchSeat().then(() => {
                this.setState({render: true})
            })


        }
    }


    handleCancel() {
        this.setState({visible: false})
        this.props.handleCancelModal();
    }

    handleAddSeat(seatIndex) {
        this.setState({
            bookingSeats: [...this.state.bookingSeats, seatIndex]
        })
    }

    handleOk(e) {
        for (let item of this.state.bookingSeats) {

        }
    }

    async componentDidMount() {
        await this.fetchSeat().then(() => this.setState({render: true})
        );
    }

    async fetchSeat() {
        const emptyArr = []
        this.setState({bookedSeats: emptyArr})
        this.setState({bookedUsers: emptyArr})
        const id = this.props.movieDetailIndex;
        let config = {
            headers: {'bookDetail': 'Detail'},
            params: {
                id: id,
            },
        }
        await axios.get(variables.movieIndex, config).then(res => {
            for (let seat of res.data.data) {
                this.setState({bookedSeats: [...this.state.bookedSeats, seat.seat_index]})
                this.setState({bookedUsers: [...this.state.bookedUsers, seat.user_index]})
            }
        })
    }


    handleRemoveSeat(seatIndex) {
        let newArr = []
        for (let item of this.state.bookingSeats) {
            if (item !== seatIndex) newArr.push(item)
        }
        this.setState({bookingSeats: newArr})
    }

    isInclude(seatIndex) {
        for (let item of this.state.bookedSeats) {
            if (item === seatIndex) return true
        }
        return false;
    }


    async onOkHandler() {
        if (this.state.bookingSeats.length ===0)
        {
            this.props.handleCancelModal();
            this.setState({visible:false})
        }
        else
        {
            this.setState({loading: true})
            for (let item of this.state.bookingSeats) {
                axios.post(localVariables.movieIndex, {
                    movieIndex: this.props.movieDetailIndex,
                    seatIndex: item,
                    userIndex: localStorage.getItem("id")
                })
            }
            setTimeout(() => window.location.reload(false), 1000)
        }

    }
    isSelfBooked(seatIndex){
        console.log(seatIndex, this.state.bookedUsers[seatIndex], this.isInclude(seatIndex),this.state.userIndex)

        if (this.isInclude(seatIndex) && this.state.userIndex==this.state.bookedUsers[seatIndex]){
            return true
        }
        return false
    }


    render() {

        let container = <div></div>
        if (this.state.render) {
            let arrSeat = [];

            for (let i = 1; i <= this.props.number; i++) {
                arrSeat.push((<Seat available={!this.isInclude(i)} handleRemoveSeat={this.handleRemoveSeat}
                                    handleAddSeat={this.handleAddSeat} isSelfBooked={this.isSelfBooked(i)} name={i} selected={false} size={'largest'}/>
                ))
            }
            container =
                <Modal style={{height: '50vh', overFlowY: 'scroll'}} title="Basic Modal" visible={this.state.visible}
                       onOk={this.onOkHandler}
                       onCancel={this.handleCancel}
                       confirmLoading={this.state.loading}>
                    <h6 className={'text-center offset-4 col-4 mb-5'}
                        style={{borderBottom: '1px solid black'}}>Screen</h6>
                    {arrSeat}
                </Modal>
        }
        return (
            container
        );
    }
}

export default SeatBookingModal;
