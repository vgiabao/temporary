import React, {Component} from 'react';
import {UserOutlined} from '@ant-design/icons';
class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            userId: localStorage.getItem("id")
        }
        this.onIconClick = this.onIconClick.bind(this);
        this.iconStyling = this.iconStyling.bind(this)
    }

    onIconClick(e){
        if (this.state.selected){
            this.setState({selected: false})
            this.props.handleRemoveSeat(this.props.name)
            console.log(false)
        }
        else {
            this.setState({selected:true})
            this.props.handleAddSeat(this.props.name)
            console.log(true)

        }
    }

    iconStyling(){
        if (this.props.available){
            return null
        }
        return 'red'
    }

    render() {
        return (
            <div className={'d-inline-block col-2'}>
            <UserOutlined onClick={this.props.available ?  this.onIconClick : null} className={"col-2 h1"} style={{opacity: this.state.selected? '1': '0.5',
            color: this.iconStyling(), cursor: !this.props.available? 'not-allowed': 'pointer'}}/>
                { this.props.isSelfBooked ? <h6 className={'text-center'} style={{position: "absolute", bottom: 0, cursor:'not-allowed'}}>
                    You booked</h6> : null}
            </div>
        );
    }
}

export default Seat;
