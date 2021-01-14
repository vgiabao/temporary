import React, {Component} from 'react';
import CardView from "./CardView";
import axios from "axios";
import variables from "../../localVariables";
import {Modal} from 'antd';
import {navigate} from "@reach/router";
class ListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: null,
        }
    }

    handlePreviewItem(){

    }



    componentWillUpdate(nextProps, nextState, nextContext) {
         if (this.props.movies === null || (nextProps.movies != null && nextProps.movies !== this.props.movies) ){
             let i = 0;
            this.setState({
                    cardList:  nextProps.movies.map(item => (
                        <CardView name={item.id}  className={'col-lg-3 col-md-6 col-sm-12'} data={item}/>))
                })

    }}


    render() {

        return (
            <div className={"container"}>
                {this.state.cardList}
            </div>
        );
    }
}

export default ListCard;
