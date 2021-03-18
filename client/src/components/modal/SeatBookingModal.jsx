import React, {Component} from 'react';
import {Button, Modal} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import Seat from "../seat/Seat";
import axios from "axios";
import variables from "../../localVariables";
import localVariables from "../../localVariables";
import {navigate} from "@reach/router";

class SeatBookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            bookingSeats: [],
            bookedSeats: [],
            bookedUsers: [],
            render: false,
            loading: false,
            userIndex: localStorage.getItem("id"),
            movieDetailIndex: 1
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAddSeat = this.handleAddSeat.bind(this);
        this.handleRemoveSeat = this.handleRemoveSeat.bind(this);
        this.isInclude = this.isInclude.bind(this);
        this.fetchSeat = this.fetchSeat.bind(this);
        this.onOkHandler = this.onOkHandler.bind(this);
        this.isSelfBooked = this.isSelfBooked.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this)
    }

    async componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.movieDetailIndex !== this.props.movieDetailIndex){
            const empty = []
            this.setState({movieDetailIndex: nextProps.movieDetailIndex})
            this.setState({render:false})
            this.setState({bookedSeats: empty})
            console.log('changed', this.state.movieDetailIndex, nextProps.movieDetailIndex)
            console.log(this.state.movieDetailIndex)
            console.log(nextProps.movieDetailIndex)
            await this.fetchSeat(nextProps.movieDetailIndex);
            this.setState({render:true})
        }
    }



    showModal(){
        this.setState({
            visible:true
        })
    }


    handleCancel() {
        this.setState({visible: false})
    }

    handleAddSeat(seatIndex) {
        this.setState({
            bookingSeats: [...this.state.bookingSeats, seatIndex]
        })
        // console.log(this.props.movieDetailIndex)
        // console.log(this.state.bookingSeats)
        // console.log(this.state.user_index)
    }


    async componentDidMount() {
        this.setState({movieDetailIndex: this.props.movieDetailIndex})
        this.setState({user_index: localStorage.getItem('id')})
        await this.fetchSeat(this.props.movieDetailIndex).then(() => this.setState({render: true})
        );
    }




    async fetchSeat(id) {
        const emptyArr = []
        this.setState({bookedSeats: emptyArr})
        this.setState({bookedUsers: emptyArr})
        let config = {
            headers: {'bookDetail': 'Detail'},
            params: {
                id: id
            },
        }
        await axios.get(variables.movieIndex, config).then(res => {
            for (let seat of res.data.data) {
                this.setState({bookedSeats: [...this.state.bookedSeats, {
                    seat: seat.seat_index, user_index: seat.user_index
                    }]})

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
            if (item.seat === seatIndex) return true
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
                    movieIndex: this.state.movieDetailIndex,
                    seatIndex: item,
                    userIndex: this.state.user_index
                })
            }
            setTimeout(() => {
                window.location.reload();
                this.setState({visible:false})
            }, 1000)
        }

    }
    isSelfBooked(seatIndex){
        for (let item of this.state.bookedSeats){
            if (item.seat=== seatIndex && item.user_index == localStorage.getItem("id")) return true;
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
                <div>
                <Button onClick={this.showModal} > Choose A Seat </Button>

            <Modal style={{height: '50vh', overFlowY: 'scroll'}} title="Basic Modal" visible={this.state.visible}
                       onOk={this.onOkHandler}
                       onCancel={this.handleCancel}
                       confirmLoading={this.state.loading}>
                    <h6 className={'text-center offset-4 col-4 mb-5'}
                        style={{borderBottom: '1px solid black'}}>Screen</h6>
                    {arrSeat}
                </Modal>
                </div>
        }
        return (
                container
        );
    }
}

export default SeatBookingModal;
