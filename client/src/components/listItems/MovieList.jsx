import React, {Component} from 'react';
import {List, Skeleton} from "antd";
import UserDetail from "../modal/UserDetail";

class MovieList extends Component {


    render() {
        const item = this.props.item
        return (
            <List.Item
                actions={[<UserDetail  data={item}/>]}
            >
                <Skeleton title={false} loading={item.loading} active>
                    <List.Item.Meta
                        className={'row'}
                        avatar={<a>{item.name}</a>}

                    />
                </Skeleton>

            </List.Item>
        );
    }
}

export default MovieList;
