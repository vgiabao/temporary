import React, {Component} from 'react';
import {List, Skeleton} from "antd";

class PotentialUsers extends Component {
    render() {
        const item = this.props.item
        console.log('spend', item)
        return (
            <List.Item
            >
                <Skeleton  avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                        className={'col-lg-3 col-md-6 col-sm-12'}
                        avatar={
                            <div >
                                {item.name}
                            </div>
                        }
                        title={<a>{"Total spend"}</a>}
                        description={item.total_spend.toFixed(2) + "$"}
                    />
                </Skeleton>
            </List.Item>
        );
    }
}

export default PotentialUsers;
