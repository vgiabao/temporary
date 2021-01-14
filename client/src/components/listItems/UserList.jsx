import React, {Component} from 'react';
import {List, Skeleton} from "antd";
import UserDetail from '../modal/UserDetail'
import MovieDetailModal from "../modal/MovieDetailModal";

class UserList extends Component {



    render() {
        const item = this.props.item
        return (
            <List.Item
                actions={[<MovieDetailModal item={this.props.item}/>]}
            >
                <Skeleton  avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                        className={'col-lg-3 col-md-6 col-sm-12'}
                        avatar={
                            <div >
                                <img  style={{width:'250px'}} src={item.image} />
                            </div>
                        }
                        title={<a>{item.name}</a>}
                        description={item.short_description}
                    />
                </Skeleton>
            </List.Item>
        );
    }
}

export default UserList;
