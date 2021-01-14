import React, {Component} from 'react';
import {Card, Avatar, Button} from "antd"
import {UserOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import {navigate} from "@reach/router";

class CardView extends Component {
    constructor(props) {
        super(props);
        this.handleClickCard = this.handleClickCard.bind(this);
    }
    handleClickCard(){
        navigate("movie/" + this.props.data.id)
    }
    render() {
        const isLogged = localStorage.getItem("isLogged") === 'true';
        const data = this.props.data
        const {Meta} = Card;
        return (
            <Card
                className={'p-2'}
                style={{width: 300}}
                cover={
                    <img
                        alt="movie image"
                        src={data.image}
                        onClick={this.handleClickCard}
                        style={{cursor:'pointer', height:'150px'}}
                    />
                }
            >
                <Meta
                    title={data.name}
                    onClick={this.handleClickCard}
                    style={{cursor:"pointer"}}
                    description={data.short_description}
                />
            </Card>
        );
    }
}

export default CardView;
